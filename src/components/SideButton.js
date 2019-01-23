import React from "react";
import { Redirect } from 'react-router-dom'
import { Button } from '@dhis2/ui/core'


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
      <Button variant="contained" kind="primary" onClick={this.onClick} icon={this.props.icon} size='large'>
        {this.props.label}
      </Button>
    );
  }
}
