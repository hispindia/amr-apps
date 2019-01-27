import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '@dhis2/ui/core'
import { getEvents, getEntityLabel } from '../../api/api'
import { Title, Row } from '../../helpers/helpers'
import { EventTable, EntityInformation } from '../'
import { IconButton } from '../../inputs'

export class Entity extends React.Component {
    state = {
        data: null,
        newClicked: false,
        backClicked: false,
        forceTable: false,
    }

    componentDidMount = async () => {
        const data = await getEvents()
        this.setState({
            data: data,
        })
    }

    newClick = () => {
        this.setState({ newClicked: true })
    }

    backClicked = () => {
        this.setState({ backClicked: true })
    }

    onNewEnityAdded = () => {
        this.setState({ forceTable: true })
    }

    render() {
        if (this.state.newClicked) return <Redirect push to={'/event'} />

        if (this.state.backClicked) return <Redirect push to={'/'} />

        if (!this.state.data) return null

        return (
            <div style={{ margin: 20 }}>
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
                    onEntityAdded={this.onNewEnityAdded}
                />
                {this.props.match.params.id ? (
                    <div className="table">
                        <EventTable data={this.state.data} />
                        <div className="table_button">
                            <Button
                                variant="contained"
                                kind="primary"
                                onClick={this.newClick}
                                icon="create"
                                size="medium"
                            >
                                New
                            </Button>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}
