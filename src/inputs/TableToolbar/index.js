import React from 'react'
import { bool, func } from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import { IconContainer } from './style'

/**
 * Adds an extra add button to the table toolbar.
 */
const TableToolbar = props => (
    <>
        <Tooltip
            title={
                props.addButtonDisabled
                    ? 'You cannot add records for the selected organisation unit'
                    : 'Add new record'
            }
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

TableToolbar.propTypes = {
    onAddClick: func.isRequired,
    addButtonDisabled: bool.isRequired,
}

export default withStyles({ iconButton: {} }, { name: 'TableToolbar' })(
    TableToolbar
)
