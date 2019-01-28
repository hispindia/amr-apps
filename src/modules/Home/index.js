import React from 'react'
import { Redirect } from 'react-router-dom'
import { Button } from '@dhis2/ui/core'
import { getEntities } from '../../api/api'
import { EntityTable } from '../'

export class Home extends React.Component {
    state = {
        data: null,
        newClicked: false,
        selected: null,
    }

    getData = async selected => {
        this.setState({
            data: await getEntities(selected),
            selected: selected,
        })
    }

    componentDidMount = async () => {
        await getData(this.props.selected)
    }

    componentWillReceiveProps = async props => {
        if (this.state.selected && props.selected != this.state.selected)
            await getData(props.selected)
    }

    newClick = () => {
        this.setState({ newClicked: true })
    }

    render() {
        if (this.state.newClicked) return <Redirect push to={'/entity'} />

        if (!this.state.data) return null

        return (
            <div className="table" style={{ margin: 20 }}>
                <EntityTable data={this.state.data} />
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
        )
    }
}
