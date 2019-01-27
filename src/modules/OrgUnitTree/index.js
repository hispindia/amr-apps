import React from 'react'
import { Redirect } from 'react-router-dom'
import { getOrgUnits } from '../../api/api'
import { OrgUnitNode } from './OrgUnitNode'
import { IconButton } from '../../inputs'
import './style.css'

export class OrgUnitTree extends React.Component {
    state = {
        orgUnits: null,
        selected: null,
    }

    componentDidMount = async () => {
        const orgUnits = await getOrgUnits()
        this.setState({
            orgUnits: orgUnits,
            selected: orgUnits[0].id,
        })
    }

    onSelect = id => {
        this.setState({ selected: id })
        console.log(id)
    }

    render() {
        if (!this.state.orgUnits) return null

        return (
            <div>
                <IconButton
                    name="arrow_back"
                    icon="arrow_back"
                    onClick={this.props.onClick}
                />

                <ul id="myUL">
                    {this.state.orgUnits.map(orgUnit => (
                        <OrgUnitNode
                            orgUnit={orgUnit}
                            key={orgUnit.id}
                            show={true}
                            onSelect={this.onSelect}
                            selected={this.state.selected}
                        />
                    ))}
                </ul>
            </div>
        )
    }
}
