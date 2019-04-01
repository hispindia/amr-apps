import React from 'react'
import { getEvents, Margin } from '../..'
import { RecordTable, ProgressSection, TitleRow } from '../'
import { titles, headers } from './config'

/**
 * Shows events by status.
 */
export class RecordsOverview extends React.Component {
    state = { loading: true }

    componentDidMount = async () => await this.init()

    componentDidUpdate = async prevProps => {
        if (
            prevProps.selected !== this.props.selected ||
            prevProps.match.params.status !== this.props.match.params.status
        ) {
            this.setState({ loading: true })
            await this.init()
        }
    }

    init = async () => {
        let data = {
            rows: await getEvents(
                this.props.tables[this.props.match.params.status],
                this.props.selected,
                !this.props.isApproval
            ),
            headers: headers,
        }
        this.setState({
            data: data,
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
