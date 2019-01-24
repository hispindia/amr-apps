import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '@dhis2/ui/core'
import { getEvents } from '../../api/api'
import { EntityInformation } from './EntityInformation'
import { EventTable } from './EventTable'

export class Entity extends React.Component {
    state = {
        data: null,
        newClicked: false,
    }

    componentDidMount = async () => {
        const data = await getEvents()
        console.log(data)
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
                <EntityInformation
                    id={
                        this.props.match.params.id
                            ? this.props.match.params.id
                            : null
                    }
                />
                {this.props.match.params.id ? (
                    <div style={{ position: 'relative' }}>
                        <EventTable data={this.state.data} />
                        <div
                            style={{
                                position: 'absolute',
                                left: '11px',
                                bottom: '11px',
                                zIndex: 1,
                            }}
                        >
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
