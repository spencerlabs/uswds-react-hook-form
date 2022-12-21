import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'

import datePicker from '@uswds/uswds/js/usa-date-picker'
import inputMask from '@uswds/uswds/js/usa-input-mask'

import { Input } from 'lib/components'

export interface DatePickerFieldProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'prefix' | 'type'> {
  error?: boolean
  hint?: boolean
  /** YYYY-MM-DD format */
  maxDate?: string
  /** YYYY-MM-DD format */
  minDate?: string
  name: string
  /** YYYY-MM-DD format */
  rangeDate?: string
  width?: '2xs' | 'xs' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'xl' | '2xl'
}

const DatePickerField = forwardRef(
  (
    {
      defaultValue,
      error,
      hint,
      maxDate,
      minDate,
      rangeDate,
      width,
      ...rest
    }: DatePickerFieldProps,
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current)

    useEffect(() => {
      const containerEl = containerRef.current
      if (!containerEl) return

      datePicker.on(containerEl)

      return () => {
        datePicker.off(containerEl)
      }
    }, [])

    useEffect(() => {
      const containerEl = containerRef.current
      if (!containerEl) return

      if (!rest.disabled) {
        datePicker.enable(containerEl)
      } else {
        datePicker.disable(containerEl)
      }
    }, [rest.disabled])

    useEffect(() => {
      const inputEl = inputRef.current

      if (!inputEl || !rest.placeholder || !rest.pattern) return

      inputMask.on(inputEl)

      return () => {
        inputMask.off(inputEl)
      }
    }, [rest.placeholder, rest.pattern])

    return (
      <div
        ref={containerRef}
        className="usa-date-picker"
        data-default-value={defaultValue}
        data-max-date={maxDate}
        data-min-date={minDate}
        data-range-date={rangeDate}
      >
        <Input.Field
          ref={inputRef}
          {...rest}
          error={error}
          hint={hint}
          width={width}
        />
      </div>
    )
  }
)

export default DatePickerField
