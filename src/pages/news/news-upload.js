import React from "react";
import set from "lodash.set";
import MaterialIcon, { colorPalette } from "material-icons-react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import { PhotoCamera } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import fire, { db } from "../../fire";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";
import { convertThumbnail } from "../../utils/image-util";

export default class NewsUpload extends React.Component {
  constructor(props) {
    super(props);
    //registeredOn: fire.firestore.FieldValue.serverTimestamp()
    this.state = {
      form: { title: "", content: "" },
      isSuccess: false,
      isFailure: false,
      message: null,
      isSubmitting: false,
      imageFile: null,
      imagePreviewUrl: null
    };
    this.save = this.save.bind(this);
    this.handleCloseForSuccess = this.handleCloseForSuccess.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this._handleImageChange = this._handleImageChange.bind(this);
  }

  componentDidMount() {}

  handleClear() {
    this.setState((state, props) => {
      return {
        form: { title: "", content: "" },
        isSuccess: false,
        isFailure: false,
        message: null,
        isSubmitting: false,
        imageFile: null,
        imagePreviewUrl: null
      };
    });
  }

  handleCloseForSuccess = () => {
    this.setState((state, props) => {
      return { isSuccess: false, message: "" };
    });
  };

  _handleImageChange(e) {
    e.preventDefault();

    let files = Array.from(e.target.files);
    //console.log(`files=${JSON.stringify(files)}`);
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        imageFile: files[0],
        imagePreviewUrl: reader.result
      });
    };
    reader.readAsDataURL(files[0]);
  }

  save() {
    this.setState((state, props) => {
      return {
        isSubmitting: true
      };
    });

    const { form, imageFile } = this.state;
    let formData = Object.assign({}, form);
    formData.createdOn = new Date().getTime();
    formData.content = { "1": form.content };
    const successCallback = thumbnailFile => {
      // Save image in storage

      const key = fire
        .database()
        .ref()
        .child(`news`)
        .push().key;
      const folder = fire.storage().ref(`news/${key}`);
      const mainImageRef = folder.child(imageFile.name);
      const thumbnailImageRef = folder.child(thumbnailFile.name);

      mainImageRef.put(imageFile).then(snapshot => {
        mainImageRef.getDownloadURL().then(remoteUrl => {
          formData.imgUri = remoteUrl;
          thumbnailImageRef.put(thumbnailFile).then(snapshot => {
            thumbnailImageRef.getDownloadURL().then(remoteUrl => {
              formData.thumbnail = remoteUrl;
              // Save form data in DB
              //console.log(`form=${JSON.stringify(formData)}`);
              fire
                .database()
                .ref()
                .child(`news/${key}`)
                .set(formData, error => {
                  if (error) {
                    this.setState((state, props) => {
                      return {
                        message: error,
                        isFailure: true,
                        isSubmitting: false
                      };
                    });
                  } else {
                    this.setState((state, props) => {
                      return {
                        message: "News uploaded successfully",
                        isSuccess: true,
                        isSubmitting: false,
                        imageFile: null,
                        imagePreviewUrl: null,
                        form: { title: "", content: "" }
                      };
                    });
                  }
                });
            });
          });
        });
      });
    };

    const errorCallback = error => {
      this.setState((state, props) => {
        return {
          message: error,
          isFailure: true,
          isSubmitting: false
        };
      });
    };

    convertThumbnail(imageFile, successCallback, errorCallback);
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
    const {
      form,
      isSuccess,
      isFailure,
      message,
      isSubmitting,
      imagePreviewUrl
    } = this.state;
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
    const ImagePreview = (
      <div style={{ width: "60%", height: "60%" }}>
        <img
          alt="previewImg"
          src={imagePreviewUrl}
          style={{
            border: "5px solid #009BE5",
            width: "100%",
            height: "100%",
            objectFit: "contain"
          }}
        />
      </div>
    );
    const UploadImage = (
      <div>
        <input
          accept="image/*"
          style={{ display: "none" }}
          id="icon-button-file"
          type="file"
          onChange={this._handleImageChange}
        />
        <label htmlFor="icon-button-file">
          <IconButton color="primary" component="span">
            <PhotoCamera style={{ fontSize: "5em" }} />
          </IconButton>
        </label>
      </div>
    );
    return (
      <BlockUi tag="div" blocking={isSubmitting}>
        <ErrorToast />
        <SuccessToast />
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">News</h4>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <form>
                  <div className="form-group row">
                    <div className="col-md-12">
                      <TextField
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        name="title"
                        label="News Title"
                        value={form.title}
                        onChange={this.handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <TextField
                        fullWidth
                        margin="normal"
                        InputLabelProps={{
                          shrink: true
                        }}
                        name="content"
                        label="Content"
                        value={form.content}
                        onChange={this.handleInputChange}
                        multiline
                        rows="12"
                      />
                    </div>
                  </div>
                </form>
              </div>
              <div
                className="col-6"
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center"
                }}
              >
                {imagePreviewUrl ? ImagePreview : UploadImage}
              </div>
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
