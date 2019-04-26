import React, { createContext } from 'react'
import { arrayOf, bool, element, number, shape, string } from 'prop-types'

export const ConfigContext = createContext()

export const ConfigContextProvider = ({ categories, isApproval, children }) => (
    <ConfigContext.Provider value={{ categories, isApproval }}>
        {children}
    </ConfigContext.Provider>
)

ConfigContextProvider.propTypes = {
    categories: arrayOf(
        shape({
            label: string.isRequired,
            value: string.isRequired,
            icon: string.isRequired,
            status: string.isRequired,
            sqlViews: shape({
                count: arrayOf(string).isRequired,
                table: arrayOf(string).isRequired,
            }).isRequired,
            count: number.isRequired,
            param: bool,
        })
    ).isRequired,
    isApproval: bool,
    children: element.isRequired,
}
