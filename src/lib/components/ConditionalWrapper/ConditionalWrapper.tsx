import { createElement } from 'react'

interface WrapProps {
  if?: boolean
  with: typeof createElement.arguments[0]
  wrapperProps?: typeof createElement.arguments[1]
  children: React.ReactNode
}

const ConditionalWrapper = ({
  if: condition,
  with: wrapper,
  wrapperProps,
  children,
}: WrapProps) => {
  return condition ? (
    createElement(wrapper, wrapperProps, [children])
  ) : (
    <>{children}</>
  )
}

export default ConditionalWrapper
