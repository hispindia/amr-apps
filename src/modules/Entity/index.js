import React from 'react'
import { Redirect } from 'react-router-dom'
import { getEvents, getEntityLabel, getPersonsEvents } from '../../api/api'
import { Title, Row } from '../../helpers/helpers'
import { EventTable, EntityInformation } from '../'
import { IconButton } from '../../inputs'

/**
 * Consists of entity information and event table.
 */
export class Entity extends React.Component {
    state = {
        data: null,
        addClicked: false,
        backClicked: false,
        eventClicked: null,
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
        this.setState({ addClicked: true })
    }

    /**
     * On table row click.
     */
    onEventClick = amrId => {
        this.setState({ eventClicked: amrId })
    }

    /**
     * On back arrow click.
     */
    backClicked = () => {
        this.setState({ backClicked: true })
    }

    render() {
        if (this.state.addClicked)
            return (
                <Redirect
                    push
                    to={
                        '/orgUnit/' +
                        this.props.match.params.orgUnit +
                        '/entity/' +
                        this.props.match.params.id +
                        '/event/'
                    }
                />
            )

        if (this.state.eventClicked)
            return (
                <Redirect
                    push
                    to={
                        '/orgUnit/' +
                        this.props.match.params.orgUnit +
                        '/entity/' +
                        this.props.match.params.id +
                        '/event/' +
                        this.state.eventClicked
                    }
                />
            )

        if (this.state.backClicked) return <Redirect push to={'/'} />

        if (!this.state.data) return null

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
                {this.props.match.params.id ? (
                    <div className="table">
                        <EventTable
                            data={this.state.data}
                            onAddClick={this.onAddClick}
                            onEventClick={this.onEventClick}
                        />
                    </div>
                ) : null}
            </div>
        )
    }
}
