import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import styled, { css } from 'styled-components'

/**
 * DHIS2 styled icons.
 */
const IconContainer = styled(IconButton)`
    color: white !important;
    background: linear-gradient(180deg, #1565c0, #0650a3);
    border: 1px solid var(--primary800);
    &:hover {
        background: linear-gradient(180deg, #054fa3, #034793);
    }
    ${props => props.disabled &&
        css`opacity: .33;`
    }
`

/**
 * Adds an extra add button to the table toolbar.
 */
const TableToolbar = props => (
    <>
        <Tooltip title={
            props.addButtonDisabled
            ? 'You cannot add records for the selected organisation unit'
            : 'Add new record'}
        >
        <span>
            <IconContainer
                onClick={props.onAddClick}
                disabled={props.addButtonDisabled}
            >
                <AddIcon />
            </IconContainer>
        </span>
        </Tooltip>
    </>
)

export default withStyles({ iconButton: {} }, { name: 'TableToolbar' })(
    TableToolbar
)
