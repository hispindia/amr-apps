import React from 'react'
import { string } from 'prop-types'
import styled from 'styled-components'
import { DataProvider } from '@dhis2/app-runtime'
import { HeaderBar } from '@dhis2/ui-widgets'

export const FixedHeaderBar = styled(HeaderBar)`
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
`

export const Header = ({ appName, baseUrl }) => (
    <DataProvider baseUrl={baseUrl} apiVersion={30}>
        <FixedHeaderBar appName={appName} />
    </DataProvider>
)

Header.propTypes = {
    appName: string.isRequired,
    baseUrl: string.isRequired,
}
