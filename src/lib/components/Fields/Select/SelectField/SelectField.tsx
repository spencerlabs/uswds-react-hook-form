import { forwardRef } from 'react'

import type { FieldProps } from 'components/Fields/Input/InputField/InputField'
import { useErrors, useRegister } from 'lib/hooks'
import { classNames } from 'lib/utils'

export interface SelectFieldProps
  extends Omit<FieldProps<HTMLSelectElement>, 'type'>,
    Omit<React.ComponentPropsWithRef<'select'>, 'name'> {
  error?: boolean
  hint?: boolean
  showSelect?: boolean | string
  width?: '2xs' | 'xs' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'xl' | '2xl'
}

const SelectField = forwardRef(
  (
    {
      children,
      className,
      error: passedError,
      hint,
      name,
      onBlur,
      onChange,
      showSelect,
      validation,
      width,
      ...rest
    }: SelectFieldProps,
    ref: React.ForwardedRef<HTMLSelectElement | null>
  ) => {
    const useRegisterReturn = useRegister(
      {
        name,
        validation,
        onBlur,
        onChange,
      },
      ref
    )

    const formError = useErrors(name)

    const error = passedError || !!formError

    return (
      <select
        {...rest}
        className={classNames(
          'usa-select',
          error && 'usa-select--error',
          width && `usa-input--${width}`,
          className
        )}
        aria-describedby={
          error || hint
            ? classNames(
                error && `${rest.id}--error`,
                hint && `${rest.id}--hint`
              )
            : undefined
        }
        {...useRegisterReturn}
      >
        {showSelect && (
          <option value="">
            {typeof showSelect === 'string' ? showSelect : '- Select -'}
          </option>
        )}
        {children}
      </select>
    )
  }
)

export default SelectField
