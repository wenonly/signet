export interface ViewTitleProps {
  title: string;
}

const ViewTitle = ({ title }: ViewTitleProps) => {
  return <h1 className='w-(--text-width) text-left text-[22px] leading-tight font-bold'>{title}</h1>
}

export default ViewTitle
