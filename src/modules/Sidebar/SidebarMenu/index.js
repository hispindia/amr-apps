import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu } from '@dhis2/ui/core'
import styled from 'styled-components'
import { Margin } from 'styles'
import { getCounts } from 'api'

/**
 * Colored icons and corrected height.
 */
const CustomMenu = styled.div`
    .ui_menu_item_4jpdr:first-child :first-child {
        color: var(--blue600);
    }
    .ui_menu_item_4jpdr:nth-child(2) :first-child {
        color: var(--yellow600);
    }
    .ui_menu_item_4jpdr:nth-child(3) :first-child {
        color: var(--red600);
    }
    .ui_menu_item_4jpdr:nth-child(4) :first-child {
        color: var(--green600);
    }
    .ui_card_base_l2vmf {
        height: auto !important;
    }
`

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
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    userOnly: PropTypes.bool,
}

export default withRouter(SidebarMenu)
