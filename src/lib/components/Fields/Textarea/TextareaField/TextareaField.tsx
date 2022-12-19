import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

import { classNames } from '../../../../utils'

export interface TextareaFieldProps
  extends React.ComponentPropsWithRef<'textarea'> {
  characterCount?: boolean
  error?: boolean
  hint?: boolean
  name: string
  width?: '2xs' | 'xs' | 'sm' | 'small' | 'md' | 'medium' | 'lg' | 'xl' | '2xl'
}

const TextareaField = forwardRef(
  (
    {
      characterCount,
      className,
      error,
      hint,
      width,
      ...rest
    }: TextareaFieldProps,
    ref: React.Ref<HTMLTextAreaElement | null>
  ) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    useImperativeHandle(ref, () => textareaRef.current)

    const [canCountCharacters, setCanCountCharacters] = useState(false)

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
        ref={textareaRef}
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
      />
    )
  }
)

export default TextareaField
