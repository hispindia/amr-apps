import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Icon } from '@dhis2/ui/core'

const IconContainer = styled.div`
    height: 32px;
    margin-right: 8px;
    margin-top: 12px;
    padding: 12px;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
        & .ui_icon_base_1s8vb {
            color: var(--primary800);
        }
        background-color: rgba(0, 0, 0, 0.08);
    }
    & .ui_icon_base_1s8vb {
        font-size: 2rem;
        cursor: pointer;
    }
`

/**
 * Icon Button.
 */
export const IconButton = props => (
    <IconContainer onClick={props.onClick}>
        <Icon name={props.name} className={props.icon} />
    </IconContainer>
)

IconButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
}
