import React from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import { AppContent } from '../AppContent'
import '../../css'

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
            titleText: { fontSize: '1.25rem !important' },
        },
        MUIDataTableBodyRow: {
            root: {
                userSelect: 'none',
                cursor: 'pointer',
            },
        },
    },
})

export const AppSkeleton = props => (
    <BrowserRouter>
        <HashRouter>
            <MuiThemeProvider theme={theme}>
                <div>
                    <HeaderBar appName={props.appName} />
                    <AppContent
                        userOnly={props.userOnly}
                        menuItems={props.menuItems}
                    >
                        {props.children}
                    </AppContent>
                </div>
            </MuiThemeProvider>
        </HashRouter>
    </BrowserRouter>
)
