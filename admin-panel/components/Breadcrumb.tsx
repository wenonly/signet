import classNames from 'classnames'
import { useEffect } from 'react'
import { crumbSignal } from 'signals'

// [signet] fork restyle: the crumb line lives in the shell topbar (registered
// here via crumbSignal); only the page title and action stay in the content
const ShadcnBreadcrumb = ({
  parent,
  page,
  action,
  className,
}: {
  parent?: {
    label: string;
    href: string;
  };
  page?: {
    label: string;
  };
  action?: React.ReactNode;
  className?: string;
}) => {
  useEffect(
    () => {
      crumbSignal.value = {
        parent: parent
          ? {
            label: parent.label, href: parent.href,
          }
          : undefined,
        page: page?.label,
      }
    },
    [parent?.label, parent?.href, page?.label],
  )

  return (
    <section
      className={classNames(
        'flex flex-col gap-2 mb-6',
        className,
      )}>
      {page && (
        <div className='flex items-center justify-between gap-4'>
          <h1 className='text-2xl font-bold tracking-tight leading-none'>
            {page.label}
          </h1>
          {action}
        </div>
      )}
      {!page && action}
    </section>
  )
}

export default ShadcnBreadcrumb
