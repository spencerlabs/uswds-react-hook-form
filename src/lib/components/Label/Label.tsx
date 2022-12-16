import { classNames } from '../../../utils'

export interface LabelProps extends React.ComponentPropsWithoutRef<'label'> {
  error?: boolean
  name: string
}

const Label = ({ children, className, error, name, ...rest }: LabelProps) => {
  return (
    <label
      htmlFor={name}
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
