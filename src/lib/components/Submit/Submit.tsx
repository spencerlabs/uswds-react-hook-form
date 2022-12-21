import { forwardRef } from 'react'

import { classNames } from 'lib/utils'

export interface SubmitProps
  extends Omit<React.ComponentPropsWithRef<'button'>, 'type'> {
  big?: boolean
  inverse?: boolean
  unstyled?: boolean
  variant?: 'base' | 'secondary' | 'accent-cool' | 'accent-warm' | 'outline'
}

const Submit = forwardRef<HTMLButtonElement, SubmitProps>(
  ({ big, children, className, inverse, unstyled, variant, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        {...rest}
        type="submit"
        className={classNames(
          'usa-button',
          big && 'usa-button--big',
          variant && `usa-button--${variant}`,
          inverse && 'usa-button--inverse',
          unstyled && 'usa-button--unstyled',
          className
        )}
      >
        {children}
      </button>
    )
  }
)

export default Submit
