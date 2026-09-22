'use client'

// [signet] fork addition: renders the system links table with a description
// column and a path + copy-button display for the values.
// Extracted from the dashboard page to keep the fork diff there minimal.
import { useTranslations } from 'next-intl'
import CopyValue from 'components/CopyValue'
import PageTitle from 'components/PageTitle'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from 'components/ui/table'

interface LinkDef {
  path: string
  name?: string
  nameKey?: string
  descKey: string
}

const linkDefs: LinkDef[] = [
  {
    path: '/.well-known/openid-configuration',
    name: 'OPENID CONFIGURATION',
    descKey: 'OPENID_CONFIGURATION',
  },
  {
    path: '/.well-known/jwks.json',
    name: 'JWKS',
    descKey: 'JWKS',
  },
  {
    path: '/api/v1/swagger',
    nameKey: 'dashboard.apiSwagger',
    descKey: 'API_SWAGGER',
  },
  {
    path: '/api/v1/embedded-swagger',
    nameKey: 'dashboard.embeddedSwagger',
    descKey: 'EMBEDDED_SWAGGER',
  },
]

const SystemLinksTable = ({ authServerUrl }: { authServerUrl: string }) => {
  const t = useTranslations()
  const configDescriptions = t.raw('dashboard.configDescriptions') as Record<string, string>

  return (
    <>
      <PageTitle
        title={t('dashboard.links')}
      />
      <Table className='break-all'>
        <TableHeader>
          <TableRow>
            <TableHead className='w-[300px] max-md:w-52'>{t('dashboard.configName')}</TableHead>
            <TableHead className='w-96 max-md:w-52'>{t('dashboard.configDescription')}</TableHead>
            <TableHead className='w-[220px]'>{t('dashboard.configValue')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {linkDefs.map((link) => {
            const url = `${authServerUrl}${link.path}`
            return (
              <TableRow key={link.path}>
                <TableCell>{link.nameKey ? t(link.nameKey) : link.name}</TableCell>
                <TableCell className='text-muted-foreground'>
                  {configDescriptions[link.descKey]}
                </TableCell>
                <TableCell>
                  <CopyValue value={url}>
                    <a
                      target='_blank'
                      href={url}
                      rel='noreferrer'
                      title={url}
                      className='font-mono text-[13px] break-all'
                    >
                      {link.path}
                    </a>
                  </CopyValue>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </>
  )
}

export default SystemLinksTable
