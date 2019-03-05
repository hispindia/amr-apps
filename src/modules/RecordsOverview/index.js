import React from 'react'
import { getEventsByStatus, Margin } from '../..'
import { RecordTable, ProgressSection, TitleRow } from '../'

const titles = {
    undefined: 'My records',
    Resend: 'Records for revision',
    Rejected: 'Rejected records',
    Approved: 'Approved records',
    Validate: 'Records for validation',
}

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
                this.props.userOnly
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
                <TitleRow title={titles[this.props.match.params.status]} />
                {this.state.loading ? (
                    <ProgressSection />
                ) : (
                    <RecordTable
                        data={this.state.data}
                        onEventClick={this.props.userOnly && this.onEventClick}
                        title=""
                        onAddClick={this.onAddClick}
                        addButton={this.props.userOnly}
                    />
                )}
            </Margin>
        )
    }
}
