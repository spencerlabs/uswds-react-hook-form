import { useEffect, useRef, useState } from 'react'

import dateRangePicker from '@uswds/uswds/js/usa-date-range-picker'

import { DatePicker } from '..'

interface DateRangePickerProps {
  /** Default values for the date fields */
  defaultValues?: { start?: string; end?: string }
  disabled?: boolean
  /** Hint values for the date fields */
  hints?: {
    start?: React.ReactNode
    end?: React.ReactNode
  }
  /** Label values for the date fields */
  labels?: { start?: string; end?: string }
  name: string
  onChange?: (value: { start?: string; end?: string }) => void
  readOnly?: boolean
  /** Refs passed to the individual date fields */
  refs?: {
    start?: React.Ref<HTMLInputElement>
    end?: React.Ref<HTMLInputElement>
  }
}

const DateRangePicker = ({
  defaultValues,
  disabled,
  hints,
  labels,
  name,
  onChange,
  readOnly,
  refs,
}: DateRangePickerProps) => {
  const [dateValues, setDateValues] = useState({
    start: undefined,
    end: undefined,
    ...defaultValues,
  })
  const containerRef = useRef<HTMLDivElement | null>(null)

  const sharedProps = { disabled, readOnly }

  const onDateChange = (field: 'start' | 'end', value?: string) => {
    const dates = { ...dateValues }

    dates[field] = value

    setDateValues(dates)
  }

  useEffect(() => {
    const containerEl = containerRef.current

    if (!containerEl) return

    dateRangePicker.on(containerEl)

    return () => {
      dateRangePicker.off(containerEl)
    }
  }, [])

  useEffect(() => {
    onChange && onChange(dateValues)
  }, [dateValues, onChange])

  return (
    <div ref={containerRef} className="usa-date-range-picker">
      <DatePicker
        ref={refs?.start}
        {...sharedProps}
        defaultValue={defaultValues?.start}
        hint={hints?.start}
        label={labels?.start || 'Start date'}
        name={`${name}--start`}
        onChange={(e) => onDateChange('start', e.target.value)}
      />
      <DatePicker
        ref={refs?.end}
        {...sharedProps}
        defaultValue={defaultValues?.end}
        hint={hints?.end}
        label={labels?.end || 'End date'}
        name={`${name}--end`}
        onChange={(e) => onDateChange('end', e.target.value)}
      />
    </div>
  )
}

export default DateRangePicker
