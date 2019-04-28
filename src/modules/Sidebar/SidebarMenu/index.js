import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui/core'
import { getCounts } from 'api'
import { ConfigContext, MetadataContext } from 'contexts'
import { CustomMenu } from './style'

/**
 * Sidebar menu.
 */
const SidebarMenu = ({ selected, location, history }) => {
    const { categories, isApproval } = useContext(ConfigContext)
    const { user } = useContext(MetadataContext)
    const [menuItems, setMenuItems] = useState(null)
    const [force, setForce] = useState(false)

    useEffect(() => {
        updateCounts(categories)
    }, [selected, location])

    /**
     * Updates count number in menu.
     */
    const updateCounts = async items => {
        items = await getCounts(items, selected, {
            username: !isApproval ? user.username : false,
            l2Member: user.l2Member,
        })
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
                list={menuItems ? menuItems : categories}
                onClick={path => history.push(path)}
            />
        </CustomMenu>
    )
}

export default withRouter(SidebarMenu)
