import React, { useState, useEffect } from 'react'
import { BrowserRouter, HashRouter } from 'react-router-dom'
import HeaderBar from '@dhis2/ui/widgets/HeaderBar'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import 'typeface-roboto'
import { createGlobalStyle } from 'styled-components'
import { Main, Sidebar } from '../'
import { Row, getOrgUnits } from '../../'

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
                letterSpacing: 'normal'
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

export const App = props => {
    const { menuItems, tables, isApproval } = props
    const [orgUnits, setOrgUnits] = useState(null)
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        const setMetadata = async () => {
            const ous = await getOrgUnits()
            const sel = {
                id: ous[0].id,
                name: ous[0].displayName,
            }
            setOrgUnits(ous)
            setSelected(sel)
        }
        setMetadata()
    }, [])

    if (!selected) return null

    return (
        <BrowserRouter>
        <HashRouter>
        <MuiThemeProvider theme={theme}>
            <>
            <BodyStyle/>
            <HeaderBar appName={props.appName} />
            <Row>
                <Sidebar
                    onSelect={setSelected}
                    selected={selected}
                    orgUnits={orgUnits}
                    menuItems={menuItems}
                />
                <Main
                    tables={tables}
                    selected={selected.id}
                    isApproval={isApproval}
                />
            </Row>
            </>
        </MuiThemeProvider>
        </HashRouter>
        </BrowserRouter>
    )
}
