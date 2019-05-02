import React from 'react'
import { arrayOf, bool, number, shape, string } from 'prop-types'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { MuiThemeProvider } from '@material-ui/core'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { Content } from 'modules'
import { ConfigContextProvider } from 'contexts'
import { Fixed, BodyStyle, theme } from './style'
import { MarginTop } from 'styles'

export const App = ({ appName, categories, isApproval }) => (
    <BrowserRouter>
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                <>
                    <BodyStyle />
                    <Fixed>
                        <HeaderBar appName={appName} />
                    </Fixed>
                    <ConfigContextProvider
                        categories={categories}
                        isApproval={isApproval}
                    >
                        <MarginTop margin={48}>
                            <Content removingThisBreaksTheApp={appName} />
                        </MarginTop>
                    </ConfigContextProvider>
                </>
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
