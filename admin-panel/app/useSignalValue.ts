import { Signal } from '@preact/signals-core'
import {
  useEffect, useState,
} from 'react'

const useSignalValue = (signal: Signal) => {
  const [value, setValue] = useState(signal.value)

  useEffect(
    () => {
      const unsubscribe = signal.subscribe((newValue) => {
        setValue(newValue)
      })

      // [signet] fork fix: pick up writes that happened before subscribing
      setValue(signal.value)

      return () => {
        unsubscribe()
      }
    },
    [signal],
  )

  return value
}

export default useSignalValue
