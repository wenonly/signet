import { useTranslations } from 'next-intl'
import { Badge } from 'components/ui/badge'
import { UserDetail } from 'services/auth/api'

const UserEmailVerified = ({ user }: { user: Pick<UserDetail, 'emailVerified'> }) => {
  const t = useTranslations()
  return user.emailVerified
    ? (
      <Badge variant='success'>
        {t('users.emailVerified')}
      </Badge>
    )
    : (
      <Badge variant='secondary'>
        {t('users.emailNotVerified')}
      </Badge>
    )
}

export default UserEmailVerified
