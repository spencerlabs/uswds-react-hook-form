import { useId } from './useId'

export const useFieldId = (id?: string) => {
  if (id) return id

  return useId()
}
