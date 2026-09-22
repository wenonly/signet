import { CSSProperties } from 'hono/jsx'

export interface FieldInputProps {
  className?: string;
  style?: CSSProperties;
  type: 'email' | 'text' | 'password';
  name: string;
  autoComplete?: string;
  value?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}

const FieldInput = ({
  className,
  style,
  type,
  name,
  autoComplete,
  value,
  disabled,
  onChange,
}: FieldInputProps) => {
  const handleChange = (e: Event) => {
    if (e.target && 'value' in e.target) {
      onChange(String(e.target.value))
    }
  }

  return (
    <input
      className={`bg-[#FAFAFA] border border-[#E4E4E7] rounded-lg h-10 px-3.5 w-(--text-width) text-sm placeholder:text-[#A1A1AA] focus:outline-none focus:border-[#A1A1AA] ${className || ''}`}
      type={type}
      style={style}
      id={`form-${name}`}
      name={name}
      autoComplete={autoComplete}
      value={value}
      disabled={disabled}
      onChange={handleChange}
    />
  )
}

export default FieldInput
