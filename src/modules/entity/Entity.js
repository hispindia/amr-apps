import React from 'react'
import { getAllPatients, getEvents } from '../../api/api'
import { EntityInformation } from './EntityInformation'
import { EventTable } from './EventTable'
import { Row } from '../../helpers/helpers'

export class Entity extends React.Component {
    state = {
        data: null,
    }

    componentDidMount = async () => {
        const data = await getEvents()
        console.log(data)
        this.setState({
            data: data,
        })
    }

    render() {
        if (!this.state.data) return null

        return (
            <div style={{ margin: 20 }}>
                <EntityInformation
                    id={
                        this.props.match.params.id
                            ? this.props.match.params.id
                            : null
                    }
                />
                {this.props.match.params.id ? (
                    <EventTable data={this.state.data} />
                ) : null}
            </div>
        )
    }
}
