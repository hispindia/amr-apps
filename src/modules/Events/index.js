import React from 'react'
import { Redirect } from 'react-router-dom'
import { getEntities, getEvents } from '../../api/api'
import { EntityTable } from '../'
import { Row, Title } from '../../helpers/helpers'
import { EventTable } from '../EventTable'

/**
 * Overview of persons.
 */
export class Events extends React.Component {
    state = {
        data: null,
        selected: null,
    }

    componentDidMount = async () => {
        await this.getData(this.props.selected)
    }

    componentWillReceiveProps = async props => {
        if (this.state.selected && props.selected !== this.state.selected)
            await this.getData(props.selected)
    }

    getData = async selected => {
        this.setState({
            data: await getEvents(),
            selected: selected,
        })
    }

    onEventClick = amrId => {
        console.log(amrId)
    }

    render() {
        if (this.state.newClicked)
            return (
                <Redirect
                    push
                    to={'orgUnit/' + this.props.selected + '/entity'}
                />
            )

        if (!this.state.data) return null

        return (
            <div style={{ margin: 16 }}>
                <Row>
                    <Title>Rejected records</Title>
                </Row>
                <div className="table">
                    <EventTable
                        data={this.state.data}
                        onEventClick={this.onEventClick}
                    />
                </div>
            </div>
        )
    }
}
