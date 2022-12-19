import { useEffect, useState } from 'react'

import { Hint, Input } from '../..'
import { useFieldId } from '../../../hooks'
import Fieldset, { FieldsetProps } from '../../Fieldset/Fieldset'

interface DateProps extends Omit<FieldsetProps, 'children' | 'onChange'> {
  defaultValues?: {
    month?: number
    day?: number
    year?: number
  }
  hint?: React.ReactNode
  name: string
  onChange?: (value: { month?: number; day?: number; year?: number }) => void
  readOnly?: boolean
  refs?: {
    month?: React.Ref<HTMLSelectElement>
    day?: React.Ref<HTMLInputElement>
    year?: React.Ref<HTMLInputElement>
  }
}

const Date = ({
  defaultValues,
  error,
  hint,
  name,
  onChange,
  readOnly,
  refs,
  ...rest
}: DateProps) => {
  const [dateValue, setDateValue] = useState({
    month: undefined,
    day: undefined,
    year: undefined,
    ...defaultValues,
  })
  const fieldId = useFieldId(rest.id)

  const sharedProps = { readOnly }

  const onDateChange = (field: 'month' | 'day' | 'year', value?: number) => {
    const date = { ...dateValue }

    date[field] = value

    setDateValue(date)
  }

  useEffect(() => {
    onChange && onChange(dateValue)
  }, [dateValue, onChange])

  return (
    <Fieldset {...rest} error={error}>
      {hint && <Hint fieldId={fieldId}>{hint}</Hint>}

      <div className="usa-memorable-date">
        <Input
          ref={refs?.day}
          {...sharedProps}
          className="usa-form-group--day"
          defaultValue={defaultValues?.day}
          label="Day"
          maxLength={2}
          name={`${name}--day`}
          onChange={(e) => {
            const value = e.target.value
            onDateChange('day', value ? parseInt(e.target.value) : undefined)
          }}
          pattern="[0-9]*"
        />

        <Input
          ref={refs?.year}
          {...sharedProps}
          className="usa-form-group--year"
          defaultValue={defaultValues?.year}
          label="Year"
          minLength={4}
          maxLength={4}
          name={`${name}--year`}
          onChange={(e) => {
            const value = e.target.value
            onDateChange('year', value ? parseInt(e.target.value) : undefined)
          }}
          pattern="[0-9]*"
        />
      </div>
    </Fieldset>
  )
}

export default Date
