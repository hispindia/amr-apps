import React, { useContext, useEffect, useState } from 'react'
import { func } from 'prop-types'
import { Card } from '@dhis2/ui-core'
import { Grid } from '@material-ui/core'
import { Heading, Margin, MarginBottom, Padding } from 'styles'
import { SelectInput, RadioInput, DateInput } from 'inputs'
import { MetadataContext, RecordContext } from 'contexts'
import { CustomButtonRow } from './style'

/**
 * Contains event panal.
 */
export const RecordPanel = ({ passValues, onReset }) => {
    const { stageLists, programOrganisms, optionSets } = useContext(
        MetadataContext
    )
    const {
        programId,
        programStageId,
        organism,
        sampleDate,
        panelValid,
        panelPrograms,
    } = useContext(RecordContext)
    const [organisms, setOrganisms] = useState(null)

    useEffect(() => {
        if (programId) setOrganisms(getOrganisms(programId))
    }, [])

    const getOrganisms = newProgramId => {
        let newOrganisms = []
        optionSets[programOrganisms[newProgramId]].forEach(o => {
            if (!newOrganisms.find(org => org.value === o.value))
                newOrganisms.push(o)
        })
        return newOrganisms
    }

    /**
     * Called when a new program is selected.
     */
    const onProgramChange = async (name, value) => {
        setOrganisms(getOrganisms(value))
        onNewValues({
            organisms: getOrganisms(value),
            programId: value,
            programStageId:
                stageLists[value].length > 1 ? '' : stageLists[value][0].value,
            organism: '',
            sampleDate: sampleDate,
        })
    }

    /**
     * Called when a new program stage or organism is selected.
     */
    const onChange = (name, value) => {
        let values = {
            organisms,
            programId,
            programStageId,
            organism,
            sampleDate,
        }
        if (values[name] === value) return
        values[name] = value
        onNewValues(values)
    }

    const onNewValues = values =>
        passValues({ ...values, valid: !Object.values(values).includes('') })

    const resetValues = () => {
        setOrganisms(null)
        onReset()
    }

    /**
     * Gets the data elements to be rendered.
     * @returns {Object[]} Data elements.
     */
    const getDataElement = id => {
        switch (id) {
            case 'programId':
                return getInput({
                    id: 'programId',
                    name: 'programId',
                    label: 'Organism group',
                    objects: panelPrograms,
                    onChange: onProgramChange,
                    value: programId,
                })
            case 'programStageId':
                return getInput({
                    id: 'programStageId',
                    name: 'programStageId',
                    label: 'Type',
                    objects: stageLists[programId],
                    onChange: onChange,
                    value: programStageId,
                })
            case 'organism':
                return getInput({
                    id: 'organism',
                    name: 'organism',
                    label: 'Organism',
                    objects: organisms,
                    onChange: onChange,
                    value: organism,
                })
            case 'sampleDate':
                return getInput({
                    id: 'sampleDate',
                    name: 'sampleDate',
                    label: 'Date of Sample',
                    onChange: onChange,
                    value: sampleDate,
                })
            default:
                return
        }
    }

    /**
     * Gets the input component.
     * @param {Object} dataElement - Data element.
     * @returns {Component} Input component.
     */
    const getInput = dataElement => (
        <Padding key={dataElement.id}>
            {!dataElement.objects ? (
                <DateInput {...dataElement} disabled={panelValid} required />
            ) : dataElement.objects.length < 4 ? (
                <RadioInput {...dataElement} disabled={panelValid} required />
            ) : (
                <SelectInput {...dataElement} disabled={panelValid} required />
            )}
        </Padding>
    )

    return (
        <MarginBottom>
            <Card>
                <Margin>
                    {onReset !== null && (
                        <CustomButtonRow
                            unspaced
                            buttons={[
                                {
                                    label: 'Reset',
                                    onClick: resetValues,
                                    icon: 'clear',
                                    tooltip: 'Reset',
                                    kind: 'secondary',
                                    size: 'small',
                                },
                            ]}
                        />
                    )}
                    <Heading>Panel</Heading>
                    <Grid container spacing={0}>
                        <Grid item xs>
                            {getDataElement('programId')}
                            {programId &&
                                stageLists[programId].length > 1 &&
                                getDataElement('programStageId')}
                        </Grid>
                        <Grid item xs>
                            {organisms && getDataElement('organism')}
                            {getDataElement('sampleDate')}
                        </Grid>
                    </Grid>
                </Margin>
            </Card>
        </MarginBottom>
    )
}

RecordPanel.prototypes = {
    passValues: func.isRequired,
    onReset: func,
}
