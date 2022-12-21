import { classNames } from 'lib/utils'

export interface HintProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'id'> {
  fieldId: string
}

const Hint = ({ children, className, fieldId, ...rest }: HintProps) => {
  return (
    <div
      {...rest}
      id={`${fieldId}--hint`}
      className={classNames('usa-hint', className)}
    >
      {children}
    </div>
  )
}

export default Hint
