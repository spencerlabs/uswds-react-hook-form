import { forwardRef, ForwardedRef } from 'react'

import {
  useForm,
  FieldValues,
  FormProvider,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

import { classNames } from '../../../utils'

interface FormProps<TFieldValues extends FieldValues>
  extends Omit<React.ComponentPropsWithRef<'form'>, 'onSubmit'> {
  /**
   * @see {@link https://react-hook-form.com/api/useform}
   */
  config?: UseFormProps<TFieldValues>
  /**
   * The methods returned by `useForm`.
   * This prop is only necessary if you've called `useForm` yourself to get
   * access to one of its functions, like `reset`.
   */
  formMethods?: UseFormReturn<TFieldValues>
  /** Use large width form */
  large?: boolean
  /** Function to call when the form is submitted */
  onSubmit?: (value: TFieldValues, event?: React.BaseSyntheticEvent) => void
}

function FormInner<TFieldValues extends FieldValues>(
  {
    children,
    className,
    config,
    formMethods: propFormMethods,
    large,
    onSubmit,
    ...rest
  }: FormProps<TFieldValues>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const hookFormMethods = useForm<TFieldValues>(config)
  const formMethods = propFormMethods || hookFormMethods

  return (
    <form
      ref={ref}
      {...rest}
      className={classNames('usa-form', large && 'usa-form--large', className)}
      onSubmit={formMethods.handleSubmit((data, event) =>
        onSubmit?.(data, event)
      )}
    >
      <FormProvider {...formMethods}>{children}</FormProvider>
    </form>
  )
}

const FormComponent = forwardRef(FormInner) as <
  TFieldValues extends FieldValues
>(
  props: FormProps<TFieldValues> & React.RefAttributes<HTMLFormElement>
) => React.ReactElement | null

const Form = Object.assign(FormComponent)

export default Form
