import { useState, useEffect, useRef } from 'react'

export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)
    const firstUpdate = useRef(true)

    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(handler)
    }, [value])

    if (firstUpdate.current) {
        firstUpdate.current = false
        return [null, setDebouncedValue]
    }

    return [debouncedValue, setDebouncedValue]
}
