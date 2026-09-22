import { cn } from 'tools/style'

// [signet] fork restyle: count on the left + compact page buttons on the
// right (upstream rendered centered shadcn pagination links)
interface ShadcnPaginationProps {
  className?: string;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  previousLabel?: string;
  nextLabel?: string;
  count?: number;
  countLabel?: string;
}

const btnBase = 'flex h-[30px] min-w-[30px] items-center justify-center rounded-md px-2 text-[13px] transition-colors disabled:pointer-events-none'

const ShadcnPagination: React.FC<ShadcnPaginationProps> = ({
  className,
  currentPage,
  totalPages,
  onPageChange,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  count,
  countLabel,
}) => {
  const generatePages = () => {
    const pages: (number | 'ellipsis')[] = []

    const siblingCount = 1

    const range = (
      start: number, end: number,
    ) =>
      Array.from(
        { length: end - start + 1 },
        (
          _, i,
        ) => i + start,
      )

    if (totalPages <= 5 + siblingCount * 2) {
      return range(
        1,
        totalPages,
      )
    }

    const firstPage = 1
    const lastPage = totalPages
    const leftSiblingIndex = Math.max(
      currentPage - siblingCount,
      firstPage,
    )
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      lastPage,
    )

    pages.push(firstPage)

    if (leftSiblingIndex > firstPage + 1) {
      pages.push('ellipsis')
    } else {
      for (let i = firstPage + 1; i < leftSiblingIndex; i++) {
        pages.push(i)
      }
    }

    for (let i = leftSiblingIndex; i <= rightSiblingIndex; i++) {
      if (i !== firstPage && i !== lastPage) {
        pages.push(i)
      }
    }

    if (rightSiblingIndex < lastPage - 1) {
      pages.push('ellipsis')
    } else {
      // Include pages between rightSiblingIndex and lastPage
      for (let i = rightSiblingIndex + 1; i < lastPage; i++) {
        pages.push(i)
      }
    }

    // Always show last page
    if (lastPage !== firstPage) {
      pages.push(lastPage)
    }

    return pages
  }

  const pages = generatePages()

  return (
    <nav
      role='pagination'
      aria-label='pagination'
      className={cn(
        'flex w-full items-center justify-between gap-4',
        className,
      )}
    >
      {countLabel != null && (
        <span className='text-[13px] text-muted-foreground/70'>
          {countLabel}
        </span>
      )}
      <div className='ml-auto flex items-center gap-2'>
        <button
          type='button'
          className={cn(
            btnBase,
            currentPage <= 1
              ? 'text-muted-foreground/70'
              : 'text-foreground hover:bg-muted',
          )}
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          {previousLabel}
        </button>
        {pages.map((
          item, index,
        ) => {
          if (item === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className='flex h-[30px] w-4 items-center justify-center text-[13px] text-muted-foreground/70'
              >
                …
              </span>
            )
          }
          return (
            <button
              key={item}
              type='button'
              aria-current={item === currentPage ? 'page' : undefined}
              className={cn(
                btnBase,
                item === currentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted',
              )}
              onClick={() => onPageChange(item as number)}
            >
              {item}
            </button>
          )
        })}
        <button
          type='button'
          className={cn(
            btnBase,
            currentPage >= totalPages
              ? 'text-muted-foreground/70'
              : 'text-foreground hover:bg-muted',
          )}
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          {nextLabel}
        </button>
        {count != null && (
          <span className='sr-only'>{count}</span>
        )}
      </div>
    </nav>
  )
}

export default ShadcnPagination
