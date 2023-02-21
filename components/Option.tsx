import { classNames } from '../utils'

export type Option = {
  label: string
  icon: string // Using emoji icons 👌
  prompt?: string // Falls back to label if not provided
}

const Option = ({
  option,
  selected,
  onClick,
}: {
  option: Option
  selected: boolean
  onClick: () => void
}): JSX.Element => {
  const { label, icon } = option

  return (
    <button
      key={label}
      className={classNames(
        'flex items-center space-x-2 h-10 rounded-md px-2.5 border shadow-md hover:shadow-xl transition-all duration-300 ease-in-out hover:-translate-y-1 active:-translate-y-0.5 active:shadow-lg',
        selected
          ? 'border-accent-8 text-foreground'
          : 'border-accent-1 text-accent-6 dark:border-accent-2'
      )}
      onClick={onClick}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </button>
  )
}

export default Option
