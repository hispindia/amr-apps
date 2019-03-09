import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import { getCounts } from '../../../api'

/**
 * Sidebar menu.
 */
class SidebarMenu extends Component {
    state = {
        menuItems: null,
        userOnly: false,
    }

    componentDidMount = () => {
        const { menuItems } = this.props
        const statuses = menuItems.items.map(item => item.status)
        const userOnly = menuItems.userOnly
        this.setState({
            menuItems: menuItems.items,
            userOnly: userOnly,
            statuses: statuses,
        })
        this.updateCounts(menuItems.items, userOnly)
    }

    componentDidUpdate = prevProps => {
        // Updates counts, if URL or selected OU has changed.
        if (prevProps.selected !== this.props.selected)
            this.updateCounts(this.state.menuItems, this.state.userOnly)
    }

    /**
     * Updates count number in menu.
     */
    updateCounts = async (menuItems, userOnly) => {
        menuItems = await getCounts(menuItems, this.props.selected.id, userOnly)
        menuItems.forEach(
            item =>
                (item.label = item.label.replace(/\(\d*\)/, `(${item.count})`))
        )
        this.setState({ menuItems: menuItems })
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
