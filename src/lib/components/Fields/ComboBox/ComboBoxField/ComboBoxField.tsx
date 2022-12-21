import { forwardRef, useEffect, useRef } from 'react'

import comboBox from '@uswds/uswds/js/usa-combo-box'

import SelectField, {
  SelectFieldProps,
} from 'components/Fields/Select/SelectField/SelectField'

export interface ComboBoxFieldProps
  extends Omit<SelectFieldProps, 'showSelect'> {
  /** The combo box will use this regular expression to filter the combo box options. */
  filter?: string
}

const ComboBoxField = forwardRef(
  (
    { defaultValue, filter, placeholder, ...rest }: ComboBoxFieldProps,
    ref: React.ForwardedRef<HTMLSelectElement | null>
  ) => {
    const containerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      const containerEl = containerRef.current

      if (!containerEl) return

      comboBox.on(containerEl)

      return () => {
        comboBox.off(containerEl)
      }
    })

    return (
      <div
        ref={containerRef}
        className="usa-combo-box"
        data-default-value={defaultValue}
        data-filter={filter}
        data-placeholder={placeholder}
      >
        <SelectField ref={ref} {...rest} />
      </div>
    )
  }
)

export default ComboBoxField
