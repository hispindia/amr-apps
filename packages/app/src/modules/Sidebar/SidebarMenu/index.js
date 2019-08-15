import React from 'react'
import { withRouter } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu } from '@dhis2/ui-core'
import { Icon } from 'components'
import { StyledMenuItem, Title, Count } from './style'
import { useCounts } from './useCounts'

/**
 * Sidebar menu.
 */
const SidebarMenu = ({ location }) => {
    const { categories } = useSelector(state => state.appConfig)
    const [counts, error] = useCounts(location)

    return (
        <nav>
            <Menu>
                {categories.map((c, i) => (
                    <StyledMenuItem
                        dense
                        key={c.value}
                        href={c.value}
                        label={
                            <>
                                <Icon icon={c.icon} color={c.color} />
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
