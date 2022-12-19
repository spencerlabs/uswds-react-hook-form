import React, { useEffect, useRef, useState } from 'react'

import { characterCount as uswdsCharacterCount } from '@uswds/uswds/js'

import { FieldError, Hint, Label } from '..'
import { classNames } from '../../utils'
import { ConditionalWrapper } from '../ConditionalWrapper'

export interface BaseFieldProps {
  characterCount?: boolean
  hint?: React.ReactNode
  label: React.ReactNode
  name: string
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
}: FormGroupProps) => {
  const [error, _setError] = useState('')
  const characterCountRef = useRef<HTMLDivElement>(null)

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

        {error && <FieldError fieldId={fieldId}>{error}</FieldError>}

        {/* Form field */}
        {children}
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
