import { forwardRef } from 'react'

import { useRegister } from '../../../../hooks'
import { classNames } from '../../../../utils'
import type { FieldProps } from '../../Input/InputField/InputField'

export interface SelectFieldProps
  extends Omit<FieldProps<HTMLSelectElement>, 'type'>,
    Omit<React.ComponentPropsWithRef<'select'>, 'name'> {
  error?: boolean
  hint?: boolean
  width?: '2xs' | 'xs' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'xl' | '2xl'
}

const SelectField = forwardRef(
  (
    {
      className,
      error,
      hint,
      name,
      onBlur,
      onChange,
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
      />
    )
  }
)

export default SelectField
