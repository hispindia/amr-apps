import React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import * as moment from 'moment';
import InputField from '@dhis2/ui/core/InputField'


export class DateField extends React.Component {
  state = {
    value: "",
    errorText: ""
  };

  componentDidMount = () => {
    if (this.props.value) this.setState({ value: this.props.value });
  };

  componentWillReceiveProps = props => {
    //console.log(props.value)
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

  openPicker = e => {
    this.picker.open(e);
  };

  onKeyPress = e => {
    if(e.key === 'Enter')
      this.picker.open(e);
  }

  getField = () => {
    return (
      <div onClick={this.props.disabled ? null : this.openPicker} onKeyPress={this.props.disabled ? null : this.onKeyPress}>
        <InputField
          required={this.props.required}
          name={this.props.name}
          label={this.props.label}
          value={this.state.value !== '' ? moment(this.state.value).format("LL") : this.state.value}
          onChange={() => {}}
          kind={'outlined'}
          status={this.state.errorText === "" ? 'default' : 'error'}
          help={this.state.errorText}
          disabled = { this.props.disabled }
        />
      </div>
    );
  }

  render() {
    return (
      <div className="picker">
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <DatePicker
          onChange={this.setDate}
          showTodayButton
          animateYearScrolling
          TextFieldComponent={this.getField}
          ref={node => { this.picker = node; }}
        />
      </MuiPickersUtilsProvider>
      </div>
    );
  }
}
