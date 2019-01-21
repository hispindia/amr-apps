import React from "react";
import { FormControl, FormLabel, RadioGroup, FormControlLabel, Radio } from "@material-ui/core";


export class RadioSelector extends React.Component {
  state = {
    value: ""
  };

group = {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row'
};

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
  onChange = event => {
    console.log()
    this.setState({ value: event.target.value });
    this.props.onChange(this.props.name, event.target.value);
  };


  /**
   * renders a DatePicker for all attributes of type 'date',
   * a ParentSelect object for the parent attribute,
   * a textfield for everything else, marks required attributes as required and shows an error when those are empty
   * @returns {*}
   */
  render() {
    return (
        <FormControl style={{margin: 8}}>
            <FormLabel required={this.props.required}>
                {this.props.label}
            </FormLabel>
            <RadioGroup
                aria-label={this.props.label}
                name={this.state.name}
                value={this.state.value}
                onChange={this.onChange}
                style={this.group}
            >
              {this.props.objects.map(object => (
                <FormControlLabel key={object.id} value={object.name} control={<Radio />} label={object.displayName} />
              ))}
            </RadioGroup>
        </FormControl>
    );
  }
}
