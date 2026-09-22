import { useTranslations } from 'next-intl'
import {
  useMemo, useState,
} from 'react'
import { useAuth } from '@melody-auth/react'
import Pagination from 'components/Pagination'
import { Input } from 'components/ui/input'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from 'components/ui/table'
import { Alert } from 'components/ui/alert'
import EntityStatusLabel from 'components/EntityStatusLabel'
import UserEmailVerified from 'components/UserEmailVerified'
import EditLink from 'components/EditLink'
import useSignalValue from 'app/useSignalValue'
import { configSignal } from 'signals'
import IsSelfLabel from 'components/IsSelfLabel'
import useDebounce from 'hooks/useDebounce'
import {
  useGetApiV1OrgsByIdUsersQuery, useGetApiV1UsersQuery,
  User, useGetApiV1OrgsByIdAllUsersQuery,
} from 'services/auth/api'
import LoadingPage from 'components/LoadingPage'
import {
  accessTool, routeTool,
} from 'tools'

const PageSize = 20

const UserTable = ({
  orgId,
  loadedUsers,
  isViewingAllUsers = false,
}: {
  orgId: number | null;
  loadedUsers?: User[] | null;
  isViewingAllUsers?: boolean;
}) => {
  const t = useTranslations()

  const { userInfo } = useAuth()

  const configs = useSignalValue(configSignal)
  const [pageNumber, setPageNumber] = useState(1)
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const canWriteUser = accessTool.isAllowedAccess(
    accessTool.Access.WriteUser,
    userInfo?.roles,
  )

  const {
    data: usersData, isLoading: isUsersLoading,
  } = useGetApiV1UsersQuery(
    {
      pageSize: PageSize,
      pageNumber,
      search: debouncedSearch || undefined,
    },
    { skip: !!orgId },
  )

  const {
    data: orgUsersData, isLoading: isOrgUsersLoading,
  } = useGetApiV1OrgsByIdUsersQuery(
    {
      id: Number(orgId),
      pageSize: PageSize,
      pageNumber,
      search: debouncedSearch || undefined,
    },
    { skip: !orgId || isViewingAllUsers },
  )

  const { data: orgAllUsersData } = useGetApiV1OrgsByIdAllUsersQuery(
    {
      id: Number(orgId),
      pageSize: PageSize,
      pageNumber,
    },
    { skip: !orgId || !isViewingAllUsers },
  )

  const data = orgId
    ? (isViewingAllUsers ? orgAllUsersData : orgUsersData)
    : usersData

  const users = loadedUsers ?? data?.users ?? []
  const count = data?.count ?? 0

  const totalPages = useMemo(
    () => Math.ceil(count / PageSize),
    [count],
  )

  const handlePageChange = (page: number) => {
    setPageNumber(page)
  }

  if (isUsersLoading || isOrgUsersLoading) {
    return <LoadingPage />
  }

  return (
    <section>
      {!loadedUsers && !isViewingAllUsers && (
        <header className='mb-6 flex items-center gap-4'>
          <Input
            className='w-80'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('users.search')}
          />
        </header>
      )}
      {data && data.count === 0 && (
        <Alert>
          {t('users.noUsers')}
        </Alert>
      )}
      {data && data.count !== 0 && <Table>
        <TableHeader className='md:hidden'>
          <TableRow>
            <TableHead>{t('users.user')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableHeader className='max-md:hidden'>
          <TableRow>
            <TableHead>{t('users.email')}</TableHead>
            {configs.ENABLE_NAMES && (
              <TableHead>{t('users.name')}</TableHead>
            )}
            <TableHead>{t('users.status')}</TableHead>
            <TableHead>{t('users.emailVerified')}</TableHead>
            <TableHead>{t('common.createdAt')}</TableHead>
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody className='divide-y md:hidden'>
          {users.map((user) => (
            <TableRow
              key={user.id}
              data-testid='userRow'>
              <TableCell>
                <section className='flex items-center justify-between'>
                  <section className='flex flex-col gap-2'>
                    {user.email ?? user.authId}
                    {user.authId === userInfo?.authId && <div className='flex'><IsSelfLabel /></div>}
                    <EntityStatusLabel
                      isEnabled={user.isActive}
                      isInviting={user.isInviting}
                    />
                    <UserEmailVerified user={user} />
                    {configs.ENABLE_NAMES && (
                      <p>
                        {`${user.firstName ?? ''} ${user.lastName ?? ''}`}
                      </p>
                    )}
                  </section>
                  <EditLink
                    viewOnly={!canWriteUser}
                    href={`${routeTool.Internal.Users}/${user.authId}`}
                  />
                </section>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableBody className='divide-y max-md:hidden'>
          {users.map((user) => (
            <TableRow
              key={user.id}
              data-testid='userRow'>
              <TableCell className='text-foreground'>
                <div className='flex items-center gap-2'>
                  {user.email ?? user.authId}
                  {user.authId === userInfo?.authId && <IsSelfLabel />}
                </div>
              </TableCell>
              {configs.ENABLE_NAMES && (
                <TableCell>
                  {`${user.firstName ?? ''} ${user.lastName ?? ''}`}
                </TableCell>
              )}
              <TableCell>
                <EntityStatusLabel
                  isEnabled={user.isActive}
                  isInviting={user.isInviting}
                />
              </TableCell>
              <TableCell>
                <UserEmailVerified user={user} />
              </TableCell>
              <TableCell>
                {user.createdAt} UTC
              </TableCell>
              <TableCell>
                <EditLink
                  viewOnly={!canWriteUser}
                  href={`${routeTool.Internal.Users}/${user.authId}`}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>}
      {!loadedUsers && totalPages > 1 && (
        <Pagination
          className='mt-6'
          count={count}
          countLabel={t(
            'users.userCount',
            { count },
          )}
          currentPage={pageNumber}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          previousLabel={t('common.previous')}
          nextLabel={t('common.next')}
        />
      )}
    </section>
  )
}

export default UserTable
