import React, { useEffect } from 'react'
import { Card } from '@dhis2/ui/core/Card'
import { Grid } from '@material-ui/core'
import {
    Heading,
    Margin,
    Padding,
    MarginSides,
    MarginBottom,
} from '../../helpers/helpers'
import { SelectInput, RadioInput } from '../../inputs'
import { hook } from './hook';

/**
 * Contains event panel information.
 */
export const RecordPanel = props => {
    const [state, dispatch, types] = hook(
        props.programId ? getOrganisms(props.programId) : null,
        props.programId ? props.programId : '',
        props.programStageId ? props.programStageId : '',
        props.organism ? props.organism : '',
    )

    const dataElements = getDataElements()
    const half = Math.ceil(dataElements.length / 2)

    useEffect(() => {
        dispatch({type: types.RESET_PANEL})
    }, [props.resetSwitch])

    const getOrganisms = programId => {
        let organisms = []
        props.optionSets[props.programOrganisms[programId]].forEach(o => {
            if (!organisms.find(org => org.value === o.value))
                organisms.push(o)
        })
        return organisms
    }

    /**
     * Called when a new program is selected.
     */
    const onProgramChange = (name, value) => {
        dispatch({type: types.SET_PANEL,
            organisms: getOrganisms(value),
            programId: value,
            programStageId:
                props.programStages[value].length > 1
                    ? ''
                    : props.programStages[value][0].value,
            organism: '',
        })
    }

    /**
     * Called when a new program stage or organism is selected.
     */
    const onChange = (name, value) => {
        const values =  dispatch({type: types.SET_PANEL,
            key: name,
            value, value
        })
        props.passValues({
            programId: values.programId,
            programStageId: values.programStageId,
            organism: values.organism,
            valid: !Object.values(values).includes('')
        })
    }

    /**
     * Gets the data elements to be rendered.
     * @returns {Object[]} Data elements.
     */
    const getDataElements = () => {
        let dataElements = [
            {
                id: 'programId',
                label: 'Organism group',
                objects: props.programs,
                onChange: onProgramChange,
            },
        ]
        if (state.programId && props.programStages[state.programId].length > 1)
            dataElements.push({
                id: 'programStageId',
                label: 'Type',
                objects: props.programStages[state.programId],
                onChange: onChange,
            })
        if (state.organisms)
            dataElements.push({
                id: 'organism',
                label: 'Organism',
                objects: state.organisms,
                onChange: onChange,
            })

        return dataElements
    }

    /**
     * Gets the input component.
     * @param {Object} dataElement - Data element.
     * @returns {Component} Input component.
     */
    const getInput = dataElement =>
        <Padding key={dataElement.id}>
            {dataElement.objects.length < 4 ? (
                <RadioInput
                    objects={dataElement.objects}
                    name={dataElement.id}
                    label={dataElement.label}
                    value={state[dataElement.id]}
                    onChange={dataElement.onChange}
                    disabled={props.disabled}
                    required
                />
            ) : (
                <SelectInput
                    objects={dataElement.objects}
                    name={dataElement.id}
                    label={dataElement.label}
                    value={state[dataElement.id]}
                    onChange={dataElement.onChange}
                    disabled={props.disabled}
                    required
                />
            )}
        </Padding>

    const PanelCard = props =>
        <MarginBottom>
            <MarginBottom>
                <Card>
                    <Margin>
                        <MarginSides>
                            <Heading>Panel</Heading>
                        </MarginSides>
                        {props.children}
                    </Margin>
                </Card>
            </MarginBottom>
        </MarginBottom>

    return (
        <PanelCard>
            <Grid container spacing={0}>
                <Grid item xs>
                    {dataElements.slice(0, half).map(dataElement =>
                        getInput(dataElement)
                    )}
                </Grid>
                <Grid item xs>
                    {dataElements.slice(half).map(dataElement =>
                        getInput(dataElement)
                    )}
                </Grid>
            </Grid>
        </PanelCard>
    )
}
