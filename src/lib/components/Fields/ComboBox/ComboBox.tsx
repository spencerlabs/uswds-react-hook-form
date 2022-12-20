import { forwardRef } from 'react'

import { useFieldId } from '../../../hooks'
import { BaseFieldProps, FormGroup } from '../../FormGroup'

import Field, { ComboBoxFieldProps } from './ComboBoxField/ComboBoxField'

interface ComboBoxGroupProps
  extends Omit<ComboBoxFieldProps, 'hint'>,
    Omit<BaseFieldProps, 'characterCount'> {}

const ComboBoxComponent = forwardRef<HTMLSelectElement, ComboBoxGroupProps>(
  ({ hint, id, label, ...rest }, ref) => {
    const fieldId = useFieldId(id)

    return (
      <FormGroup
        className="usa-form-group--select"
        fieldId={fieldId}
        label={label}
        hint={hint}
        name={rest.name}
      >
        <Field ref={ref} {...rest} id={fieldId} hint={hint ? true : false} />
      </FormGroup>
    )
  }
)

const ComboBox = Object.assign(ComboBoxComponent, { Field })

export default ComboBox
