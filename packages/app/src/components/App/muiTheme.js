import { createMuiTheme } from '@material-ui/core'
import { theme } from '@dhis2/ui-core'

export const muiTheme = createMuiTheme({
    palette: {
        primary: {
            main: theme.secondary600,
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
