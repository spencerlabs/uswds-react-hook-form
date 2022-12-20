import { useFormContext, RegisterOptions } from 'react-hook-form'

export type UseRegisterProps<
  Element extends
    | HTMLTextAreaElement
    | HTMLSelectElement
    | HTMLInputElement = HTMLInputElement
> = {
  name: string
  onBlur?: React.FocusEventHandler<Element>
  onChange?: React.ChangeEventHandler<Element>
  type?: string
  validation?: RegisterOptions
}

export const useRegister = <
  T,
  Element extends
    | HTMLTextAreaElement
    | HTMLSelectElement
    | HTMLInputElement = HTMLInputElement
>(
  props: UseRegisterProps<Element> & { element?: string },
  ref: React.ForwardedRef<T>
) => {
  const { register } = useFormContext()

  const validation = props.validation || { required: false }

  const {
    ref: _ref,
    onBlur: handleBlur,
    onChange: handleChange,
    ...rest
  } = register(props.name, validation)

  const onBlur: React.FocusEventHandler<Element> = (event) => {
    handleBlur(event)
    props.onBlur?.(event)
  }

  const onChange: React.ChangeEventHandler<Element> = (event) => {
    handleChange(event)
    props.onChange?.(event)
  }

  return {
    ...rest,
    ref: (element: T) => {
      _ref(element)

      if (typeof ref === 'function') {
        ref(element)
      } else if (ref) {
        ref.current = element
      }
    },
    onBlur,
    onChange,
  }
}
