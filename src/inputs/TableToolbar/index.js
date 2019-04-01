import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'

const IconContainer = styled(IconButton)`
    color: white !important;
    background: linear-gradient(180deg, #1565c0, #0650a3);
    border: 1px solid var(--primary800);
    &:hover {
        background: linear-gradient(180deg, #054fa3, #034793);
    }
`

/**
 * Adds an extra add button to the table toolbar.
 */
const TableToolbar = props => (
    <React.Fragment>
        <Tooltip title='Add new record'>
            <IconContainer onClick={props.onAddClick}>
                <AddIcon />
            </IconContainer>
        </Tooltip>
    </React.Fragment>
)

export default withStyles({ iconButton: {} }, { name: 'TableToolbar' })(
    TableToolbar
)
