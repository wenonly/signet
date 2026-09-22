'use client'

import { useAuth } from '@melody-auth/react'
import {
  useTranslations, useLocale,
} from 'next-intl'
import {
  EnvelopeIcon, FingerPrintIcon, KeyIcon, LifebuoyIcon, ShieldCheckIcon, UserCircleIcon,
} from '@heroicons/react/16/solid'
import useSignalValue from 'app/useSignalValue'
import { configSignal } from 'signals'
import { Button } from 'components/ui/button'
import Breadcrumb from 'components/Breadcrumb'

interface AccountAction {
  policy: string
  Icon: typeof UserCircleIcon
  title: string
  desc: string
  btn: string
}

const Page = () => {
  const t = useTranslations()
  const locale = useLocale()

  const configs = useSignalValue(configSignal)

  const { loginRedirect } = useAuth()

  // [signet] fork redesign: card rows with descriptions (upstream rendered a plain button stack)
  const redirect = (policy: string) => () => {
    loginRedirect({
      locale: locale || undefined, policy, org: 'default',
    })
  }

  const actions: AccountAction[] = [
    {
      policy: 'update_info',
      Icon: UserCircleIcon,
      title: t('account.updateInfo'),
      desc: t('account.updateInfoDesc'),
      btn: t('account.actUpdate'),
    },
    {
      policy: 'change_password',
      Icon: KeyIcon,
      title: t('account.changePassword'),
      desc: t('account.changePasswordDesc'),
      btn: t('account.actChange'),
    },
    {
      policy: 'change_email',
      Icon: EnvelopeIcon,
      title: t('account.changeEmail'),
      desc: t('account.changeEmailDesc'),
      btn: t('account.actChange'),
    },
    {
      policy: 'reset_mfa',
      Icon: ShieldCheckIcon,
      title: t('account.resetMfa'),
      desc: t('account.resetMfaDesc'),
      btn: t('account.actReset'),
    },
  ]

  const conditionalActions: AccountAction[] = [
    configs.ALLOW_PASSKEY_ENROLLMENT && {
      policy: 'manage_passkey',
      Icon: FingerPrintIcon,
      title: t('account.managePasskey'),
      desc: t('account.managePasskeyDesc'),
      btn: t('account.actManage'),
    },
    configs.ENABLE_RECOVERY_CODE && {
      policy: 'manage_recovery_code',
      Icon: LifebuoyIcon,
      title: t('account.manageRecoveryCode'),
      desc: t('account.manageRecoveryCodeDesc'),
      btn: t('account.actManage'),
    },
  ].filter(Boolean) as AccountAction[]

  return (
    <section className='flex flex-col'>
      <Breadcrumb
        page={{ label: t('layout.account') }}
      />
      <section className='flex flex-col gap-4 max-w-[720px]'>
        <div className='rounded-[10px] border overflow-hidden'>
          {[...actions, ...conditionalActions].map((action) => (
            <div
              key={action.policy}
              className='flex items-center gap-4 px-5 py-4 border-b last:border-b-0'
            >
              <action.Icon className='w-[18px] h-[18px] shrink-0 text-muted-foreground' />
              <div className='flex flex-col gap-0.5 grow'>
                <span className='text-sm font-medium'>{action.title}</span>
                <span className='text-xs text-zinc-400'>{action.desc}</span>
              </div>
              <Button
                variant='outline'
                size='sm'
                className='shrink-0'
                onClick={redirect(action.policy)}
              >
                {action.btn}
              </Button>
            </div>
          ))}
        </div>
        <p className='text-xs text-muted-foreground'>
          {t('account.note')}
        </p>
      </section>
    </section>
  )
}

export default Page
