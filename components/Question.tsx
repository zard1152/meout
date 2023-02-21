import { ReactNode } from 'react'

const Question = ({
  number,
  children,
}: {
  number: number
  children: ReactNode
}) => {
  return (
    <div className="flex items-center space-x-3 mb-5">
      <div className="bg-foreground text-background h-8 w-8 rounded-full flex items-center justify-center font-bold">
        {number}
      </div>
      <p className="font-medium">{children}</p>
    </div>
  )
}

export default Question
