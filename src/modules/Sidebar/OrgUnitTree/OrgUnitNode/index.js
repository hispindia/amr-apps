import React from 'react'
import './style.css'
import { Row } from '../../../../helpers/helpers'

/**
 * Organisation unit node.
 */
export class OrgUnitNode extends React.Component {
    state = {
        opened: false,
    }

    onCarretClick = () => {
        this.setState({ opened: !this.state.opened })
    }

    render() {
        return (
            <li key={this.props.orgUnit.id} className="">
                <Row>
                    {this.props.orgUnit.children.length > 0 ? (
                        <span
                            className={
                                this.state.opened ? 'caret caret-down' : 'caret'
                            }
                            onClick={this.onCarretClick}
                        />
                    ) : (
                        <span className="no-caret" />
                    )}
                    <span
                        className={
                            this.props.selected.id === this.props.orgUnit.id
                                ? 'ou-text ou-selected'
                                : 'ou-text'
                        }
                        onClick={() =>
                            this.props.onSelect({
                                id: this.props.orgUnit.id,
                                name: this.props.orgUnit.displayName,
                            })
                        }
                    >
                        {this.props.orgUnit.displayName}
                    </span>
                </Row>
                {this.props.orgUnit.children.length > 0 ? (
                    <ul className={this.state.opened ? '' : 'nested'}>
                        {this.props.orgUnit.children.map(child => (
                            <OrgUnitNode
                                orgUnit={child}
                                key={child.id}
                                onSelect={this.props.onSelect}
                                selected={this.props.selected}
                            />
                        ))}
                    </ul>
                ) : null}
            </li>
        )
    }
}
