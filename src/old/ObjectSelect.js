import React from "react";
import Select from "react-select";
import { InputLabel } from "@material-ui/core";

export class ObjectSelect extends React.Component {
  state = {
    selected: null
  };

  componentDidMount = async () => {
    if (this.props.selected) {
      this.setState({
        selected: {
          value: this.props.selected.id,
          label: this.props.selected.name
        }
      });
    }
  };

  /**
   * OnChange method for the parent dropdown, sets the state and stores the parent in teh OU-Object
   * @param selected
   */
  onChange = selected => {
    this.setState({ selected: selected });
    this.props.onChange({ id: selected.value, name: selected.label });
  };

  render() {
    const ous = this.props.ous;

    return (
      <div style={{ paddingTop: 16, paddingBottom: 4 }}>
        {this.state.selected ? (
          <InputLabel style={{ fontSize: 12 }}>{this.props.label}</InputLabel>
        ) : null}
        <Select
          value={this.state.selected}
          onChange={this.onChange}
          placeholder="Parent"
          options={ous.map(ou => ({
            value: ou.id,
            label: ou.displayName
          }))}
        />
      </div>
    );
  }
}
