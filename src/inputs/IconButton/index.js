import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Icon } from '@dhis2/ui/core'

/**
 * Icon Button.
 */
class IconButton extends Component {
    onClick = () => {
        this.props.history.push(this.props.redirect)
    }

    render() {
        return (
            <div className="icon_button">
                <Icon
                    name={this.props.name}
                    className={this.props.icon}
                    onClick={this.props.onClick}
                />
            </div>
        )
    }
}

export default withRouter(IconButton)
