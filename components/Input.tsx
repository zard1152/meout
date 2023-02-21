import { InputHTMLAttributes } from 'react'
import { classNames } from '../utils'

const Input = ({
  className,
  type,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      type={type ?? 'text'}
      className={classNames(
        'w-full sm:w-auto bg-background border border-accent-2 rounded-md h-10 px-2.5 focus:outline-none hover:border-accent-4 focus:border-accent-8 transition-colors duration-300 disabled:bg-accent-1 placeholder-accent-4',
        className
      )}
      {...props}
    />
  )
}

export default Input
