import React from 'react'
import styled, { css } from 'styled-components'
import { Row } from '../../../../helpers/helpers'

const Caret = styled.span`
    cursor: pointer;
    user-select: none;
    &::before {
        content: '\\2023';
        color: black;
        display: inline-block;
        margin-right: 5px;
    }
    :hover::before {
        color: var(--primary800);
    }
    ${props =>
        props.opened &&
        css`
            &:before {
                transform: rotate(90deg);
            }
        `}
`

const NoCaret = styled.span`
    user-select: none;
    &::before {
        content: '\\2007';
        display: inline-block;
        margin-right: 5px;
    }
`

const OrgUnitText = styled.span`
    cursor: pointer;
    user-select: none;
    &:hover {
        color: var(--primary800);
    }
    ${props =>
        props.isSelected &&
        css`
            color: var(--primary800);
        `}
`

const ChildTree = styled.ul`
    list-style-type: none;
    padding-left: 20px;
    ${props =>
        !props.opened &&
        css`
            display: none;
        `}
`

/**
 * Organisation unit node.
 */
export class OrgUnitNode extends React.Component {
    state = { opened: false }

    componentDidMount = () => {
        if (this.props.selected.id === this.props.orgUnit.id)
            this.setState({ opened: true })
    }

    onCarretClick = () => {
        this.setState({ opened: !this.state.opened })
    }

    render() {
        const { selected, orgUnit, onSelect } = this.props
        const opened = this.state.opened

        return (
            <li key={orgUnit.id}>
                <Row>
                    {orgUnit.children.length > 0 ? (
                        <Caret opened={opened} onClick={this.onCarretClick} />
                    ) : <NoCaret/>}
                    <OrgUnitText
                        isSelected={selected.id === orgUnit.id}
                        onClick={() =>
                            onSelect({
                                id: orgUnit.id,
                                name: orgUnit.displayName,
                            })
                        }
                    >
                        {orgUnit.displayName}
                    </OrgUnitText>
                </Row>
                {orgUnit.children.length > 0 && opened ? (
                    <ChildTree opened={this.state.opened}>
                        {orgUnit.children.map(child => (
                            <OrgUnitNode
                                orgUnit={child}
                                key={child.id}
                                onSelect={onSelect}
                                selected={selected}
                            />
                        ))}
                    </ChildTree>
                ) : null}
            </li>
        )
    }
}
