import { forwardRef, ForwardedRef } from 'react'

import { useFieldId } from 'lib/hooks'
import { classNames } from 'lib/utils'
import {
  useForm,
  FieldValues,
  FormProvider,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form'

import { FormError as Error } from './FormError'
import { FormGroup as Group } from './FormGroup'

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
    id,
    large,
    onSubmit,
    ...rest
  }: FormProps<TFieldValues>,
  ref: ForwardedRef<HTMLFormElement>
) {
  const hookFormMethods = useForm<TFieldValues>(config)
  const formMethods = propFormMethods || hookFormMethods

  const formId = useFieldId(id)

  return (
    <FormProvider {...formMethods}>
      <form
        ref={ref}
        {...rest}
        id={formId}
        className={classNames(
          'usa-form',
          large && 'usa-form--large',
          className
        )}
        onSubmit={formMethods.handleSubmit((data, event) =>
          onSubmit?.(data, event)
        )}
      >
        {children}
      </form>
    </FormProvider>
  )
}

const FormComponent = forwardRef(FormInner) as <
  TFieldValues extends FieldValues
>(
  props: FormProps<TFieldValues> & React.RefAttributes<HTMLFormElement>
) => React.ReactElement | null

const Form = Object.assign(FormComponent, { Error, Group })

export default Form
