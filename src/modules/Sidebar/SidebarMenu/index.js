import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import './style.css'
import { getEventCounts } from '../../../api/api'

/**
 * Sidebar menu.
 */
class SidebarMenu extends Component {
    state = {
        menuItems: [
            {
                label: 'Persons',
                value: '/',
                icon: 'people',
            },
            {
                label: 'Records for revision (0)',
                value: '/events/Resend/',
                icon: 'error_outline',
                status: 'Resend',
            },
            {
                label: 'Rejected records (0)',
                value: '/events/Rejected/',
                icon: 'highlight_off',
                status: 'Rejected',
            },
            {
                label: 'Accepted records (0)',
                value: '/events/Approved/',
                icon: 'check_circle_outline',
                status: 'Approved',
            },
            {
                label: 'Records for validation (0)',
                value: '/events/Validate/',
                icon: 'help_outline',
                status: 'Validate',
            },
        ],
        selected: null,
    }

    componentDidMount = async () => {
        await this.updateCounts()
    }

    componentDidUpdate = async () => {
        // Updates counts, if URL has changed.
        if (
            this.props.selected !== this.state.selected ||
            this.props.history.location.pathname !== this.state.pathname
        )
            await this.updateCounts()
    }

    /**
     * Updates count number in menu.
     */
    updateCounts = async () => {
        let menuItems = [...this.state.menuItems]
        let counts = await getEventCounts(this.props.selected.id)

        // Updating count number in menu.
        menuItems
            .slice(1)
            .forEach(
                menuItem =>
                    (menuItem.label = menuItem.label.replace(
                        /\d/,
                        counts[menuItem.status]
                    ))
            )

        this.setState({
            menuItems: menuItems,
            selected: this.props.selected,
            pathname: this.props.history.location.pathname,
        })
    }

    onClick = path => {
        this.props.history.push(path)
    }

    render() {
        return (
            <div id="sidebar_menu">
                <Menu
                    size="dense"
                    list={this.state.menuItems}
                    onClick={this.onClick}
                />
            </div>
        )
    }
}

export default withRouter(SidebarMenu)
