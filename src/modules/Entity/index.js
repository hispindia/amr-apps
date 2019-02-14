import React from 'react'
import { withRouter } from 'react-router-dom'
import { getEntityLabel, getPersonsEvents } from '../../api/api'
import { Title, Row } from '../../helpers/helpers'
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
        if (this.props.match.params.id) await this.getEvents()
    }

    getEvents = async () => {
        this.setState({
            data: await getPersonsEvents(this.props.match.params.id),
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
                this.props.match.params.id +
                '/event/'
        )
    }

    /**
     * On table row click.
     */
    onEventClick = amrId => {
        this.props.history.push(
            '/orgUnit/' +
                this.props.match.params.orgUnit +
                '/entity/' +
                this.props.match.params.id +
                '/event/' +
                amrId
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
            <div style={{ margin: 16 }}>
                <Row>
                    <IconButton
                        name="arrow_back"
                        icon="arrow_back"
                        onClick={this.backClicked}
                    />
                    <Title>{getEntityLabel()}</Title>
                </Row>
                <EntityInformation
                    id={
                        this.props.match.params.id
                            ? this.props.match.params.id
                            : null
                    }
                    orgUnit={this.props.match.params.orgUnit}
                    onEntityAdded={this.onNewEnityAdded}
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
            </div>
        )
    }
}

export default withRouter(Entity)
