export interface FieldLabelProps { label: string; required: boolean; fieldName: string }

const FieldLabel = ({
  label, required, fieldName,
}: FieldLabelProps) => {
  return (
    <label
      className='font-medium w-(--text-width) text-[13px]'
      for={`form-${fieldName}`}
    >
      {label}
      {required && <span
        id={`required-${fieldName}`}
        className='text-criticalIndicatorColor ml-2'>*</span>}
    </label>
  )
}

export default FieldLabel
