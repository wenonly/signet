import { useTranslations } from 'next-intl'
import { Badge } from 'components/ui/badge'

const SystemLabel = () => {
  const t = useTranslations()

  return (
    <Badge
      variant='secondary'
      className='rounded-md'
    >{t('common.system')}</Badge>
  )
}

export default SystemLabel
