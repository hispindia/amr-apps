import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from '@dhis2/ui/core'

const IconContainer = styled.div`
    height: 32px;
    margin-right: 16px;
    margin-top: 23px;
    &:hover {
        color: var(--primary800);
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
            <IconContainer>
                <Icon
                    name={this.props.name}
                    className={this.props.icon}
                    onClick={this.props.onClick}
                />
            </IconContainer>
        )
    }
}

export default withRouter(IconButton)
