import React, { useContext, useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui-core'
import { getCounts } from 'api'
import { Icon } from 'components'
import { ConfigContext, MetadataContext } from 'contexts'
import { StyledMenuItem, Title, Count } from './style'

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
        setMenuItems(items)
        setForce(!force)
    }

    return (
        <Menu>
            {(menuItems ? menuItems : categories).map(m => (
                <StyledMenuItem
                    dense
                    key={m.value}
                    value={m.value}
                    onClick={history.push}
                    label={
                        <>
                            <Icon icon={m.icon} color={m.color} />
                            <Title>{m.label}</Title>
                            <Count>{m.count}</Count>
                        </>
                    }
                />
            ))}
        </Menu>
    )
}

export default withRouter(SidebarMenu)
