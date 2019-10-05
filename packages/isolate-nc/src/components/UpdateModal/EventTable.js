import React from 'react'
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
} from '../../constants/ids'

const PATH = '../Isolate-Transfer/index.html#/event/'

const headers = [
    { name: 'AMR ID' },
    { name: 'Status' },
    { name: 'Condition' },
    { name: 'Quality check' },
    { name: 'Molecular test' },
]

const dataElements = [
    AMR_ID_ELEMENT,
    ISOLATE_STATUS_ELEMENT,
    ISOLATE_CONDITION_ELEMENT,
    QUALITY_CHECK_ELEMENT,
    MOLECULAR_TEST_ELEMENT,
]

const getValues = dataValues =>
    dataElements.map(id => {
        const dataValue = dataValues.find(ev => ev.dataElement === id)
        return dataValue ? dataValue.value : ''
    })

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

export const EventTable = ({ data, onChange }) => (
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
                                    onChange(event, target.name, target.value)
                                }
                                options={[
                                    {
                                        value: 'Alive',
                                        label: 'Alive',
                                    },
                                    {
                                        value: 'Dead',
                                        label: 'Dead',
                                    },
                                ]}
                            />
                        </TableCell>
                        <TableCell>
                            <RadioGroup
                                name={ISOLATE_CONDITION_ELEMENT}
                                value={values[2]}
                                onChange={({ target }) =>
                                    onChange(event, target.name, target.value)
                                }
                                options={[
                                    {
                                        value: 'Pure',
                                        label: 'Pure',
                                    },
                                    {
                                        value: 'Contaminated',
                                        label: 'Contaminated',
                                    },
                                ]}
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
