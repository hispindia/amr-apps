import React from 'react'
import {
    arrayOf,
    bool,
    number,
    object,
    oneOfType,
    shape,
    string,
} from 'prop-types'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { Content } from 'modules'
import { ConfigContextProvider } from 'contexts'
import { BodyStyle, theme } from './style'

export const App = props => (
    <BrowserRouter>
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                <>
                    <BodyStyle />
                    <HeaderBar appName={props.appName} />
                    <ConfigContextProvider
                        items={props.menuItems}
                        tables={props.tables}
                        isApproval={props.isApproval}
                    >
                        <Content removingThis={props.breaksTheApp} />
                    </ConfigContextProvider>
                </>
            </MuiThemeProvider>
        </HashRouter>
    </BrowserRouter>
)

App.propTypes = {
    appName: string.isRequired,
    menuItems: arrayOf(
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
    isApproval: bool,
}
