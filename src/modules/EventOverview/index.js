import React from 'react'
import { getEvents } from '../../api/api'
import { Margin } from '../../helpers/helpers'
import { EventTable } from '../EventTable'
import TitleRow from '../TitleRow'

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
                <TitleRow title="My records" />
                <EventTable
                    data={this.state.data}
                    onEventClick={this.onEventClick}
                    onAddClick={this.onAddClick}
                    title=""
                    addButton
                />
            </Margin>
        )
    }
}
