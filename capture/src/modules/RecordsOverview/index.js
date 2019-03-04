import React from 'react'
import { getEventsByStatus } from 'api'
import { Margin } from 'helpers'
import { ProgressSection, RecordTable, TitleRow } from 'modules'

/**
 * Shows all events created by user.
 */
export class RecordsOverview extends React.Component {
    state = { loading: true }

    componentDidMount = async () => this.init()

    componentDidUpdate = async prevProps => {
        if (this.state.data !== null)
            if (
                prevProps.selected !== this.props.selected ||
                prevProps.match.params.status !== this.props.match.params.status
            )
                await this.init()
    }

    init = async () => {
        this.setState({ loading: true })
        this.setState({
            data: await getEventsByStatus(
                this.props.selected,
                this.props.match.params.status,
                true
            ),
            loading: false,
        })
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
                {this.state.loading ? (
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
