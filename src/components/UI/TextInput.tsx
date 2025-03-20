import classNames from 'classnames'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  full?: boolean
  flex?: boolean
}

const TextInput: React.FC<TextInputProps> = ({
  full,
  flex,
  className,
  ...rest
}) => {
  return (
    <input
      className={classNames(
        'px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
        {
          'w-full': full,
          'flex-1': flex,
        },
        className
      )}
      {...rest}
    />
  )
}

export default TextInput
