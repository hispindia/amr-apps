import React from 'react'
import { Redirect } from 'react-router-dom'
import { getEntities } from '../../api/api'
import { EntityTable } from '../'
import { Row, Title } from '../../helpers/helpers'

export class Home extends React.Component {
    state = {
        data: null,
        newClicked: false,
        selected: null,
    }

    componentDidMount = async () => {
        await this.getData(this.props.selected)
    }

    componentWillReceiveProps = async props => {
        if (this.state.selected && props.selected !== this.state.selected)
            await this.getData(props.selected)
    }

    getData = async selected => {
        this.setState({
            data: await getEntities(selected),
            selected: selected,
        })
    }

    onAddClick = () => {
        this.setState({ newClicked: true })
    }

    render() {
        if (this.state.newClicked)
            return (
                <Redirect
                    push
                    to={'orgUnit/' + this.props.selected + '/entity'}
                />
            )

        if (!this.state.data) return null

        return (
            <div style={{ margin: 16 }}>
                <Row>
                    <Title>{this.state.data.title}</Title>
                </Row>
                <div className="table">
                    <EntityTable
                        data={this.state.data}
                        onAddClick={this.onAddClick}
                        orgUnit={this.props.selected}
                    />
                </div>
            </div>
        )
    }
}
