import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import type { FieldProps } from 'components/Fields/Input/InputField/InputField'
import { useErrors, useRegister } from 'lib/hooks'
import { classNames } from 'lib/utils'

export interface TextAreaFieldProps
  extends Omit<FieldProps<HTMLTextAreaElement>, 'type'>,
    Omit<React.ComponentPropsWithRef<'textarea'>, 'name'> {
  characterCount?: boolean
  error?: boolean
  hint?: boolean
  width?: '2xs' | 'xs' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'xl' | '2xl'
}

const TextAreaField = forwardRef(
  (
    {
      characterCount,
      className,
      error: passedError,
      hint,
      name,
      onBlur,
      onChange,
      validation,
      width,
      ...rest
    }: TextAreaFieldProps,
    ref: React.Ref<HTMLTextAreaElement | null>
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textareaRef.current)

    const [canCountCharacters, setCanCountCharacters] = useState(false)

    const useRegisterReturn = useRegister(
      {
        name,
        validation,
        onBlur,
        onChange,
      },
      ref
    )

    const formError = useErrors(name)

    const error = passedError || !!formError

    useEffect(() => {
      const textareaEl = textareaRef.current

      if (
        !textareaEl ||
        !textareaEl.hasAttribute('maxLength') ||
        !characterCount
      )
        return

      setCanCountCharacters(true)
    }, [characterCount])

    return (
      <textarea
        {...rest}
        className={classNames(
          'usa-textarea',
          canCountCharacters && 'usa-character-count__field',
          error && 'usa-input--error',
          width && `usa-input--${width}`,
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
        {...useRegisterReturn}
      />
    )
  }
)

export default TextAreaField
