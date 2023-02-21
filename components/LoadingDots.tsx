import { classNames } from '../utils'

const LoadingDots = () => {
  return (
    <span className="flex items-center justify-center space-x-1">
      {[...Array(3)].map((_, i) => (
        <span
          key={i}
          style={{
            animationDelay: `${i * 250}ms`,
            animationDuration: '1000ms',
          }}
          className={classNames(
            'animate-pulse h-2 w-2 rounded-full block',
            Math.random() < 0.15 ? 'bg-red animate-bounce' : 'bg-accent-6'
          )}
        />
      ))}
    </span>
  )
}

export default LoadingDots
