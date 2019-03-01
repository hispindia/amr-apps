import React from 'react'
import { getEvents } from '../../api/api'
import { Margin, ProgressSection } from '../../helpers/helpers'
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
        this.props.history.push('/orgUnit/' + row[5] + '/event/' + row[6])
    }

    /**
     * On table add click.
     */
    onAddClick = () => {
        this.props.history.push('/orgUnit/' + this.props.selected + '/event/')
    }

    render() {
        return (
            <Margin>
                <TitleRow title="My records" />
                {!this.state.data ? (
                    <ProgressSection />
                ) : (
                    <EventTable
                        data={this.state.data}
                        onEventClick={this.onEventClick}
                        onAddClick={this.onAddClick}
                        title=""
                        addButton
                    />
                )}
            </Margin>
        )
    }
}
