import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import { MenuList, MenuItem, Divider, colors } from '@dhis2/ui-core'
import { Icon, icons, colors as iconColors } from '@hisp-amr/icons'
import { useCounts } from './useCounts'

const StyledMenuItem = styled(MenuItem)`
    .link {
        padding-right: 12px;
    }
    .label {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
`

const Count = styled.span`
    padding: 4px;
    background: ${colors.grey300};
    border-radius: 4px;
    margin-left: 8px;
`

const MenuIcon = ({ icon, color }) => <Icon icon={icon} color={color} />

/**
 * Sidebar menu.
 */
export const SidebarMenu = ({ location }) => {
    const categories = useSelector(state => state.appConfig.categories)
    const [counts, error] = useCounts(location)

    return (
        <MenuList>
            {categories.map((c, i) => (
                <StyledMenuItem
                    key={c.status}
                    href={`#/events/${c.status}`}
                    icon={
                        <MenuIcon
                            icon={icons[c.icon]}
                            color={iconColors[c.color]}
                        />
                    }
                    label={
                        <>
                            <span>{c.label}</span>
                            <Count>
                                {error ? '?' : counts ? counts[i] : 0}
                            </Count>
                        </>
                    }
                />
            ))}
            <Divider />
        </MenuList>
    )
}
