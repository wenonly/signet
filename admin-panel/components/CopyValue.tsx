'use client'

import { ReactNode, useState } from 'react'
import { useTranslations } from 'next-intl'
import {
  CheckIcon, ClipboardDocumentIcon,
} from '@heroicons/react/16/solid'

const CopyValue = ({
  value, children,
}: {
  value: string; children: ReactNode
}) => {
  const t = useTranslations()

  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <span className='inline-flex items-center gap-1.5'>
      {children}
      <button
        type='button'
        onClick={handleCopy}
        title={copied ? t('common.copied') : t('common.copy')}
        aria-label={copied ? t('common.copied') : t('common.copy')}
        className='shrink-0 text-muted-foreground hover:text-foreground'
      >
        {copied
        ? <CheckIcon
            className='w-3.5 h-3.5'
            color='green'
          />
        : <ClipboardDocumentIcon className='w-3.5 h-3.5' />}
      </button>
    </span>
  )
}

export default CopyValue
