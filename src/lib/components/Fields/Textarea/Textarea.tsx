import { forwardRef } from 'react'

import { useFieldId } from '../../../hooks'
import { BaseFieldProps, FormGroup } from '../../FormGroup'

import Field, { TextareaFieldProps } from './TextareaField/TextareaField'

interface TextareaGroupProps
  extends Omit<TextareaFieldProps, 'hint'>,
    BaseFieldProps {}

const TextareaComponent = forwardRef<HTMLTextAreaElement, TextareaGroupProps>(
  ({ characterCount, hint, id, label, ...rest }, ref) => {
    const fieldId = useFieldId(id)

    return (
      <FormGroup
        characterCount={characterCount}
        fieldId={fieldId}
        label={label}
        hint={hint}
        name={rest.name}
      >
        <Field
          ref={ref}
          {...rest}
          id={fieldId}
          characterCount={characterCount}
          hint={hint ? true : false}
        />
      </FormGroup>
    )
  }
)

const Textarea = Object.assign(TextareaComponent, { Field })

export default Textarea
