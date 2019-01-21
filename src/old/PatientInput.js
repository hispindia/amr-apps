import * as React from "react";
import { DatePicker, MuiPickersUtilsProvider } from "material-ui-pickers";
import MomentUtils from "@date-io/moment";
import TextField from "@material-ui/core/TextField";
import _ from "lodash";
import Close from "@material-ui/icons/Close";
import { IconButton } from "@material-ui/core";

import ObjectSelect from "../components/ObjectSelect";
import { isUnique } from "../../../api/api";

class CustomTextField extends React.Component {
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

  /**
   * passes the changed value to parent
   * @param newValue
   */
  passValue = async newValue => {
    if (!this.props.isAttribute) {
      const didValidate = await this.validate(newValue);
      this.setState({ errorText: didValidate });
      if (didValidate === "") this.props.onChange(newValue);
    } else this.props.onChange(newValue);
  };

  /**
   * handles date change
   * @param date
   */
  setDate = date => {
    this.setState({ value: date });
    this.passValue(date.format("YYYY-MM-DD"));
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
   * Deletes the date on button click
   */
  clearDate = () => {
    this.setState({ value: "" });
    this.passValue("");
  };

  /**
   * @param {String} value input value
   * @returns Appropriate error text. Empty if valid.
   */
  validate = async value => {
    let errorText = this.state.errorText;
    if (this.props.ou.required) {
      if (value === "" || value === null) errorText = "This field is required";
      else errorText = "";
    }
    if (this.props.ou.unique) {
      if (value !== "") {
        if (!(await isUnique(this.props.ou.name, value, this.props.ouId)))
          errorText = "This field requires a unique value";
        else errorText = "";
      }
    }
    return errorText;
  };

  renderLabel = date => {
    if (date.isValid()) return date.format("LL");
    return "";
  };

  styles = {
    closeButton: {
      position: "absolute",
      right: "-16px",
      top: "28px",
      zIndex: 1
    },
    closeIcon: {
      color: "#888888"
    }
  };

    /**
     * renders a DatePicker for all attributes of type 'date',
     * a ParentSelect object for the parent attribute,
     * a textfield for everything else, marks required attributes as required and shows an error when those are empty
     * @returns {*}
     */
    render() {
        const attribute = this.props.attribute;

        return (
            <div>
                {attribute.valueType === 'AGE' ? (
                    <MuiPickersUtilsProvider utils={MomentUtils}>
                        <DatePicker
                          required={true}
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
                ) : null}
            </div>
        );
    }

}

export default CustomTextField;
