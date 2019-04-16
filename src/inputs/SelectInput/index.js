import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SelectField from '@dhis2/ui/core/SelectField'
import styled from 'styled-components'
import { Input } from 'helpers'

/**
 * Max height for dropdown.
 */
const CustomSelectField = styled.div`
    .ui_selectfield_menu_1a3v8 > .ui_card_base_l2vmf {
        overflow: auto;
        max-height: 300px;
    }
    .ui_selectfield_menu_1a3v8 {
        width: inherit !important;
    }
`

/**
 * Single select field.
 */
export const SelectInput = props => {
    const [value, setValue] = useState('')

    useEffect(() => {
        if (props.value != value) setValue(props.value)
    }, [props.value])

    const onChange = (n, v) => {
        setValue(v)
        props.onChange(props.name, v)
    }

    return (
        <Input>
            <CustomSelectField>
                <SelectField
                    name={props.name}
                    kind="outlined"
                    list={props.objects}
                    value={value}
                    label={props.label}
                    help={props.disabled ? props.helperText : null}
                    onChange={onChange}
                    disabled={props.disabled}
                    size="dense"
                    required={props.required}
                />
            </CustomSelectField>
        </Input>
    )
}

SelectInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    helperText: PropTypes.string,
    value: PropTypes.string,
    objects: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        })
    ).isRequired,
}
