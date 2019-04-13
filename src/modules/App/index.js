import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { createGlobalStyle } from 'styled-components'
import 'typeface-roboto'
import { Content } from '../'

const BodyStyle = createGlobalStyle`
    body {
        background-color: rgb(240, 240, 240);
        margin: 0;
        padding: 0;
        font-family: Roboto;
        letter-spacing: 0.0075em;
    }
`

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#1565c0',
        },
    },
    typography: {
        useNextVariants: true,
    },
    overrides: {
        MUIDataTableToolbar: {
            titleRoot: { marginLeft: 16 },
            titleText: {
                fontSize: '1.25rem',
                color: '#0d0d0e',
                letterSpacing: 'normal',
            },
        },
        MUIDataTableBodyRow: {
            root: {
                userSelect: 'none',
                cursor: 'pointer',
            },
        },
    },
})

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
