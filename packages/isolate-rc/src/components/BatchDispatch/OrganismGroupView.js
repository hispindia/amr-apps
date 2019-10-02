import React from 'react'
import { string, shape } from 'prop-types'
import { SelectInput } from '@hisp-amr/inputs'

export const OrganismGroupView = ({ program }) => {
    const value = { label: program.displayName, value: program.id }

    return (
        <SelectInput
            name="organism-group"
            label="Organism group"
            required
            disabled
            value={value.value}
            objects={[value]}
            onChange={() => {}}
        />
    )
}

OrganismGroupView.propTypes = {
    program: shape({
        id: string.isRequired,
        displayName: string.isRequired,
    }).isRequired,
}
