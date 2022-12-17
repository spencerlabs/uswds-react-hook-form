import { forwardRef } from 'react'

import { useFieldId } from '../../../hooks'
import { BaseFieldProps, FormGroup } from '../../FormGroup'

import Field, { InputFieldProps } from './InputField/InputField'

interface InputGroupProps
  extends Omit<InputFieldProps, 'hint'>,
    BaseFieldProps {}

const InputComponent = forwardRef<HTMLInputElement, InputGroupProps>(
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

const Input = Object.assign(InputComponent, { Field })

export default Input
