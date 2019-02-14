import React from 'react'
import { withRouter } from 'react-router-dom'
import { getEntities } from '../../api/api'
import { Row, Title } from '../../helpers/helpers'
import EntityTable from '../EntityTable'

/**
 * Overview of persons.
 */
class Home extends React.Component {
    state = {
        data: null,
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
        this.props.history.push('orgUnit/' + this.props.selected + '/entity')
    }

    render() {
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

export default withRouter(Home)
