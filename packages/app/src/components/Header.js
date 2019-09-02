import React from 'react'
import { string } from 'prop-types'
import { DataProvider } from '@dhis2/app-runtime'
import { HeaderBar } from '@dhis2/ui-widgets'

export const Header = ({ appName, baseUrl }) => (
    <DataProvider baseUrl={baseUrl} apiVersion={30}>
        <HeaderBar appName={appName} />
    </DataProvider>
)

Header.propTypes = {
    appName: string.isRequired,
    baseUrl: string.isRequired,
}
