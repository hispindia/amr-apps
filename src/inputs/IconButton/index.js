import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
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
class IconButton extends Component {
    render() {
        return (
            <IconContainer onClick={this.props.onClick}>
                <Icon name={this.props.name} className={this.props.icon} />
            </IconContainer>
        )
    }
}

export default withRouter(IconButton)
