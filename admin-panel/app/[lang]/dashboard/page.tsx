'use client'

import { useTranslations } from 'next-intl'

import ConfigBooleanValue from 'components/ConfigBooleanValue'
// [signet] fork addition: system links table with descriptions and copy buttons
import SystemLinksTable from 'components/SystemLinksTable'
import PageTitle from 'components/PageTitle'
import { configSignal } from 'signals'
import useSignalValue from 'app/useSignalValue'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from 'components/ui/table'
import Breadcrumb from 'components/Breadcrumb'
import LoadingPage from 'components/LoadingPage'

const configNameClass = 'w-[300px] max-md:w-52'

const Page = () => {
  const t = useTranslations()

  const configs = useSignalValue(configSignal)
  // [signet] fork addition: config description texts (see translations dashboard.configDescriptions)
  const configDescriptions = t.raw('dashboard.configDescriptions') as Record<string, string>

  const configTypes = [
    {
      name: t('dashboard.informationConfigs'),
      value: [
        'COMPANY_LOGO_URL',
        'COMPANY_EMAIL_LOGO_URL',
        'EMAIL_SENDER_NAME',
        'TERMS_LINK',
        'PRIVACY_POLICY_LINK',
      ],
    },
    {
      name: t('dashboard.localeConfigs'),
      value: ['SUPPORTED_LOCALES', 'ENABLE_LOCALE_SELECTOR'],
    },
    {
      name: t('dashboard.suppressionConfigs'),
      value: [
        'ENABLE_NAMES',
        'NAMES_IS_REQUIRED',
        'ENABLE_SIGN_UP',
        'ENABLE_PASSWORD_SIGN_IN',
        'ENABLE_PASSWORDLESS_SIGN_IN',
        'ENABLE_EMAIL_VERIFICATION',
        'REPLACE_EMAIL_VERIFICATION_WITH_WELCOME_EMAIL',
        'ENABLE_PASSWORD_RESET',
        'ENABLE_USER_APP_CONSENT',
        'ENABLE_APP_BANNER',
        'ENABLE_ORG',
        'BLOCKED_POLICIES',
      ],
    },
    {
      name: t('dashboard.authConfigs'),
      value: [
        'AUTHORIZATION_CODE_EXPIRES_IN',
        'SPA_ACCESS_TOKEN_EXPIRES_IN',
        'SPA_REFRESH_TOKEN_EXPIRES_IN',
        'S2S_ACCESS_TOKEN_EXPIRES_IN',
        'ID_TOKEN_EXPIRES_IN',
        'SERVER_SESSION_EXPIRES_IN',
      ],
    },
    {
      name: t('dashboard.mfaConfigs'),
      value: [
        'OTP_MFA_IS_REQUIRED',
        'SMS_MFA_IS_REQUIRED',
        'EMAIL_MFA_IS_REQUIRED',
        'ENFORCE_ONE_MFA_ENROLLMENT',
        'ALLOW_EMAIL_MFA_AS_BACKUP',
        'ALLOW_PASSKEY_ENROLLMENT',
        'ENABLE_RECOVERY_CODE',
        'ENABLE_MFA_REMEMBER_DEVICE',
      ],
    },
    {
      name: t('dashboard.bruteForceConfigs'),
      value: [
        'ACCOUNT_LOCKOUT_THRESHOLD', 'ACCOUNT_LOCKOUT_EXPIRES_IN',
        'UNLOCK_ACCOUNT_VIA_PASSWORD_RESET', 'PASSWORD_RESET_EMAIL_THRESHOLD',
        'PASSWORD_RESET_CODE_THRESHOLD', 'CHANGE_EMAIL_EMAIL_THRESHOLD',
        'CHANGE_EMAIL_CODE_THRESHOLD', 'EMAIL_VERIFICATION_CODE_THRESHOLD',
        'EMAIL_MFA_EMAIL_THRESHOLD',
        'SMS_MFA_MESSAGE_THRESHOLD', 'MFA_CODE_VERIFY_THRESHOLD',
        'AUTH_CODE_VERIFIER_THRESHOLD',
      ],
    },
    {
      name: t('dashboard.ssoConfigs'),
      value: [
        'GOOGLE_AUTH_CLIENT_ID',
        'FACEBOOK_AUTH_CLIENT_ID',
        'GITHUB_AUTH_CLIENT_ID',
        'GITHUB_AUTH_APP_NAME',
        'DISCORD_AUTH_CLIENT_ID',
        'OIDC_AUTH_PROVIDERS',
      ],
    },
    {
      name: t('dashboard.logConfigs'),
      value: ['ENABLE_EMAIL_LOG', 'ENABLE_SMS_LOG', 'ENABLE_SIGN_IN_LOG'],
    },
  ]

  if (!configs) return <LoadingPage />

  return (
    <section className='flex flex-col gap-6'>
      <Breadcrumb
        className='mb-0'
        page={{ label: t('layout.dashboard') }}
      />
      {/* [signet] fork addition: system links table (upstream rendered a plain 2-column table here) */}
      <SystemLinksTable authServerUrl={configs.AUTH_SERVER_URL} />
      {configTypes.map((configType) => (
        <section
          key={configType.name}
          className='flex flex-col gap-6'>
          <PageTitle
            title={configType.name}
          />
          <Table className='break-all'>
            <TableHeader>
              <TableRow>
                <TableHead className={configNameClass}>{t('dashboard.configName')}</TableHead>
                {/* [signet] fork addition: description column */}
                <TableHead className='w-96 max-md:w-52'>{t('dashboard.configDescription')}</TableHead>
                <TableHead className='w-[220px]'>{t('dashboard.configValue')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {configType.value.map((configName) => (
                <TableRow key={configName}>
                  <TableCell>{configName}</TableCell>
                  {/* [signet] fork addition: description column */}
                  <TableCell className='text-muted-foreground'>
                    {configDescriptions[configName] ?? ''}
                  </TableCell>
                  <TableCell>
                    {typeof configs[configName] === 'boolean' && <ConfigBooleanValue config={configs[configName]} />}
                    {Array.isArray(configs[configName]) && configs[configName].join(', ')}
                    {typeof configs[configName] !== 'boolean' && !Array.isArray(configs[configName]) && configs[configName]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      ))}
    </section>
  )
}

export default Page
