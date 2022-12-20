import { useEffect, useState } from 'react'

import { Hint, Input, Select } from '../..'
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
        <Select
          ref={refs?.month}
          {...sharedProps}
          className="usa-form-group--month"
          label="Month"
          name={`${name}--month`}
        >
          <option value={undefined}>- Select -</option>
          <option value="1">01 - January</option>
          <option value="2">02 - February</option>
          <option value="3">03 - March</option>
          <option value="4">04 - April</option>
          <option value="5">05 - May</option>
          <option value="6">06 - June</option>
          <option value="7">07 - July</option>
          <option value="8">08 - August</option>
          <option value="9">09 - September</option>
          <option value="10">10 - October</option>
          <option value="11">11 - November</option>
          <option value="12">12 - December</option>
        </Select>
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
