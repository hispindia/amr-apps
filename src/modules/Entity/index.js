import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '@dhis2/ui/core'
import { getEvents } from '../../api/api'
import { Title, Row } from '../../helpers/helpers'
import { EventTable, EntityInformation } from '../'
import { IconButton } from '../../inputs'

export class Entity extends React.Component {
    state = {
        data: null,
        newClicked: false,
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

    render() {
        if (this.state.newClicked) return <Redirect push to={'/event'} />

        if (!this.state.data) return null

        return (
            <div style={{ margin: 20 }}>
                <Row>
                    <IconButton
                        name="arrow_back"
                        icon="arrow_back"
                        redirect="/"
                    />
                    <Title>Patient</Title>
                </Row>
                <EntityInformation
                    id={
                        this.props.match.params.id
                            ? this.props.match.params.id
                            : null
                    }
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
