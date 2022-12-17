import { classNames } from '../../utils'

export interface LegendProps extends React.ComponentPropsWithoutRef<'legend'> {
  error?: boolean
  large?: boolean
  screenReaderOnly?: boolean
}

const Legend = ({
  children,
  className,
  error,
  large,
  screenReaderOnly,
  ...rest
}: LegendProps) => {
  return (
    <legend
      {...rest}
      className={classNames(
        'usa-legend',
        error && 'usa-label--error',
        large && 'usa-legend--large',
        screenReaderOnly && 'usa-sr-only',
        className
      )}
    >
      {children}
    </legend>
  )
}

export default Legend
