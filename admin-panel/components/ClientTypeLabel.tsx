import { Badge } from 'components/ui/badge'

const ClientTypeLabel = ({ type }: {
  type: string;
}) => {
  return (
    <div className='flex items-center'>
      <Badge
        variant='outline'
        className='rounded-md font-medium'
      >{type.toUpperCase()}</Badge>
    </div>
  )
}

export default ClientTypeLabel
