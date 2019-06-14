import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { bool } from 'prop-types'
import { Grid } from '@material-ui/core'
import { CardSection } from 'components'
import { ProgressSection } from '../ProgressSection'
import { EntityButtons } from './EntityButtons'
import { EntityModal } from './EntityModal'
import { EntityInput } from './EntityInput'

/**
 * Entity information section.
 */
export const PersonForm = ({ showEdit }) => {
    const { person } = useSelector(state => state.metadata)
    const { id, attributes, editing } = useSelector(state => state.data.entity)

    const [half] = useState(
        Math.floor(person.trackedEntityTypeAttributes.length / 2)
    )

    if (!attributes) return <ProgressSection />

    return (
        <CardSection heading="Person">
            <EntityModal />
            {id && !editing && showEdit && <EntityButtons />}
            <Grid container spacing={0}>
                <Grid item xs>
                    {attributes.slice(0, half).map(a => (
                        <EntityInput attribute={a} />
                    ))}
                </Grid>
                <Grid item xs>
                    {attributes.slice(half).map(a => (
                        <EntityInput attribute={a} />
                    ))}
                </Grid>
            </Grid>
        </CardSection>
    )
}

PersonForm.prototypes = { showEdit: bool }
