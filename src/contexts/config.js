import React, { createContext } from 'react'
import {
    arrayOf,
    bool,
    element,
    number,
    object,
    oneOfType,
    shape,
    string,
} from 'prop-types'

export const ConfigContext = createContext()

export const ConfigContextProvider = ({
    items,
    tables,
    isApproval,
    children,
}) => (
    <ConfigContext.Provider value={{ items, tables, isApproval }}>
        {children}
    </ConfigContext.Provider>
)

ConfigContextProvider.propTypes = {
    items: arrayOf(
        shape({
            label: string,
            value: string,
            icon: string,
            status: string,
            countView: oneOfType([string, object]).isRequired,
            count: number,
        })
    ).isRequired,
    tables: object.isRequired,
    children: element.isRequired,
    isApproval: bool,
}
