import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import { getCounts } from '../../../api'

/**
 * Sidebar menu.
 */
const SidebarMenu = props => {
    const [menuItems, setMenuItems] = useState(null)
    const [force, setForce] = useState(false)

    useEffect(() => {
        updateCounts(props.items)
    }, [props.selected, props.location])

    /**
     * Updates count number in menu.
     */
    const updateCounts = async items => {
        items = await getCounts(items, props.selected.id, props.userOnly)
        items.forEach(
            item =>
                (item.label = item.label.replace(/\(\d*\)/, `(${item.count})`))
        )
        setMenuItems(items)
        setForce(!force)
    }

    return (
        <div id='sidebar_menu'>
            <Menu
                size='dense'
                list={menuItems ? menuItems : props.items}
                onClick={path => props.history.push(path)}
            />
        </div>
    )
}

export default withRouter(SidebarMenu)

