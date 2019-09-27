import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu } from '@dhis2/ui-core'
import { Icon, icons, colors } from '@hisp-amr/icons'
import { StyledMenuItem, Title, Count } from './style'
import { useCounts } from './useCounts'

/**
 * Sidebar menu.
 */
const SidebarMenu = ({ location }) => {
    const categories = useSelector(state => state.appConfig.categories)
    const [counts, error] = useCounts(location)

    return (
        <nav>
            <Menu>
                {categories.map((c, i) => (
                    <StyledMenuItem
                        dense
                        key={c.status}
                        href={`#/events/${c.status}`}
                        label={
                            <>
                                <Icon
                                    icon={icons[c.icon]}
                                    color={colors[c.color]}
                                />
                                <Title>{c.label}</Title>
                                <Count>
                                    {error ? '?' : counts ? counts[i] : 0}
                                </Count>
                            </>
                        }
                    />
                ))}
            </Menu>
        </nav>
    )
}

export default withRouter(SidebarMenu)
