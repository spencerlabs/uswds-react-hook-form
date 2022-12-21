import { forwardRef } from 'react'

import { BaseFieldProps, FormGroup } from 'components/Form/FormGroup'
import { useFieldId } from 'lib/hooks'

import Field, { TextAreaFieldProps } from './TextAreaField/TextAreaField'

interface TextAreaGroupProps
  extends Omit<TextAreaFieldProps, 'hint'>,
    BaseFieldProps {}

const TextAreaComponent = forwardRef<HTMLTextAreaElement, TextAreaGroupProps>(
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
          hint={!!hint}
        />
      </FormGroup>
    )
  }
)

const TextArea = Object.assign(TextAreaComponent, { Field })

export default TextArea
