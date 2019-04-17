import React from 'react'
import { bool, object, string } from 'prop-types'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { Content } from 'modules'
import { BodyStyle, theme } from './style'

export const App = props => (
    <BrowserRouter>
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                <>
                    <BodyStyle />
                    <HeaderBar appName={props.appName} />
                    <Content
                        menuItems={props.menuItems}
                        tables={props.tables}
                        isApproval={props.isApproval}
                    />
                </>
            </MuiThemeProvider>
        </HashRouter>
    </BrowserRouter>
)

App.propTypes = {
    appName: string.isRequired,
    menuItems: object.isRequired,
    tables: object.isRequired,
    isApproval: bool,
}
