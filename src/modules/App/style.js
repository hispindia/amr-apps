import { createMuiTheme } from '@material-ui/core'
import styled, { createGlobalStyle } from 'styled-components'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import 'typeface-roboto'

export const Fixed = styled.div`
    position: fixed;
    width: 100%;
    z-index: 1000;
    top: 0;
`

export const BodyStyle = createGlobalStyle`
    body {
        background-color: rgb(240, 240, 240);
        margin: 0;
        padding: 0;
        font-family: Roboto;
        letter-spacing: 0.0075em;
    }
`

export const theme = createMuiTheme({
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
