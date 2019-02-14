import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import './style.css'

/**
 * Sidebar menu.
 */
class SidebarMenu extends Component {
    menuItems = [
        {
            label: 'Persons',
            value: '/',
            icon: 'people',
        },
        {
            label: 'Records for Revision (0)',
            value: '/events/Resend/',
            icon: 'help_outline',
        },
        {
            label: 'Rejected Records (0)',
            value: '/events/Rejected/',
            icon: 'highlight_off',
        },
        {
            label: 'Accepted Records (0)',
            value: '/events/Approved/',
            icon: 'check_circle_outline',
        },
    ]

    onClick = path => {
        this.props.history.push(path)
    }

    render() {
        return (
            <div id="sidebar_menu">
                <Menu
                    size="dense"
                    list={this.menuItems}
                    onClick={this.onClick}
                />
            </div>
        )
    }
}

export default withRouter(SidebarMenu)
