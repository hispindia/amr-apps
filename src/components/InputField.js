import React from "react";
//import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
//import MomentUtils from "@date-io/moment";
import { TextField, CircularProgress } from "@material-ui/core";
import _ from "lodash";
import { isUnique } from "../api/api";


export class InputField extends React.Component {
  state = {
    value: "",
    errorText: "",
    validating: false
  };

  style = {
      position: "absolute",
      right: 0,
      top: 20,
      zIndex: 1
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
    //console.log(props.value)
    if(this.state.value !== props.value)
      this.setState({ value: props.value });
  }

  /**
   * passes the changed value to parent
   * @param newValue
   */
  passValue = async (name, value) => {
    const didValidate = await this.validate(value);
    this.setState({ errorText: didValidate });
    this.props.onChange(name, value);
  };

  /**
   * handles value change
   * @param newValue
   */
  setValue = event => {
    this.setState({
      value: event.target.value
    });
    this.passValue(event.target.name, event.target.value);
  };

  /**
   * @param {String} value input value
   * @returns Appropriate error text. Empty if valid.
   */
  validate = async value => {
    let errorText = this.state.errorText;
    if (this.props.required) {
      if (value === "" || value === null) errorText = "This field is required";
      else errorText = "";
    }
    if (this.props.unique) {
      if (value !== "") {
        this.setState({ validating: true });
        if (!(await isUnique(this.props.name, value))) {
          errorText = "This field requires a unique value";
          this.props.onUnique(this.props.name, false)
        }
        else {
          errorText = "";
          this.props.onUnique(this.props.name, true)
        }
        this.setState({ validating: false });
      }
    }
    return errorText;
  };

  /**
   * renders a DatePicker for all attributes of type 'date',
   * a ParentSelect object for the parent attribute,
   * a textfield for everything else, marks required attributes as required and shows an error when those are empty
   * @returns {*}
   */
  render() {
    return (
      <div style={{ position: "relative" }}>
        <TextField
          required={this.props.required}
          name={this.props.name}
          label={this.props.label}
          value={this.state.value}
          onChange={this.setValue}
          variant={'outlined'}
          style={{margin: 8}}
          fullWidth
          error={this.state.errorText !== ""}
          helperText={this.state.errorText}
        />
        {this.state.validating ? (
          <CircularProgress style={this.style} size={30}/>
        ) : null}
      </div>
    );
  }
}
