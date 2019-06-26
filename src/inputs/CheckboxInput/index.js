import React, { useState, useEffect } from 'react'
import { bool, func, object, objectOf, string } from 'prop-types'
import { Checkbox } from '@dhis2/ui-core'
import { Label, OptionSpacer, Row } from 'styles'

/**
 * Input consisting of a a group of checkboxes.
 */
export const CheckboxInput = props => {
    const [values, setValues] = useState({})

    useEffect(() => {
        if (props.values !== values) setValues(props.values)
    }, [props.values])

    /**
     * Called on checkbox click.
     */
    const onChange = ({ target }) => {
        const name = target.name
        let checked = target.checked
        const newValues = { ...values }
        checked = checked ? 'true' : ''
        newValues[name] = checked
        setValues(newValues)
        props.onChange(name, checked)
        console.log(target)
    }

    const onKeyDown = ({ key, target }) => {
        if (key === 'Enter')
            onChange({
                target: { name: target.name, checked: !values[target.name] },
            })
    }

    return (
        <>
            <Label required={props.required}>{props.label}</Label>
            <Row wrapped>
                {Object.keys(props.objects).map(id => (
                    <OptionSpacer key={id} onKeyDown={onKeyDown}>
                        <Checkbox
                            name={id}
                            label={props.objects[id].label}
                            checked={values[id] === 'true'}
                            onChange={onChange}
                            disabled={props.objects[id].disabled}
                            value={id}
                        />
                    </OptionSpacer>
                ))}
            </Row>
        </>
    )
}

CheckboxInput.propTypes = {
    label: string.isRequired,
    onChange: func.isRequired,
    objects: object.isRequired,
    values: objectOf(string),
    required: bool,
}
