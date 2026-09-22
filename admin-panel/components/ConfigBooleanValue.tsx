'use client'

import { useTranslations } from 'next-intl'

// [signet] fork restyle: boolean config values as pills (upstream rendered check/x icons)
const ConfigBooleanValue = ({ config }: { config?: boolean }) => {
  const t = useTranslations()

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs ${
        config
          ? 'bg-green-50 text-green-600 border border-green-200'
          : 'bg-muted text-muted-foreground border'
      }`}
    >
      {config ? t('common.yes') : t('common.no')}
    </span>
  )
}

export default ConfigBooleanValue
