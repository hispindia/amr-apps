import React from 'react'
import { getEvents } from 'api'
import { Margin } from 'helpers'
import { ProgressSection, RecordTable, TitleRow } from 'modules'
//import { TitleRow } from 'modules/TitleRow'

/**
 * Shows all events created by user.
 */
export class MyRecords extends React.Component {
    state = { data: null }

    componentDidMount = async () =>
        this.setState({ data: await this.getData() })

    componentDidUpdate = async prevProps => {
        if (prevProps.selected !== this.props.selected)
            this.setState({ data: await this.getData() })
    }

    getData = async () => await getEvents(this.props.selected, true)

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
                    <RecordTable
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
