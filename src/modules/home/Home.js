import React from "react";
import { withWidth, Grid } from '@material-ui/core';
import { getAllPatients } from "../../api/api";
import { PatientTable } from "./PatientTable";
import { SideButton } from "../../components/SideButton";


/**
 * Seaction containing searching on the frontpage.
 */
class Home extends React.Component {
    state = {
        loading: true,
        data: null
    };

    directions = {
        xs: "column-reverse",
        sm: "column-reverse"
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

        // Change direction on small screens.
        const direction = this.directions[this.props.width] || "row";

        return(
            <Grid container spacing={16} direction={direction}>
                <Grid item sm>
                    <PatientTable data = { this.state.data }/>
                </Grid>
                <Grid item>
                    <SideButton label='New'/>
                </Grid>
            </Grid>
        );
    }
}

export default withWidth()(Home);
