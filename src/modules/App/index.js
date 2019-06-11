import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import { MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import DayjsUtils from '@date-io/dayjs'
import { CssReset } from '@dhis2/ui-core'
import { Content, Header } from 'modules'
import { BodyStyle, theme } from './style'
import { MarginTop } from 'styles'
import { store } from '../../store'

export const App = ({ appName, categories, isApproval, baseUrl }) => (
    <BrowserRouter>
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <>
                        <CssReset />
                        <BodyStyle />
                        <Header appName={appName} baseUrl={baseUrl} />
                        <Provider store={store(categories, isApproval)}>
                            <Content removingThisBreaksTheApp={appName} />
                        </Provider>
                    </>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </HashRouter>
    </BrowserRouter>
)

App.propTypes = {
    appName: string.isRequired,
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
}
