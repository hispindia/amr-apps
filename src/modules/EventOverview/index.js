import React from 'react'
import { getEvents } from '../../api/api'
import { Row, Title, Margin } from '../../helpers/helpers'
import { EventTable } from '../EventTable'

/**
 * Shows all events created by user.
 */
export class EventOverview extends React.Component {
    state = { data: null }

    componentDidMount = async () => {
        this.setState({ data: await getEvents(this.props.selected) })
    }

    componentDidUpdate = async prevProps => {
        if (prevProps.selected !== this.props.selected)
            this.setState({ data: await getEvents(this.props.selected) })
    }

    /**
     * Called when table row is clicked.
     */
    onEventClick = row => {
        this.props.history.push(
            '/orgUnit/' + row[5] + '/event/' + row[7] + '/entity/' + row[6]
        )
    }

    /**
     * On table add click.
     */
    onAddClick = () => {
        this.props.history.push('/orgUnit/' + this.props.selected + '/event/')
    }

    render() {
        if (!this.state.data) return null

        return (
            <Margin>
                <Row>
                    <Title>My records</Title>
                </Row>
                <div className="table">
                    <EventTable
                        data={this.state.data}
                        onEventClick={this.onEventClick}
                        onAddClick={this.onAddClick}
                        title=""
                        addButton
                    />
                </div>
            </Margin>
        )
    }
}
