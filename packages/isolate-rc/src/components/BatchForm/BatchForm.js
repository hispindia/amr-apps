import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { func } from 'prop-types'
import styled from 'styled-components'
import { Modal } from '@dhis2/ui-core'
import { DateInput } from '@hisp-amr/app'
import { OrganismGroupSelect } from './OrganismGroupSelect'
import { BatchButtons } from './BatchButtons'
import { TransferList } from '../TransferList'
import { getEvents } from '../../api'

const items = [
    {
        label: 'AMR1',
        value: '1',
    },
    {
        label: 'AMR2',
        value: '2',
    },
    {
        label: 'AMR3',
        value: '3',
    },
    {
        label: 'AMR4',
        value: '4',
    },
    {
        label: 'AMR5',
        value: '5',
    },
    {
        label: 'AMR6',
        value: '6',
    },
    {
        label: 'AMR7',
        value: '7',
    },
    {
        label: 'AMR8',
        value: '8',
    },
    {
        label: 'AMR9',
        value: '9',
    },
]

const Form = styled.form`
    padding: 2px 0;
`

const Padding = styled.div`
    padding: 8px 0;
`

export const BatchForm = ({ onCancel }) => {
    const orgUnit = useSelector(state => state.selectedOrgUnit.id)

    const [program, setProgram] = useState('')
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    const [loading, setLoading] = useState(false)

    const disabled = [program, from, to].includes('')

    const onOrganismChange = (name, value) => setProgram(value)

    const onFromChange = (name, value) => setFrom(value)

    const onToChange = (name, value) => setTo(value)

    const onSubmit = async () => {
        setLoading(true)
        try {
            const response = await getEvents({ program, orgUnit, from, to })
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <Modal open medium>
            <Modal.Title>Add new batch</Modal.Title>
            <Modal.Content>
                <Form>
                    <Padding>
                        <OrganismGroupSelect
                            value={program}
                            onChange={onOrganismChange}
                            disabled={loading}
                        />
                    </Padding>
                    <Padding>
                        <DateInput
                            name="from"
                            label="From"
                            value={from}
                            onChange={onFromChange}
                            disabled={loading}
                            maxDate={to}
                            required
                        />
                    </Padding>
                    <Padding>
                        <DateInput
                            name="to"
                            label="To"
                            value={to}
                            onChange={onToChange}
                            disabled={loading}
                            minDate={from}
                            required
                        />
                    </Padding>
                    <TransferList items={items} />
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <BatchButtons
                    disabled={disabled}
                    loading={loading}
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
