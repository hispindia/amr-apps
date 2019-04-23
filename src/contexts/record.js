import React, { createContext } from 'react'

export const RecordContext = createContext()

export const RecordContextProvider = ({ state, children }) => (
    <RecordContext.Provider value={state}>{children}</RecordContext.Provider>
)
