import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { string, object, node } from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import DayjsUtils from '@date-io/dayjs'
import { CssReset } from '@dhis2/ui-core'
import { Header } from 'components'
import { muiTheme } from './muiTheme'
import { BodyStyle } from './BodyStyle'
import { Alerts } from './Alerts'

export const App = ({ appName, baseUrl, store, children }) => (
    <BrowserRouter>
        <HashRouter>
            <MuiThemeProvider theme={muiTheme}>
                <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <>
                        <CssReset />
                        <BodyStyle />
                        <Header appName={appName} baseUrl={baseUrl} />
                        <Provider store={store}>
                            {children}
                            <Alerts />
                        </Provider>
                    </>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </HashRouter>
    </BrowserRouter>
)

App.propTypes = {
    appName: string.isRequired,
    baseUrl: string.isRequired,
    store: object.isRequired,
    children: node.isRequired,
}
