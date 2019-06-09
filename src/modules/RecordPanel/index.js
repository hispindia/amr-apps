import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Card } from '@dhis2/ui-core'
import { Grid } from '@material-ui/core'
import { Heading, Margin, MarginBottom, Padding } from 'styles'
import { SelectInput, RadioInput, DateInput } from 'inputs'
import { CustomButtonRow } from './style'
import { setProgram, setPanelValue, resetPanel } from '../../actions'

/**
 * Contains event panel.
 */
export const RecordPanel = () => {
    const dispatch = useDispatch()
    const { stageLists } = useSelector(state => state.metadata)
    const {
        program,
        programStage,
        organism,
        sampleDate,
        valid,
        programs,
        organisms,
    } = useSelector(state => state.data.panel)

    /**
     * Called when a new program is selected.
     */
    const onProgramChange = async (name, value) => dispatch(setProgram(value))

    /**
     * Called when something other than program is changed
     */
    const onChange = (name, value) => dispatch(setPanelValue(name, value))

    const onReset = () => dispatch(resetPanel())

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
                    objects: programs,
                    onChange: onProgramChange,
                    value: program,
                })
            case 'programStageId':
                return getInput({
                    id: 'programStageId',
                    name: 'programStageId',
                    label: 'Type',
                    objects: stageLists[program],
                    onChange: onChange,
                    value: programStage,
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
                <DateInput {...dataElement} disabled={valid} required />
            ) : dataElement.objects.length < 4 ? (
                <RadioInput {...dataElement} disabled={valid} required />
            ) : (
                <SelectInput {...dataElement} disabled={valid} required />
            )}
        </Padding>
    )

    return (
        <MarginBottom>
            <Card>
                <Margin>
                    {true && (
                        <CustomButtonRow
                            unspaced
                            buttons={[
                                {
                                    label: 'Reset',
                                    onClick: onReset,
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
                            {program &&
                                stageLists[program].length > 1 &&
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
