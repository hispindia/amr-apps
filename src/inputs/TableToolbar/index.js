import React from 'react'
import { bool, func } from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import { IconContainer } from './style'

const title = {
    true: 'You cannot add records for the selected organisation unit',
    false: 'Add new record',
}

/**
 * Adds an extra add button to the table toolbar.
 */
const TableToolbar = ({ addButtonDisabled, onAddClick }) => (
    <>
        <Tooltip title={title[addButtonDisabled]}>
            <span>
                <IconContainer
                    onClick={onAddClick}
                    disabled={addButtonDisabled}
                >
                    <AddIcon />
                </IconContainer>
            </span>
        </Tooltip>
    </>
)

TableToolbar.propTypes = {
    onAddClick: func.isRequired,
    addButtonDisabled: bool.isRequired,
}

export default withStyles({ iconButton: {} }, { name: 'TableToolbar' })(
    TableToolbar
)
