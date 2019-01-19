import React from "react";
//import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
//import MomentUtils from "@date-io/moment";
import { TextField } from "@material-ui/core";
import _ from "lodash";


export class InputField extends React.Component {
  state = {
    value: "",
    errorText: ""
  };

  constructor(props) {
    super(props);
    // Will start searching after user has stopped typing for 1 second.
    this.passValue = _.debounce(this.passValue, 1000);
  }

  componentDidMount = () => {
    if (this.props.value) this.setState({ value: this.props.value });
  };

  componentWillReceiveProps = props => {
    console.log(props.value)
    if(this.state.value !== props.value)
      this.setState({ value: props.value });
  }

  /**
   * passes the changed value to parent
   * @param newValue
   */
  passValue = async newValue => {
    this.props.onChange(newValue);
  };

  /**
   * handles value change
   * @param newValue
   */
  setValue = newValue => {
    this.setState({
      value: newValue.target.value
    });
    this.passValue(newValue.target.value);
  };


  /**
   * renders a DatePicker for all attributes of type 'date',
   * a ParentSelect object for the parent attribute,
   * a textfield for everything else, marks required attributes as required and shows an error when those are empty
   * @returns {*}
   */
  render() {
    return (
        <TextField
          required={this.props.required}
          name={this.props.name}
          label={this.props.label}
          value={this.state.value}
          onChange={this.setValue}
          variant={'outlined'}
          style={{padding: 8}}
          fullWidth
        />
    );
  }
}
