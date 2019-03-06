import React from 'react'
import { toTable, Margin } from '../..'
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

    componentDidUpdate = async prevProps => {
        console.log(prevProps.location.pathname, this.props.location.pathname)
        if (
            prevProps.location.pathname !== this.props.location.pathname ||
            prevProps.eventLists !== this.props.eventLists
        )
            await this.init()
        else if (prevProps.selected !== this.props.selected)
            this.setState({ loading: true })
    }

    init = async () => {
        console.log('getting')
        this.setState({ loading: true })
        this.setState({
            data: await toTable(
                this.props.eventLists[
                    this.props.match.params.status
                        ? this.props.match.params.status
                        : 'ALL'
                ]
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
                {this.state.loading || this.props.loading ? (
                    <ProgressSection />
                ) : (
                    <RecordTable
                        data={this.state.data}
                        onEventClick={this.onEventClick}
                        title=""
                        onAddClick={this.onAddClick}
                        addButton={this.props.userOnly}
                    />
                )}
            </Margin>
        )
    }
}
