import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import inputMask from '@uswds/uswds/js/usa-input-mask'
import { RegisterOptions } from 'react-hook-form'

import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { useErrors, useRegister } from 'lib/hooks'
import { classNames } from 'lib/utils'

const INPUT_TYPES = [
  'button',
  'color',
  'date',
  'datetime-local',
  'email',
  'file',
  'hidden',
  'image',
  'month',
  'number',
  'password',
  'radio',
  'range',
  'reset',
  'search',
  'submit',
  'tel',
  'text',
  'time',
  'url',
  'week',
] as const

type InputType = typeof INPUT_TYPES[number]

export interface FieldProps<
  Element extends
    | HTMLTextAreaElement
    | HTMLSelectElement
    | HTMLInputElement = HTMLInputElement
> {
  name: string
  validation?: RegisterOptions
  type?: string
  onBlur?: React.FocusEventHandler<Element>
  onChange?: React.ChangeEventHandler<Element>
}

export interface InputFieldProps
  extends Omit<FieldProps<HTMLInputElement>, 'type'>,
    Omit<React.ComponentPropsWithRef<'input'>, 'name' | 'type' | 'prefix'> {
  characterCount?: boolean
  error?: boolean
  hint?: boolean
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  type?: InputType
  width?: '2xs' | 'xs' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'xl' | '2xl'
}

const InputField = forwardRef(
  (
    {
      characterCount,
      className,
      error: passedError,
      hint,
      name,
      onBlur,
      onChange,
      prefix,
      suffix,
      type = 'text',
      validation,
      width,
      ...rest
    }: InputFieldProps,
    ref: React.Ref<HTMLInputElement | null>
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current)

    const [canCountCharacters, setCanCountCharacters] = useState(false)

    const useRegisterReturn = useRegister(
      {
        name,
        validation,
        onBlur,
        onChange,
        type,
      },
      ref
    )

    const formError = useErrors(name)

    const error = passedError || !!formError

    useEffect(() => {
      const inputEl = inputRef.current

      if (!inputEl || !inputEl.hasAttribute('maxLength') || !characterCount)
        return

      setCanCountCharacters(true)
    }, [characterCount])

    useEffect(() => {
      const inputEl = inputRef.current

      if (!inputEl || !rest.placeholder || !rest.pattern) return

      inputMask.on(inputEl)

      return () => {
        inputMask.off(inputEl)
      }
    }, [rest.placeholder, rest.pattern])

    return (
      <ConditionalWrapper
        if={!!(prefix || suffix)}
        with="div"
        wrapperProps={{
          className: classNames(
            'usa-input-group',
            error && 'usa-input-group--error',
            width && `usa-input-group--${width}`
          ),
        }}
      >
        {prefix && (
          <div className="usa-input-prefix" aria-hidden="true">
            {prefix}
          </div>
        )}

        <input
          {...rest}
          className={classNames(
            'usa-input',
            canCountCharacters && 'usa-character-count__field',
            error && 'usa-input--error',
            width && `usa-input--${width}`,
            rest.placeholder && rest.pattern && 'usa-masked',
            className
          )}
          type={type}
          aria-describedby={
            canCountCharacters || error || hint
              ? classNames(
                  canCountCharacters && `${rest.id}--info`,
                  error && `${rest.id}--error`,
                  hint && `${rest.id}--hint`
                )
              : undefined
          }
          {...useRegisterReturn}
        />

        {suffix && (
          <div className="usa-input-suffix" aria-hidden="true">
            {suffix}
          </div>
        )}
      </ConditionalWrapper>
    )
  }
)

export default InputField
