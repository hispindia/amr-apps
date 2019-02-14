import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import './style.css'

/**
 * Sidebar menu.
 */
export class SidebarMenu extends Component {
    state = { path: null }

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
        this.setState({ path: path })
    }

    render() {
        return (
            <div id="sidebar_menu">
                {this.state.path ? (
                    <Redirect push to={this.state.path} />
                ) : null}
                <Menu
                    size="dense"
                    list={this.menuItems}
                    onClick={this.onClick}
                />
            </div>
        )
    }
}
