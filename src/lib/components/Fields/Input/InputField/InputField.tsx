import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import inputMask from '@uswds/uswds/js/usa-input-mask'

import { classNames } from '../../../../utils'
import { ConditionalWrapper } from '../../../ConditionalWrapper'

export interface InputFieldProps
  extends Omit<React.ComponentPropsWithRef<'input'>, 'prefix'> {
  characterCount?: boolean
  error?: boolean
  hint?: boolean
  name: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
  type?:
    | 'color'
    | 'email'
    | 'hidden'
    | 'image'
    | 'month'
    | 'number'
    | 'password'
    | 'reset'
    | 'search'
    | 'tel'
    | 'text'
    | 'url'
    | 'week'
  width?: '2xs' | 'xs' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'xl' | '2xl'
}

const InputField = forwardRef(
  (
    {
      characterCount,
      className,
      error,
      hint,
      prefix,
      suffix,
      width,
      ...rest
    }: InputFieldProps,
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement>(null)
    useImperativeHandle(ref, () => inputRef.current)

    const [canCountCharacters, setCanCountCharacters] = useState(false)

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
        if={prefix || suffix ? true : false}
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
          ref={inputRef}
          {...rest}
          className={classNames(
            'usa-input',
            canCountCharacters && 'usa-character-count__field',
            error && 'usa-input--error',
            width && `usa-input--${width}`,
            rest.placeholder && rest.pattern && 'usa-masked',
            className
          )}
          aria-describedby={
            canCountCharacters || error || hint
              ? classNames(
                  canCountCharacters && `${rest.id}--info`,
                  error && `${rest.id}--error`,
                  hint && `${rest.id}--hint`
                )
              : undefined
          }
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
