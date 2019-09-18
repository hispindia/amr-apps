import React from 'react'
import { MenuList, MenuItem, Divider } from '@dhis2/ui-core'
import { Icon } from '@hisp-amr/app'
import { NEW, DISPATCHED } from '../constants/paths'

const MenuIcon = ({ icon }) => <Icon color="black" icon={icon} />

export const SidebarMenu = () => (
    <MenuList>
        <MenuItem
            label="New sample batches"
            href={`#${NEW}`}
            icon={<MenuIcon icon="help_outline" />}
        />
        <MenuItem
            label="Dispatched sample batches"
            href={`#${DISPATCHED}`}
            icon={<MenuIcon icon="check_circle_outline" />}
        />
        <Divider />
    </MenuList>
)
