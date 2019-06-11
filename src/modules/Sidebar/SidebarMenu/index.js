import React from 'react'
import { useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Menu } from '@dhis2/ui-core'
import { Icon } from 'components'
import { StyledMenuItem, Title, Count } from './style'
import { useCounts } from './useCounts'

/**
 * Sidebar menu.
 */
const SidebarMenu = ({ location, history }) => {
    const { categories } = useSelector(state => state.appConfig)
    const counts = useCounts(location)

    return (
        <nav>
            <Menu>
                {categories.map((c, i) => (
                    <StyledMenuItem
                        dense
                        key={c.value}
                        value={c.value}
                        onClick={history.push}
                        label={
                            <>
                                <Icon icon={c.icon} color={c.color} />
                                <Title>{c.label}</Title>
                                <Count>{counts ? counts[i] : 0}</Count>
                            </>
                        }
                    />
                ))}
            </Menu>
        </nav>
    )
}

export default withRouter(SidebarMenu)
