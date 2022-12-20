import { forwardRef, useEffect, useRef } from 'react'

import comboBox from '@uswds/uswds/js/usa-combo-box'

import SelectField, {
  SelectFieldProps,
} from '../../Select/SelectField/SelectField'

export interface ComboBoxFieldProps extends SelectFieldProps {}

const ComboBoxField = forwardRef(
  (
    props: ComboBoxFieldProps,
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
      <div ref={containerRef} className="usa-combo-box">
        <SelectField ref={ref} {...props} />
      </div>
    )
  }
)

export default ComboBoxField
