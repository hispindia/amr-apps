import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import { getEventCounts } from '../../../api/api'

/**
 * Sidebar menu.
 */
class SidebarMenu extends Component {
    state = {
        menuItems: null,
        statuses: [],
        selected: null,
        userOnly: false,
    }

    componentDidMount = async () => {
        const { menuItems } = this.props
        const statuses = menuItems.items.map(menuItem => {
            return menuItem.status
        })
        this.setState({
            menuItems: menuItems.items,
            statuses: statuses,
            userOnly: menuItems.userOnly,
        })
        await this.updateCounts(menuItems.items, statuses, menuItems.userOnly)
    }

    componentDidUpdate = async () => {
        // Updates counts, if URL or selected OU has changed.
        if (this.state.pathname)
            if (
                this.props.selected !== this.state.selected ||
                (this.props.history.location.pathname !== this.state.pathname &&
                    this.state.pathname)
            )
                await this.updateCounts(
                    this.state.menuItems,
                    this.state.statuses,
                    this.state.userOnly
                )
    }

    /**
     * Updates count number in menu.
     */
    updateCounts = async (menuItems, statuses, userOnly) => {
        let counts = await getEventCounts(
            this.props.selected.id,
            statuses,
            userOnly
        )

        // Updating count number in menu.
        menuItems.forEach(
            menuItem =>
                (menuItem.label = menuItem.label.replace(
                    /\(\d*\)/,
                    `(${counts[menuItem.status]})`
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
        const { menuItems } = this.state
        if (!menuItems) return null

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
