import React, { useState } from 'react'
import { arrayOf, shape, string, func } from 'prop-types'
import styled from 'styled-components'
import { MultiSelect } from './MultiSelect'
import { TransferButtons } from './TransferButtons'

const Section = styled.section`
    display: flex;
    height: 264px;
    margin-top: 10px;
`

const getSelected = selected =>
    Array.from(selected, ({ label, value }) => ({
        label,
        value,
    }))

export const TransferList = ({ options, onChange, selected }) => {
    const [left, setLeft] = useState(
        selected ? options.filter(o => !selected.includes(o.value)) : options
    )
    const [right, setRight] = useState(
        selected ? options.filter(o => selected.includes(o.value)) : []
    )
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
        setSelectedLeft([])
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
        setSelectedRight([])
        setSelectedLeft([])
        onChange(newRight)
    }

    const onSwitch = () => {
        if (left.length) {
            const newRight = [...right, ...left]
            setRight(newRight)
            setLeft([])
            setSelectedRight([])
            setSelectedLeft([])
            onChange(newRight)
        } else {
            setLeft([...right])
            setRight([])
            setSelectedRight([])
            setSelectedLeft([])
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
        setSelectedRight([])
        setSelectedLeft([])
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
                disableLeft={!selectedRight.length}
                onRight={onRight}
                disableRight={!selectedLeft.length}
                onSwitch={onSwitch}
                disableSwitch={!options.length}
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
