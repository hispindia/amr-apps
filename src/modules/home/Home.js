import React from "react";
import { Paper, Typography, Select, MenuItem, FormControl, InputLabel, Grid } from '@material-ui/core';
import _ from 'lodash';
import { getAllPatients } from "../../api/api";
import { PatientTable } from "./PatientTable";



/**
 * Seaction containing searching on the frontpage.
 */
export class Home extends React.Component {
    state = {
        loading: true,
        data: null
    };

    componentDidMount = async () => {
        console.log(await getAllPatients());
        this.setState({
            data: await getAllPatients(),
            loading: false
        })
    }

    render() {
        if(this.state.loading) return null;

        return(
            <PatientTable data = { this.state.data }/>
        );
    }
}
