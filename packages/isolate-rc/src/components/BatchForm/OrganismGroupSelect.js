import React from 'react'
import { bool, func, string } from 'prop-types'
import { SelectInput } from '@hisp-amr/app'
import { useGetPrograms } from '../../utils'

export const OrganismGroupSelect = ({ value, onChange, disabled }) => {
    const organismGroups = useGetPrograms()

    return (
        <SelectInput
            name="organism-group"
            label="Organism group"
            required
            disabled={disabled}
            value={value}
            objects={organismGroups}
            onChange={onChange}
            initialFocus
        />
    )
}

OrganismGroupSelect.propTypes = {
    value: string.isRequired,
    onChange: func.isRequired,
    disabled: bool,
}
