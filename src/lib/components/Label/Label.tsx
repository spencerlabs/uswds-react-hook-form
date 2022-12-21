import { classNames } from 'lib/utils'

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  /** Id of the corresponding field */
  htmlFor: string
}

const Label = ({ children, className, ...rest }: LabelProps) => {
  const error = false

  return (
    <label
      {...rest}
      className={classNames(
        'usa-label',
        error && 'usa-label--error',
        className
      )}
    >
      {children}
    </label>
  )
}

export default Label
