import React from "react";
import set from "lodash.set";
import MaterialIcon, { colorPalette } from "material-icons-react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import fire, { db } from "../../fire";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";

export default class CustomerEnroll extends React.Component {
  constructor(props) {
    super(props);
    //registeredOn: fire.firestore.FieldValue.serverTimestamp()
    this.state = {
      form: {},
      isSuccess: false,
      isFailure: false,
      message: "test message",
      isSubmitting: false
    };
    this.save = this.save.bind(this);
    this.handleCloseForSuccess = this.handleCloseForSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
  }

  componentDidMount() {}

  handleClear() {
    this.setState((state, props) => {
      return {
        form: {
          custName: "",
          compName: "",
          compAddress1: "",
          compAddress2: "",
          landline: "",
          mobile: "",
          city: "",
          state: ""
        }
      };
    });
  }

  handleCloseForSuccess = () => {
    this.setState((state, props) => {
      return { isSuccess: false, message: "" };
    });
  };

  save() {
    this.setState((state, props) => {
      return {
        isSubmitting: true
      };
    });

    const { form } = this.state;
    form.createdOn = new Date().getTime();
    db.collection("customer")
      .doc(form.mobile)
      .set(form)
      .then(() => {
        this.setState((state, props) => {
          return {
            message: "Customer details saved successfully",
            isSuccess: true,
            isSubmitting: false
          };
        });
      })
      .catch(function(error) {
        this.setState((state, props) => {
          return {
            message: error,
            isFailure: true,
            isSubmitting: false
          };
        });
      });
  }

  handleSubmit() {
    this.save();
  }

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
    this.setState((state, props) => {
      return { form };
    });
  }

  render() {
    const { form, isSuccess, isFailure, message, isSubmitting } = this.state;
    const ErrorToast = () => (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={isFailure}
        autoHideDuration={2000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleCloseForFailure}
          variant="success"
          message={message}
        />
      </Snackbar>
    );
    const SuccessToast = () => (
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={isSuccess}
        autoHideDuration={2000}
        onClose={this.handleClose}
      >
        <MySnackbarContentWrapper
          onClose={this.handleCloseForSuccess}
          variant="success"
          message={message}
        />
      </Snackbar>
    );
    return (
      <BlockUi tag="div" blocking={isSubmitting}>
        <ErrorToast />
        <SuccessToast />
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Customer Info</h4>
            {JSON.stringify(form)}
          </div>
          <div className="card-body">
            <div className="col-12">
              <form>
                <div className="form-group row">
                  <div className="col-md-4">
                    <TextField
                      label="Customer Name"
                      margin="dense"
                      name="custName"
                      value={form.custName}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      label="Company Name"
                      margin="dense"
                      name="compName"
                      value={form.compName}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      label="Company Address1"
                      margin="dense"
                      name="compAddress1"
                      value={form.compAddress1}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-4">
                    <TextField
                      label="Company Address2"
                      margin="dense"
                      name="compAddress2"
                      value={form.compAddress2}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      label="Landline"
                      margin="dense"
                      name="landline"
                      value={form.landline}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      label="Mobile"
                      margin="dense"
                      name="mobile"
                      value={form.mobile}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-4">
                    <TextField
                      label="City"
                      margin="dense"
                      name="city"
                      value={form.city}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
                    />
                  </div>
                  <div className="col-md-4">
                    <TextField
                      label="State"
                      margin="dense"
                      name="state"
                      value={form.state}
                      onChange={this.handleInputChange}
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true
                      }}
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
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
                <Button variant="contained" onClick={this.handleClear}>
                  Clear
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BlockUi>
    );
  }
}
