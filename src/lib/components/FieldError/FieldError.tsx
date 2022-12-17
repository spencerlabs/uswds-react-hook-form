import { classNames } from '../../utils'

export interface FieldErrorProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'id'> {
  fieldId: string
}

const FieldError = ({
  children,
  className,
  fieldId,
  ...rest
}: FieldErrorProps) => {
  return (
    <span
      {...rest}
      id={`${fieldId}--error`}
      className={classNames('usa-error-message', className)}
      role="alert"
    >
      {children}
    </span>
  )
}

export default FieldError
