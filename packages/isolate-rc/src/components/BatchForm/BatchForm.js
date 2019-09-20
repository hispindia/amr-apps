import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { func } from 'prop-types'
import styled from 'styled-components'
import { Modal } from '@dhis2/ui-core'
import { TextInput, DateInput } from '@hisp-amr/app'
import { OrganismGroupSelect } from './OrganismGroupSelect'
import { BatchButtons } from './BatchButtons'
import { EventLoader } from './EventsLoader'
import { TransferList } from '../TransferList'
import { useEvents } from './useEvents'

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

export const BatchForm = ({ onCancel }) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const [program, setProgram] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [selectedEvents, setSelectedEvents] = useState([])

    const { events, loading, error } = useEvents(program, from, to)

    const disabled =
        [program, from, to, events].includes('') || !selectedEvents.length

    const onOrganismChange = (name, value) => setProgram(value)

    const onFromChange = (name, value) => setFrom(value)

    const onToChange = (name, value) => setTo(value)

    const onSubmit = async () => {}

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
                    {loading && <EventLoader />}
                    {events && (
                        <TransferList
                            options={events}
                            onChange={setSelectedEvents}
                        />
                    )}
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <BatchButtons
                    disabled={disabled}
                    loading={false}
                    onCancel={onCancel}
                    onSubmit={onSubmit}
                />
            </Modal.Actions>
        </Modal>
    )
}

BatchForm.propTypes = {
    onCancel: func.isRequired,
}
