import React from "react";
import set from "lodash.set";
import MaterialIcon, { colorPalette } from "material-icons-react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import fire from "../../fire";

export default class CustomerEnroll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {}
    };
    this.save = this.save.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  save() {}

  handleSubmit() {}

  handleInputChange(event, type, name, value) {
    let { form } = this.state;
    if (type === "CUSTOM_INPUT") {
      set(form, name, value);
    } else {
      const target = event.target;
      const inputValue =
        target.type === "checkbox" ? target.checked : target.value;
      set(form, event.target.name, inputValue);
    }
    this.setState({ form });
  }

  render() {
    const { form } = this.state;
    return (
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Customer Info</h4>
          {JSON.stringify(this.state.form)}
        </div>
        <div className="card-body">
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <div className="col-md-4">
                  <TextField
                    label="Customer Name"
                    margin="dense"
                    name="custName"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    label="Company Name"
                    margin="dense"
                    name="compName"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    label="Company Address1"
                    margin="dense"
                    name="compAddress1"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-4">
                  <TextField
                    label="Company Address2"
                    margin="dense"
                    name="compAddress2"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    label="Landline"
                    margin="dense"
                    name="landline"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    label="Mobile"
                    margin="dense"
                    name="mobile"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-4">
                  <TextField
                    label="City"
                    margin="dense"
                    name="city"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-4">
                  <TextField
                    label="State"
                    margin="dense"
                    name="state"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="card-footer text-muted">
          <div className="row">
            <div className="col-md-12 mr-2">
              <Button
                variant="contained"
                color="primary"
                className="mr-2"
                onClick={this.handleSubmit}
              >
                Submit
              </Button>
              <Button variant="contained" onClick={this.handleCancel}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
