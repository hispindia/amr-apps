import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { arrayOf, bool, object } from 'prop-types'
import { Menu } from '@dhis2/ui/core'
import { getCounts } from 'api'
import { CustomMenu } from './style'

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
        items = await getCounts(items, props.selected, props.userOnly)
        items.forEach(
            item =>
                (item.label = item.label.replace(/\(\d*\)/, `(${item.count})`))
        )
        setMenuItems(items)
        setForce(!force)
    }

    return (
        <CustomMenu>
            <Menu
                size="dense"
                list={menuItems ? menuItems : props.items}
                onClick={path => props.history.push(path)}
            />
        </CustomMenu>
    )
}

SidebarMenu.propTypes = {
    items: arrayOf(object).isRequired,
    userOnly: bool,
}

export default withRouter(SidebarMenu)
