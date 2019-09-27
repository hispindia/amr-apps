import React from 'react'
import { MenuList, MenuItem, Divider } from '@dhis2/ui-core'
import { Icon, icons } from '@hisp-amr/icons'
import { NEW, DISPATCHED } from '../constants/paths'

const MenuIcon = ({ icon }) => <Icon icon={icon} />

export const SidebarMenu = () => (
    <MenuList>
        <MenuItem
            label="New sample batches"
            href={`#${NEW}`}
            icon={<MenuIcon icon={icons.help_outline} />}
        />
        <MenuItem
            label="Dispatched sample batches"
            href={`#${DISPATCHED}`}
            icon={<MenuIcon icon={icons.check_circle_outline} />}
        />
        <Divider />
    </MenuList>
)
