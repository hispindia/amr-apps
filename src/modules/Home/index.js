import React from 'react'
import { withRouter } from 'react-router-dom'
import { getPersons } from '../../api/api'
import { Row, Title, Margin } from '../../helpers/helpers'
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
        await this.getData()
    }

    componentDidUpdate = async () => {
        if (this.props.selected !== this.state.selected) await this.getData()
    }

    /**
     * Gets the person data.
     */
    getData = async () => {
        this.setState({
            data: await getPersons(this.props.selected),
            selected: this.props.selected,
        })
    }

    onAddClick = () => {
        this.props.history.push('orgUnit/' + this.props.selected + '/entity')
    }

    render() {
        if (!this.state.data) return null

        return (
            <Margin>
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
            </Margin>
        )
    }
}

export default withRouter(Home)
