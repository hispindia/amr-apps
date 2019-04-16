import React, { useEffect } from 'react'
import { Card } from '@dhis2/ui/core'
import { Grid } from '@material-ui/core'
import { Heading, Margin, Padding, MarginBottom } from 'styles'
import { SelectInput, RadioInput } from 'inputs'
import { hook } from './hook'

/**
 * Contains event panel information.
 */
export const RecordPanel = props => {
    const [state, dispatch, types] = hook(props.resetSwitch)

    useEffect(() => {
        const dataElements = getDataElements()
        if (dataElements !== state.dataElements)
            dispatch({
                type: types.SET_DATAELEMENTS,
                dataElements: getDataElements(),
            })
        props.passValues({
            programId: state.programId,
            programStageId: state.programStageId,
            organism: state.organism,
            valid: !Object.values(state).includes(''),
        })
    }, [state.programId, state.programStageId, state.organism])

    useEffect(() => {
        if (
            props.programId !== state.programId ||
            props.programStageId !== state.programStageId ||
            props.organism !== state.organism
        )
            dispatch({
                type: types.SET_PANEL,
                organisms: props.programId
                    ? getOrganisms(props.programId)
                    : null,
                programId: props.programId ? props.programId : '',
                programStageId: props.programStageId
                    ? props.programStageId
                    : '',
                organism: props.organism ? props.organism : '',
                resetSwitch: props.resetSwitch,
                dataElements: getDataElements(),
            })
    }, [props.programId, props.programStageId, props.organism])

    useEffect(() => {
        if (props.resetSwitch !== state.resetSwitch)
            dispatch({ type: types.RESET_PANEL })
    }, [props.resetSwitch])

    const getOrganisms = programId => {
        let organisms = []
        props.optionSets[props.programOrganisms[programId]].forEach(o => {
            if (!organisms.find(org => org.value === o.value)) organisms.push(o)
        })
        return organisms
    }

    /**
     * Called when a new program is selected.
     */
    const onProgramChange = (name, value) => {
        dispatch({
            type: types.SET_PANEL,
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
        dispatch({
            type: types.SET_VALUE,
            key: name,
            value,
            value,
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
                value: state.programId,
            },
        ]
        if (state.programId && props.programStages[state.programId].length > 1)
            dataElements.push({
                id: 'programStageId',
                label: 'Type',
                objects: props.programStages[state.programId],
                onChange: onChange,
                value: state.programStageId,
            })
        if (state.organisms)
            dataElements.push({
                id: 'organism',
                label: 'Organism',
                objects: state.organisms,
                onChange: onChange,
                value: state.organism,
            })

        return dataElements
    }

    const DataElements = props => {
        const { dataElements, half, disabled } = props
        return (
            <Grid container spacing={0}>
                <Grid item xs>
                    {dataElements.slice(0, half).map(dataElement => (
                        <DataElement
                            key={dataElement.id}
                            {...dataElement}
                            disabled={disabled}
                        />
                    ))}
                </Grid>
                <Grid item xs>
                    {dataElements.slice(half).map(dataElement => (
                        <DataElement
                            key={dataElement.id}
                            {...dataElement}
                            disabled={disabled}
                        />
                    ))}
                </Grid>
            </Grid>
        )
    }

    /**
     * Gets the input component.
     * @param {Object} dataElement - Data element.
     * @returns {Component} Input component.
     */
    const DataElement = props => (
        <Padding key={props.id}>
            {props.objects.length < 4 ? (
                <RadioInput
                    objects={props.objects}
                    name={props.id}
                    label={props.label}
                    value={props.value}
                    onChange={props.onChange}
                    disabled={props.disabled}
                    required
                />
            ) : (
                <SelectInput
                    objects={props.objects}
                    name={props.id}
                    label={props.label}
                    value={props.value}
                    onChange={props.onChange}
                    disabled={props.disabled}
                    required
                />
            )}
        </Padding>
    )

    const PanelCard = props => (
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
    )

    return (
        <PanelCard>
            <DataElements
                dataElements={state.dataElements}
                half={Math.ceil(state.dataElements.length / 2)}
                disabled={props.disabled}
            />
        </PanelCard>
    )
}
