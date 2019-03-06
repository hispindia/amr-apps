import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'

/**
 * Sidebar menu.
 */
class SidebarMenu extends Component {
    state = {
        menuItems: null,
        selected: null,
        userOnly: false,
    }

    componentDidMount = () => {
        const { menuItems } = this.props
        this.setState({
            menuItems: menuItems.items,
            userOnly: menuItems.userOnly,
        })
        this.updateCounts(menuItems.items)
    }

    componentDidUpdate = prevProps => {
        // Updates counts, if URL or selected OU has changed.
        if (
            prevProps.counts !== this.props.counts ||
            prevProps.selected !== this.props.selected
        )
            this.updateCounts(this.state.menuItems)
    }

    /**
     * Updates count number in menu.
     */
    updateCounts = menuItems => {
        const counts = this.props.counts
        if (!counts) return
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
