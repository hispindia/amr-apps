import React from 'react'
import { Redirect } from 'react-router-dom'
import { getEvents, getEntityLabel } from '../../api/api'
import { Title, Row } from '../../helpers/helpers'
import { EventTable, EntityInformation } from '../'
import { IconButton } from '../../inputs'

export class Entity extends React.Component {
    state = {
        data: null,
        addClicked: false,
        backClicked: false,
        forceTable: false,
    }

    componentDidMount = async () => {
        const data = await getEvents()
        this.setState({
            data: data,
        })
    }

    onAddClick = () => {
        this.setState({ addClicked: true })
    }

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
                        />
                    </div>
                ) : null}
            </div>
        )
    }
}
