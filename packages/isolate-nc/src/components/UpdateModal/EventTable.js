import React from 'react'
import { useSelector } from 'react-redux'
import { arrayOf, string, shape, func, bool } from 'prop-types'
import {
    Table,
    TableHead,
    TableRowHead,
    TableCellHead,
    TableBody,
    TableRow,
    TableCell,
    RadioGroup,
} from '@dhis2/ui-core'
import { DateInput } from '@hisp-amr/inputs'
import {
    AMR_ID_ELEMENT,
    ISOLATE_STATUS_ELEMENT,
    ISOLATE_CONDITION_ELEMENT,
    QUALITY_CHECK_ELEMENT,
    MOLECULAR_TEST_ELEMENT,
} from '../../constants/dataElements'
import {
    ISOLATE_CONDITION_SET,
    ISOLATE_STATUS_SET,
} from '../../constants/optionSets'

const PATH = '../Isolate-Transfer/index.html#/event/'

const dataElementIds = [
    AMR_ID_ELEMENT,
    ISOLATE_STATUS_ELEMENT,
    ISOLATE_CONDITION_ELEMENT,
    QUALITY_CHECK_ELEMENT,
    MOLECULAR_TEST_ELEMENT,
]

const getValues = dataValues =>
    dataElementIds.map(id => {
        const dataValue = dataValues.find(ev => ev.dataElement === id)
        return dataValue ? dataValue.value : ''
    })

const getLabel = (dataElements, id) =>
    dataElements[id].formName
        ? dataElements[id].formName
        : dataElements[id].displayName

const getOptions = (optionSets, id) =>
    optionSets[id].options.map(({ code, name }) => ({
        value: code,
        label: name,
    }))

const AmrId = ({ eventId, amrId, disabled }) => {
    if (disabled) return amrId

    return (
        <a href={`${PATH}${eventId}`} target="_blank">
            {amrId}
        </a>
    )
}

AmrId.propTypes = {
    eventId: string.isRequired,
    amrId: string.isRequired,
    disabled: bool,
}

export const EventTable = ({ data, onChange }) => {
    const dataElements = useSelector(state => state.metadata.dataElements)
    const optionSets = useSelector(state => state.metadata.optionSets)

    const headers = [
        { name: getLabel(dataElements, AMR_ID_ELEMENT) },
        { name: getLabel(dataElements, ISOLATE_STATUS_ELEMENT) },
        { name: getLabel(dataElements, ISOLATE_CONDITION_ELEMENT) },
        { name: getLabel(dataElements, QUALITY_CHECK_ELEMENT) },
        { name: getLabel(dataElements, MOLECULAR_TEST_ELEMENT) },
    ]

    const statusOptions = getOptions(optionSets, ISOLATE_STATUS_SET)
    const conditionOptions = getOptions(optionSets, ISOLATE_CONDITION_SET)

    return (
        <Table>
            <TableHead>
                <TableRowHead>
                    {headers.map(({ name }) => (
                        <TableCellHead key={name}>{name}</TableCellHead>
                    ))}
                </TableRowHead>
            </TableHead>
            <TableBody>
                {data.map(({ event, dataValues }) => {
                    const values = getValues(dataValues)

                    return (
                        <TableRow key={event}>
                            <TableCell dense>
                                <AmrId
                                    eventId={event}
                                    amrId={values[0]}
                                    disabled={values.includes('')}
                                />
                            </TableCell>
                            <TableCell>
                                <RadioGroup
                                    name={ISOLATE_STATUS_ELEMENT}
                                    value={values[1]}
                                    onChange={({ target }) =>
                                        onChange(
                                            event,
                                            target.name,
                                            target.value
                                        )
                                    }
                                    options={statusOptions}
                                />
                            </TableCell>
                            <TableCell>
                                <RadioGroup
                                    name={ISOLATE_CONDITION_ELEMENT}
                                    value={values[2]}
                                    onChange={({ target }) =>
                                        onChange(
                                            event,
                                            target.name,
                                            target.value
                                        )
                                    }
                                    options={conditionOptions}
                                />
                            </TableCell>
                            <TableCell dense>
                                <DateInput
                                    name={QUALITY_CHECK_ELEMENT}
                                    label=""
                                    value={values[3]}
                                    onChange={(name, value) =>
                                        onChange(event, name, value)
                                    }
                                    small
                                />
                            </TableCell>
                            <TableCell dense>
                                <DateInput
                                    name={MOLECULAR_TEST_ELEMENT}
                                    label=""
                                    value={values[4]}
                                    onChange={(name, value) =>
                                        onChange(event, name, value)
                                    }
                                    small
                                />
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}

EventTable.propTypes = {
    data: arrayOf(
        shape({
            event: string.isRequired,
            dataValues: arrayOf(
                shape({
                    dataElement: string.isRequired,
                    value: string.isRequired,
                })
            ).isRequired,
        })
    ).isRequired,
    onChange: func.isRequired,
}
