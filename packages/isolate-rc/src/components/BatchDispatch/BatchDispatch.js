import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { func } from 'prop-types'
import styled from 'styled-components'
import { Modal } from '@dhis2/ui-core'
import { TextInput, DateInput, TransferList } from '@hisp-amr/inputs'
import { OrganismGroupView } from './OrganismGroupSelect'
import { BatchButtons } from './BatchButtons'
import { Loader } from '../Loader'

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

export const BatchForm = ({ close, batchNo }) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit)

    const { data, loading, error } = useGetBatch(batchNo)
    const [selectedEvents, setSelectedEvents] = useState([])

    const onEventsChange = newSelected =>
        setSelectedEvents(newSelected.map(s => s.value))

    const onSubmit = () => setAdd(true)

    return (
        <Modal open medium>
            <Modal.Title>batchNo</Modal.Title>
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
                                <OrganismGroupView program={program} />
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
                        {events && (
                            <TransferList
                                options={events}
                                onChange={onEventsChange}
                            />
                        )}
                    </Form>
                )}
            </Modal.Content>
            <Modal.Actions>
                <BatchButtons
                    disabled={disabled}
                    loading={addBatchResult.loading}
                    onCancel={close}
                    onSubmit={onSubmit}
                />
            </Modal.Actions>
        </Modal>
    )
}

BatchForm.propTypes = {
    close: func.isRequired,
}
