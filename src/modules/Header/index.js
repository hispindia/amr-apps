import React from 'react'
import { string } from 'prop-types'
import { DataProvider } from '@dhis2/app-runtime'
import { FixedHeaderBar } from './style'

export const Header = ({ appName, baseUrl }) => (
    <DataProvider baseUrl={baseUrl} apiVersion={30}>
        <FixedHeaderBar appName={appName} />
    </DataProvider>
)

Header.propTypes = {
    appName: string.isRequired,
    baseUrl: string.isRequired,
}
