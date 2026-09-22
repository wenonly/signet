import classNames from 'classnames'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from 'components/ui/breadcrumb'
import { useRouter } from 'i18n/navigation'

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
  const router = useRouter()
  return (
    <section
      className={classNames(
        'flex flex-col gap-2 mb-6',
        className,
      )}>
      <div className='flex items-center gap-3'>
        <Breadcrumb>
          <BreadcrumbList className='text-[13px] text-muted-foreground/70'>
            {parent && (
              <>
                <BreadcrumbItem className='cursor-pointer'>
                  <BreadcrumbLink
                    onClick={() => {
                      router.push(parent.href)
                    }}
                  >
                    {parent.label}
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </>
            )}

            {page && (
              <BreadcrumbItem>
                {page.label}
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
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
