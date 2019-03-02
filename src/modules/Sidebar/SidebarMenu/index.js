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
        selected: null,
    }

    componentDidMount = async () => {
        this.setState({ menuItems: this.props.menuItems })
        await this.updateCounts(this.props.menuItems)
    }

    componentDidUpdate = async () => {
        // Updates counts, if URL has changed.
        if (
            this.props.selected !== this.state.selected ||
            this.props.history.location.pathname !== this.state.pathname
        )
            await this.updateCounts([...this.state.menuItems])
    }

    /**
     * Updates count number in menu.
     */
    updateCounts = async menuItems => {
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
