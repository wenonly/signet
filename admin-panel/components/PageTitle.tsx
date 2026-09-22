import classNames from 'classnames'

const PageTitle = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h1
      className={classNames(
        'text-[15px] font-semibold text-foreground',
        className,
      )}>{title}
    </h1>
  )
}

export default PageTitle
