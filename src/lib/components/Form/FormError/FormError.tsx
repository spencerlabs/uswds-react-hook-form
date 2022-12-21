import { classNames } from 'lib/utils'

export interface FormErrorProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'id'> {
  fieldId: string
}

const FormError = ({
  children,
  className,
  fieldId,
  ...rest
}: FormErrorProps) => {
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

export default FormError
