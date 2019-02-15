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
        ],
    }

    componentDidMount = async () => {
        await this.updateCounts()
    }

    componentWillReceiveProps = async props => {
        await this.updateCounts()
    }

    updateCounts = async () => {
        let menuItems = [...this.state.menuItems]
        let counts = await getEventCounts(this.props.selected.id, [
            'Resend',
            'Rejected',
            'Approved',
        ])

        menuItems
            .slice(1)
            .forEach(
                (menuItem, i) =>
                    (menuItem.label = menuItem.label.replace(/\d/, counts[i]))
            )

        this.setState({ menuItems: menuItems })
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
