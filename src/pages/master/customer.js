import React from "react";
import set from "lodash.set";
import MaterialIcon, { colorPalette } from "material-icons-react";
import Button from "@material-ui/core/Button";
import fire from "../../fire";

export default class CustomerMasterPage extends React.Component {
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
        </div>
        <div className="card-body">
          <div className="col-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <div className="col-md-2">
                  <label>Customer Name</label>
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="custName"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-2">Company Name</div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="compName"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-2">Company Address1</div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="compAddress1"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-2">Company Address2</div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="compAddress2"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-2">Landline</div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="landline"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-2">Mobile</div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col-md-2">City</div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="landline"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="col-md-2">State</div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
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
              <button className="btn btn-primary" onClick={this._handleSubmit}>
                <MaterialIcon icon="check" color={"d50000"} />
                Save
              </button>
              <button className="btn btn-danger" onClick={this.handleCancel}>
                <i className="fa fa-close" />
                Cancel
              </button>
              <Button
                variant="contained"
                color="danger"
                onClick={this.handleCancel}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
