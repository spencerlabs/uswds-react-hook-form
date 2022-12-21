import { classNames } from 'lib/utils'

import { Legend } from '../Legend'

export interface FieldsetProps
  extends React.ComponentPropsWithoutRef<'fieldset'> {
  error?: boolean
  label: string | { text: string; hide?: boolean; large?: boolean }
}

const Fieldset = ({
  children,
  className,
  error,
  label,
  ...rest
}: FieldsetProps) => {
  let labelText = ''
  let labelLarge = false
  let labelHide = false

  if (typeof label === 'string') {
    labelText = label
  } else {
    labelText = label.text
    labelHide = label.hide || false
    labelLarge = label.large || false
  }

  return (
    <fieldset {...rest} className={classNames('usa-fieldset', className)}>
      <Legend error={error} large={labelLarge} screenReaderOnly={labelHide}>
        {labelText}
      </Legend>

      {/* Form fields */}
      {children}
    </fieldset>
  )
}

export default Fieldset
