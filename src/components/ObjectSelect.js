import React from "react";
import ReactDOM from 'react-dom';
import { InputLabel, FormControl, OutlinedInput, MenuItem, Select, FilledInput } from "@material-ui/core";

export class ObjectSelect extends React.Component {
  state = {
    value: '',
    labelWidth: 0
  };

  componentDidMount = async () => {
    if (this.props.value) {
      this.setState({
        value: this.props.value,
      });
    }
  };

  componentWillReceiveProps = props => {
    console.log(props.value)
    if(this.state.value !== props.value)
      this.setState({ value: props.value });
  };

  /**
   * OnChange method for the parent dropdown, sets the state and stores the parent in teh OU-Object
   * @param selected
   */
  onChange = event => {
    this.setState({ value: event.target.value });
    //this.props.onChange({ id: selected.value, name: selected.label });
  };

  render() {
    const objects = this.props.objects;

    return (
      <FormControl variant={'outlined'} fullWidth style={{margin: 8}}>
        <InputLabel htmlFor={this.props.label} required={this.props.required}>{this.props.label}</InputLabel>
        <Select
            value={this.state.value}
            onChange={this.onChange}
            input={<OutlinedInput labelWidth={this.props.labelWidth} name={this.props.label} id={this.props.label}/>}
        >
            {objects.map(object => (
                <MenuItem
                    key={object.id}
                    value={object.displayName}
                >
                    {object.displayName}
                </MenuItem>
            ))}
        </Select>
      </FormControl>
    );
  }
}
