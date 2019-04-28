import React, { createContext } from 'react'
import { arrayOf, element, object } from 'prop-types'

export const MetadataContext = createContext()

export const MetadataContextProvider = ({ children, metadata }) => {
    const value = { ...metadata }
    return (
        <MetadataContext.Provider value={value}>
            {children}
        </MetadataContext.Provider>
    )
}

MetadataContextProvider.propTypes = {
    metadata: object.isRequired,
    children: arrayOf(element).isRequired,
}
