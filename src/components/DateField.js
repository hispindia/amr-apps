import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";


export class DateField extends React.Component {
  state = {
    value: "",
    errorText: ""
  };

  componentDidMount = () => {
    if (this.props.value) this.setState({ value: this.props.value });
  };

  componentWillReceiveProps = props => {
    console.log(props.value)
    if(this.state.value !== props.value)
      this.setState({ value: props.value });
  };

  /**
   * handles date change
   * @param date
   */
  setDate = date => {
    this.setState({ value: date });
    this.props.onChange(this.props.name, date.format("YYYY-MM-DD"));
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
