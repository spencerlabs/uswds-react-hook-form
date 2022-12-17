import { Hint, Input } from '../../'
import { useFieldId } from '../../../hooks'
import Fieldset, { FieldsetProps } from '../../Fieldset/Fieldset'

interface MemorableDateProps extends Omit<FieldsetProps, 'children'> {
  hint?: React.ReactNode
  name: string
}

const MemorableDate = ({ error, hint, name, ...rest }: MemorableDateProps) => {
  const fieldId = useFieldId(rest.id)

  return (
    <Fieldset {...rest} error={error}>
      {hint && <Hint fieldId={fieldId}>{hint}</Hint>}

      <div className="usa-memorable-date">
        <Input
          className="usa-form-group--day"
          label="Day"
          maxLength={2}
          name={`${name}--day`}
          pattern="[0-9]*"
        />

        <Input
          className="usa-form-group--year"
          label="Year"
          minLength={4}
          maxLength={4}
          name={`${name}--year`}
          pattern="[0-9]*"
        />
      </div>
    </Fieldset>
  )
}

export default MemorableDate
