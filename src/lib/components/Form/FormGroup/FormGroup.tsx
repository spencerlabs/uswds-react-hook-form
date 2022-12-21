import React, { useEffect, useRef } from 'react'

import { characterCount as uswdsCharacterCount } from '@uswds/uswds/js'
import { RegisterOptions } from 'react-hook-form'

import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { Form, Hint, Label } from 'lib/components'
import { useErrors } from 'lib/hooks'
import { classNames } from 'lib/utils'

export interface BaseFieldProps {
  characterCount?: boolean
  hint?: React.ReactNode
  label: React.ReactNode
  name: string
  validation?: RegisterOptions
}

interface FormGroupProps
  extends React.ComponentPropsWithoutRef<'div'>,
    BaseFieldProps {
  fieldId: string
}

const FormGroup = ({
  characterCount,
  children,
  className,
  fieldId,
  hint,
  label,
  name,
}: FormGroupProps) => {
  const characterCountRef = useRef<HTMLDivElement>(null)

  const error = useErrors(name)

  useEffect(() => {
    const characterCountEl = characterCountRef.current

    if (!characterCountEl || !characterCount) return

    uswdsCharacterCount.on(characterCountEl)

    return () => {
      uswdsCharacterCount.off(characterCountEl)
    }
  }, [characterCount])

  return (
    <ConditionalWrapper
      if={characterCount}
      with="div"
      wrapperProps={{
        ref: characterCountRef,
        className: 'usa-character-count',
      }}
    >
      <div
        className={classNames(
          'usa-form-group',
          error && 'usa-form-group--error',
          className
        )}
      >
        <Label htmlFor={fieldId}>{label}</Label>

        {hint && <Hint fieldId={fieldId}>{hint}</Hint>}

        {/* Form field */}
        {children}

        {error && <Form.Error fieldId={fieldId}>{error}</Form.Error>}
      </div>

      {characterCount && (
        <span
          id={`${fieldId}--info`}
          className="usa-hint usa-character-count__message"
          aria-live="polite"
        />
      )}
    </ConditionalWrapper>
  )
}

export default FormGroup
