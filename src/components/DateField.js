import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import { TextField } from "@material-ui/core";
import _ from "lodash";


export class DateField extends React.Component {
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
    if (this.props.basicValue) this.setState({ value: this.props.basicValue });
  };

  componentWillReceiveProps = props => {
    console.log(props.value)
    if(this.state.value !== props.value)
      this.setState({ value: props.value });
  };

  /**
   * passes the changed value to parent
   * @param newValue
   */
  passValue = async newValue => {
    this.props.onChange(newValue);
  };

  /**
   * handles date change
   * @param date
   */
  setDate = date => {
    this.setState({ value: date });
    this.passValue(date.format("YYYY-MM-DD"));
  };

  renderLabel = date => {
    if (date.isValid()) return date.format("LL");
    return "";
  };


  /**
   * renders a DatePicker for all attributes of type 'date',
   * a ParentSelect object for the parent attribute,
   * a textfield for everything else, marks required attributes as required and shows an error when those are empty
   * @returns {*}
   */
  render() {
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          required={this.props.required}
          error={this.state.value === null}
          label={this.props.label}
          value={this.state.value}
          onChange={this.setDate}
          labelFunc={this.renderLabel}
          variant={'outlined'}
          fullWidth
          style={{margin: 8}}
          showTodayButton
          animateYearScrolling
        />
      </MuiPickersUtilsProvider>
    );
  }
}
