import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { func } from 'prop-types'
import styled from 'styled-components'
import { Modal } from '@dhis2/ui-core'
import { TextInput, DateInput, TransferList } from '@hisp-amr/inputs'
import { OrganismGroupSelect } from './OrganismGroupSelect'
import { BatchButtons } from './BatchButtons'
import { Loader } from '../Loader'
import { useEvents } from './useEvents'
import { useAddBatch } from './useAddBatch'

const Form = styled.form`
    padding: 2px 0;
`

const Row = styled.div`
    display: flex;
    justify-content: space-between;
`

const Col = styled.div`
    display: flex;
    flex-direction: column;
    div:first-child {
        margin-bottom: 3px;
    }
`

export const BatchForm = ({ close }) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const [program, setProgram] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [selectedEvents, setSelectedEvents] = useState([])
    const [add, setAdd] = useState(false)

    const { events, eventData, loading, error } = useEvents(program, from, to)

    const addBatchResult = useAddBatch({
        add,
        program,
        from,
        to,
        selectedEvents,
        eventData,
    })

    useEffect(() => {
        if (addBatchResult.success) close(true)
    }, [addBatchResult.success])

    const disabled =
        [program, from, to, events].includes('') || !selectedEvents.length

    const onOrganismChange = (name, value) => setProgram(value)

    const onFromChange = (name, value) => setFrom(value)

    const onToChange = (name, value) => setTo(value)

    const onEventsChange = newSelected =>
        setSelectedEvents(newSelected.map(s => s.value))

    const onCancel = () => close(false)

    const onSubmit = () => setAdd(true)

    return (
        <Modal open medium>
            <Modal.Title>Add new batch</Modal.Title>
            <Modal.Content>
                <Form autoComplete="off">
                    <Row>
                        <Col>
                            <TextInput
                                name="location"
                                label="Location"
                                value={orgUnit.displayName}
                                onChange={() => {}}
                                disabled
                            />
                            <OrganismGroupSelect
                                value={program}
                                onChange={onOrganismChange}
                                disabled={loading}
                            />
                        </Col>
                        <Col>
                            <DateInput
                                name="from"
                                label="From"
                                value={from}
                                onChange={onFromChange}
                                disabled={loading}
                                maxDate={to}
                                required
                            />
                            <DateInput
                                name="to"
                                label="To"
                                value={to}
                                onChange={onToChange}
                                disabled={loading}
                                minDate={from}
                                required
                            />
                        </Col>
                    </Row>
                    {loading && <Loader />}
                    {events && (
                        <TransferList
                            options={events}
                            onChange={onEventsChange}
                        />
                    )}
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <BatchButtons
                    disabled={disabled}
                    loading={addBatchResult.loading}
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                />
            </Modal.Actions>
        </Modal>
    )
}

BatchForm.propTypes = {
    close: func.isRequired,
}
