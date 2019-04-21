import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import { getCounts } from 'api'
import { ConfigContext } from 'contexts'
import { CustomMenu } from './style'

/**
 * Sidebar menu.
 */
const SidebarMenu = ({ selected, location, history }) => {
    const [menuItems, setMenuItems] = useState(null)
    const [force, setForce] = useState(false)
    const { items, isApproval } = useContext(ConfigContext)

    useEffect(() => {
        updateCounts(items)
    }, [selected, location])

    /**
     * Updates count number in menu.
     */
    const updateCounts = async items => {
        items = await getCounts(items, selected, !isApproval)
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
                list={menuItems ? menuItems : items}
                onClick={path => history.push(path)}
            />
        </CustomMenu>
    )
}

export default withRouter(SidebarMenu)
