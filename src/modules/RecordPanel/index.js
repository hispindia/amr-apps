import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Grid } from '@material-ui/core'
import { Heading, Padding } from 'styles'
import { SelectInput, RadioInput, DateInput } from 'inputs'
import { StyledCard, CustomButtonRow } from './style'
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
        const common = {
            disabled: valid,
            required: true,
        }
        switch (id) {
            case 'program':
                return getInput({
                    ...common,
                    id: 'program',
                    name: 'program',
                    label: 'Organism group',
                    objects: programs,
                    onChange: onProgramChange,
                    value: program,
                })
            case 'programStage':
                return getInput({
                    ...common,
                    id: 'programStage',
                    name: 'programStage',
                    label: 'Type',
                    objects: stageLists[program],
                    onChange: onChange,
                    value: programStage,
                })
            case 'organism':
                return getInput({
                    ...common,
                    id: 'organism',
                    name: 'organism',
                    label: 'Organism',
                    objects: organisms,
                    onChange: onChange,
                    value: organism,
                })
            case 'sampleDate':
                return getInput({
                    ...common,
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
                <DateInput {...dataElement} />
            ) : dataElement.objects.length < 4 ? (
                <RadioInput {...dataElement} />
            ) : (
                <SelectInput {...dataElement} />
            )}
        </Padding>
    )

    return (
        <StyledCard>
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
                            small: true,
                        },
                    ]}
                />
            )}
            <Heading>Panel</Heading>
            <Grid container spacing={0}>
                <Grid item xs>
                    {getDataElement('program')}
                    {program &&
                        stageLists[program].length > 1 &&
                        getDataElement('programStage')}
                </Grid>
                <Grid item xs>
                    {program && getDataElement('organism')}
                    {getDataElement('sampleDate')}
                </Grid>
            </Grid>
        </StyledCard>
    )
}
