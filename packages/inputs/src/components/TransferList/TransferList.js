import React, { useState } from 'react'
import { arrayOf, shape, string, func } from 'prop-types'
import styled from 'styled-components'
import { MultiSelect } from './MultiSelect'
import { TransferButtons } from './TransferButtons'

const Section = styled.section`
    display: flex;
    padding-top: 14px;
`

const getSelected = selected =>
    Array.from(selected, ({ label, value }) => ({
        label,
        value,
    }))

export const TransferList = ({ options, onChange }) => {
    const [left, setLeft] = useState(options)
    const [right, setRight] = useState([])
    const [selectedLeft, setSelectedLeft] = useState([])
    const [selectedRight, setSelectedRight] = useState([])

    const onLeft = () => {
        const newRight = [
            ...right.filter(
                o => !selectedRight.map(s => s.value).includes(o.value)
            ),
        ]
        setRight(newRight)
        setLeft([...left, ...selectedRight])
        setSelectedRight([])
        onChange(newRight)
    }

    const onRight = () => {
        const newRight = [...right, ...selectedLeft]
        setLeft([
            ...left.filter(
                o => !selectedLeft.map(s => s.value).includes(o.value)
            ),
        ])
        setRight(newRight)
        setSelectedLeft([])
        onChange(newRight)
    }

    const onSwitch = () => {
        if (left.length) {
            const newRight = [...right, ...left]
            setRight(newRight)
            setLeft([])
            onChange(newRight)
        } else {
            setLeft([...right])
            setRight([])
            onChange([])
        }
    }

    const onChangeLeft = ({ target }) =>
        setSelectedLeft(getSelected(target.selectedOptions))

    const onChangeRight = ({ target }) =>
        setSelectedRight(getSelected(target.selectedOptions))

    const onDoubleClick = target => {
        if (left.map(o => o.value).includes(target.value)) {
            const newRight = [...right, target]
            setLeft([...left.filter(o => o.value !== target.value)])
            setRight(newRight)
            onChange(newRight)
        } else {
            const newRight = [...right.filter(o => o.value !== target.value)]
            setLeft([...left, target])
            setRight(newRight)
            onChange(newRight)
        }
    }

    return (
        <Section>
            <MultiSelect
                options={left}
                onChange={onChangeLeft}
                onDoubleClick={onDoubleClick}
            />
            <TransferButtons
                onLeft={onLeft}
                onRight={onRight}
                onSwitch={onSwitch}
            />
            <MultiSelect
                options={right}
                onChange={onChangeRight}
                onDoubleClick={onDoubleClick}
            />
        </Section>
    )
}

TransferList.propTypes = {
    options: arrayOf(
        shape({
            label: string.isRequired,
            value: string.isRequired,
        })
    ).isRequired,
    onChange: func.isRequired,
}
