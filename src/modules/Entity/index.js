import React from 'react'
import { withRouter } from 'react-router-dom'
import { getEntityLabel, getPersonsEvents } from '../../api/api'
import { Title, Row, Margin } from '../../helpers/helpers'
import { EventTable } from '../'
import IconButton from '../../inputs/IconButton'
import EntityInformation from '../EntityInformation'

/**
 * Consists of entity information and event table.
 */
class Entity extends React.Component {
    state = {
        data: null,
        forceTable: false,
    }

    componentDidMount = async () => {
        if (this.props.match.params.entity) await this.getEvents()
    }

    getEvents = async entityId => {
        this.setState({
            data: await getPersonsEvents(
                entityId ? entityId : this.props.match.params.entity
            ),
        })
    }

    /**
     * On table add click.
     */
    onAddClick = () => {
        this.props.history.push(
            '/orgUnit/' +
                this.props.match.params.orgUnit +
                '/entity/' +
                this.props.match.params.entity +
                '/event/'
        )
    }

    /**
     * On table row click.
     */
    onEventClick = row => {
        this.props.history.push(
            '/orgUnit/' +
                this.props.match.params.orgUnit +
                '/entity/' +
                this.props.match.params.entity +
                '/event/' +
                row[row.length - 1]
        )
    }

    /**
     * On back arrow click.
     */
    backClicked = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <Margin>
                <Row>
                    <IconButton
                        name="arrow_back"
                        icon="arrow_back"
                        onClick={this.backClicked}
                    />
                    <Title>Person</Title>
                </Row>
                <EntityInformation
                    id={
                        this.props.match.params.entity
                            ? this.props.match.params.entity
                            : null
                    }
                    orgUnit={this.props.match.params.orgUnit}
                    onEntityAdded={this.getEvents}
                />
                {this.state.data ? (
                    <div className="table">
                        <EventTable
                            data={this.state.data}
                            onAddClick={this.onAddClick}
                            onEventClick={this.onEventClick}
                            addButton
                        />
                    </div>
                ) : null}
            </Margin>
        )
    }
}

export default withRouter(Entity)
