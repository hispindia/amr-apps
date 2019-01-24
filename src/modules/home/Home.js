import React from 'react'
import { getAllPatients } from '../../api/api'
import { PatientTable } from './PatientTable'
import { SideButton } from '../../components/SideButton'
import { Row } from '../../helpers/helpers'

export class Home extends React.Component {
    state = {
        data: null,
    }

    componentDidMount = async () => {
        this.setState({
            data: await getAllPatients(),
        })
    }

    render() {
        if (!this.state.data) return null

        return (
            <div style={{ margin: 20 }}>
                <Row>
                    <PatientTable data={this.state.data} />
                    <div style={{ width: 16 }} />
                    <SideButton label="New" icon="create" />
                </Row>
            </div>
        )
    }
}
