import React from 'react'
import { bool, func, string } from 'prop-types'
import { Checkbox } from '@dhis2/ui-core'
import { OptionSpacer } from '../OptionSpacer'

export const CheckboxInput = ({ id, label, checked, disabled, onChange }) => {
    const onKeyDown = ({ key, target }) => {
        if (key === 'Enter')
            onChange({
                target: { name: target.name, checked: !checked },
            })
    }

    return (
        <OptionSpacer onKeyDown={onKeyDown}>
            <Checkbox
                name={id}
                label={label}
                checked={checked}
                onChange={onChange}
                disabled={disabled}
                value={id}
            />
        </OptionSpacer>
    )
}

CheckboxInput.propTypes = {
    id: string.isRequired,
    label: string.isRequired,
    checked: bool,
    onChange: func.isRequired,
    disabled: bool,
}
