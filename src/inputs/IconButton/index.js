import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Icon } from '@dhis2/ui/core'

export class IconButton extends Component {
    static id = 'icon_button'
    state = { clicked: false }

    onClick = () => {
        this.setState({ clicked: true })
    }

    render() {
        if (this.state.clicked)
            return <Redirect push to={this.props.redirect} />

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
