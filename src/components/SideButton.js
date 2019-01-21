import React from "react";
import { Redirect } from 'react-router-dom'
import { Fab } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';


export class SideButton extends React.Component {
  state = {
    clicked: false
  };

  onClick = () => {
      this.setState({ clicked: true });
  }


  render() {
    if(this.state.clicked)
      return <Redirect push to={"/patient/"}/>;

    return (
        <Fab variant="extended" color="primary" onClick = { this.onClick }>
            <AddIcon style={{paddingRight: 8}}/>
            { this.props.label }
        </Fab>
    );
  }
}
