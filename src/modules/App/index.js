import React from 'react'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import { MuiPickersUtilsProvider } from 'material-ui-pickers'
import DayjsUtils from '@date-io/dayjs'
import { Content, Header } from 'modules'
import { ConfigContextProvider } from 'contexts'
import { BodyStyle, theme } from './style'
import { MarginTop } from 'styles'

export const App = ({ appName, categories, isApproval, baseUrl }) => (
    <BrowserRouter>
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                <MuiPickersUtilsProvider utils={DayjsUtils}>
                    <>
                        <BodyStyle />
                        <Header appName={appName} baseUrl={baseUrl} />
                        <ConfigContextProvider
                            categories={categories}
                            isApproval={isApproval}
                        >
                            <MarginTop margin={48}>
                                <Content removingThisBreaksTheApp={appName} />
                            </MarginTop>
                        </ConfigContextProvider>
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
