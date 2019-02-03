import React from 'react'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import AddIcon from '@material-ui/icons/Add'
import { withStyles } from '@material-ui/core/styles'
import './style.css'

const defaultToolbarStyles = {
    iconButton: {},
}

class TableToolbar extends React.Component {
    render() {
        const { classes } = this.props

        return (
            <React.Fragment>
                <Tooltip title={'Add'}>
                    <IconButton
                        onClick={this.props.onAddClick}
                        className={'add_button'}
                    >
                        <AddIcon className={classes.deleteIcon} />
                    </IconButton>
                </Tooltip>
            </React.Fragment>
        )
    }
}

export default withStyles(defaultToolbarStyles, { name: 'TableToolbar' })(
    TableToolbar
)
