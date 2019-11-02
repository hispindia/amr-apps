import React, { useState, useEffect } from 'react'
import { bool, func, object, objectOf, string } from 'prop-types'
import { Label } from '../Label'
import { Row } from '../Row'
import { CheckboxInput } from './CheckBoxInput'

/**
 * Input consisting of a a group of checkboxes.
 */
export const CheckboxInputs = props => {
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
    }

    return (
        <>
            <Label required={props.required}>{props.label}</Label>
            <Row>
                {Object.keys(props.objects).map(id => (
                    <CheckboxInput
                        key={id}
                        id={id}
                        label={props.objects[id].label}
                        checked={values[id] === 'true'}
                        onChange={onChange}
                        disabled={props.objects[id].disabled}
                    />
                ))}
            </Row>
        </>
    )
}

CheckboxInputs.propTypes = {
    label: string.isRequired,
    onChange: func.isRequired,
    objects: object.isRequired,
    values: objectOf(string),
    required: bool,
}
