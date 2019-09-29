import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { func, string } from 'prop-types'
import styled from 'styled-components'
import { Modal } from '@dhis2/ui-core'
import { TextInput, DateInput } from '@hisp-amr/inputs'
import { OrganismGroupView } from './OrganismGroupView'
import { Buttons } from './Buttons'
import { Loader } from '../Loader'
import { useGetBatch } from '../../utils'
import { useDispatchBatch } from './useDispatchBatch'
import { EventTransfer } from './EventTransfer'

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
    & > * {
        margin-bottom: 10px;
    }
`

export const BatchDispatch = ({ close, batchNo }) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const { data, loading, error } = useGetBatch(batchNo)
    const [selectedEvents, setSelectedEvents] = useState([])
    const [dispatched, setDispatched] = useState('')
    const [execute, setExecute] = useState(false)

    const dispatchBatchResult = useDispatchBatch({
        execute,
        data,
        selectedEvents,
        dispatched,
    })

    const disabled = dispatched === '' || !selectedEvents.length

    useEffect(() => {
        if (dispatchBatchResult.success) close(true)
    }, [dispatchBatchResult.success])

    const onEventsChange = newSelected =>
        setSelectedEvents(newSelected.map(s => s.value))

    const onDispatchedChange = (name, value) => setDispatched(value)

    const onCancel = () => close(false)

    const onDispatch = () => setExecute(true)

    return (
        <Modal open medium>
            <Modal.Title>{batchNo}</Modal.Title>
            <Modal.Content>
                {loading ? (
                    <Loader />
                ) : error ? null : (
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
                                <OrganismGroupView program={data.program} />
                            </Col>
                            <Col>
                                <DateInput
                                    name="from"
                                    label="From"
                                    value={data.startDate}
                                    onChange={() => {}}
                                    disabled
                                    required
                                />
                                <DateInput
                                    name="to"
                                    label="To"
                                    value={data.endDate}
                                    onChange={() => {}}
                                    disabled
                                    required
                                />
                            </Col>
                        </Row>
                        <Col>
                            <EventTransfer
                                data={data.rows}
                                onChange={onEventsChange}
                            />
                        </Col>
                        <Row>
                            <Col>
                                <DateInput
                                    name="dispatched"
                                    label="Dispatched"
                                    value={data.dispatchDate}
                                    onChange={onDispatchedChange}
                                    required
                                />
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal.Content>
            <Modal.Actions>
                <Buttons
                    disabled={disabled}
                    loading={dispatchBatchResult.loading}
                    onCancel={onCancel}
                    onSubmit={onDispatch}
                />
            </Modal.Actions>
        </Modal>
    )
}

BatchDispatch.propTypes = {
    close: func.isRequired,
    batchNo: string.isRequired,
}
