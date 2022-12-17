import React, { useEffect, useState } from 'react'

let id = 0

function generateId() {
  return ++id
}

export const useId =
  React.useId ??
  function useId() {
    const [id, setId] = useState<number | null>(null)

    useEffect(() => {
      if (id === null) setId(generateId())
    }, [id])

    return id !== null ? '' + id : undefined
  }
