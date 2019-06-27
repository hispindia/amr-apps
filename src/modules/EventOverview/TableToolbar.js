import React from 'react'
import { bool, func } from 'prop-types'
import styled, { css } from 'styled-components'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import { theme } from '@dhis2/ui-core'

const title = {
    true: 'You cannot add records for the selected organisation unit',
    false: 'Add new record',
}

/**
 * DHIS2 styled icons.
 */
export const IconContainer = styled(IconButton)`
    color: white !important;
    background: linear-gradient(180deg, #1565c0, #0650a3);
    border: 1px solid ${theme.primary800};
    &:hover {
        background: linear-gradient(180deg, #054fa3, #034793);
    }
    ${props =>
        props.disabled &&
        css`
            opacity: 0.33;
        `}
`

/**
 * Adds an extra add button to the table toolbar.
 */
const TableToolbar = ({ addButtonDisabled, onAddClick }) => (
    <Tooltip title={title[addButtonDisabled]}>
        <span>
            <IconContainer onClick={onAddClick} disabled={addButtonDisabled}>
                <AddIcon />
            </IconContainer>
        </span>
    </Tooltip>
)

TableToolbar.propTypes = {
    onAddClick: func.isRequired,
    addButtonDisabled: bool.isRequired,
}

export default withStyles({ iconButton: {} }, { name: 'TableToolbar' })(
    TableToolbar
)
