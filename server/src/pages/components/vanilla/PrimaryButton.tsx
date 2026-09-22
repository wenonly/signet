import Spinner from './Spinner'

export interface PrimaryButtonProps {
  title: string | React.ReactNode;
  className?: string;
  type: 'submit' | 'button';
  onClick?: (e: Event) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const PrimaryButton = ({
  title, className, type, onClick, isLoading, disabled,
}: PrimaryButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center cursor-pointer h-[42px] bg-primaryButtonColor text-primaryButtonLabelColor border border-primaryButtonBorderColor rounded-lg font-medium text-sm w-(--text-width) ${className ?? ''}`}
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      {title}
      {isLoading && (
        <span className='ml-2'>
          <Spinner />
        </span>
      )}
    </button>
  )
}

export default PrimaryButton
