import { forwardRef } from 'react'

import { useFieldId } from '../../../hooks'
import { BaseFieldProps, FormGroup } from '../../FormGroup'

import Field, { TextAreaFieldProps } from './TextAreaField/TextAreaField'

interface TextareaGroupProps
  extends Omit<TextAreaFieldProps, 'hint'>,
    BaseFieldProps {}

const TextAreaComponent = forwardRef<HTMLTextAreaElement, TextareaGroupProps>(
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

const TextArea = Object.assign(TextAreaComponent, { Field })

export default TextArea
