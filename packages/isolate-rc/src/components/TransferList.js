import React, { useState } from 'react'
import { arrayOf, shape, string } from 'prop-types'
import styled from 'styled-components'
import { Menu, MenuItem, colors } from '@dhis2/ui-core'
import { Row } from '@hisp-amr/app'

const Item = ({ label, value }) => {
    const [selected, setSelected] = useState(false)

    const onClick = () => setSelected(!selected)

    return (
        <Option key={value} value={value} selected={selected}>
            {label}
        </Option>
    )
}

const Option = styled.option`
    &:checked {
        background-color: ${colors.grey600};
    }
    &:active {
        background-color: ${colors.grey400};
    }
    &:hover {
        background-color: ${colors.grey200};
    }
`

const MultiSelect = styled.select`
    height: 240px;
    flex: 1;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(74, 87, 104);
    border-image: initial;
    border-radius: 4px;
    overflow-y: auto;
    outline: unset;
    &:focus {
        border-color: ${colors.teal400};
    }
`

export const TransferList = ({ items }) => {
    const [left, setLeft] = useState(items)
    const [right, setRight] = useState([])

    return (
        <Row>
            <MultiSelect multiple>
                {left.map(({ label, value }) => (
                    <Item key={value} label={label} value={value} />
                ))}
            </MultiSelect>
            <MultiSelect multiple>
                {right.map(({ label, value }) => (
                    <Item key={value} label={label} value={value} />
                ))}
            </MultiSelect>
        </Row>
    )
}

TransferList.propTypes = {
    items: arrayOf(
        shape({
            label: string.isRequired,
            value: string.isRequired,
        })
    ),
}
