import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import BlockUi from "react-block-ui";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteForeverRoundedIcon from "@material-ui/icons/DeleteForeverRounded";
import "react-block-ui/style.css";

import fire from "../../fire";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";
import {
  sendPushNotificationToAll,
  sendPushNotification
} from "../../services/notification-service";

const styles = theme => ({
  grid: {
    //width: "30%"
  },
  imgContainer: {
    display: "grid"
  },
  paper: {
    padding: 20,
    marginBottom: 20
  },
  button: {
    margin: theme.spacing.unit
  },
  fileInput: {
    display: "none"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  footer: {
    marginTop: 20
  },
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
    //backgroundColor: theme.palette.background.paper
  },
  gridList: {
    //width: 500,
    height: 450
  },
  formGrid: {
    //paddingRight: theme.spacing.unit
    width: "50%"
  },
  submitButton: {
    marginTop: 20
  },
  deleteIcon: {
    color: "rgba(255, 255, 255, 0.54)",
    fontSize: 42
  },
  imgTitleBar: {
    background: "none"
  }
});

class GalleryUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSuccess: false,
      isFailure: false,
      message: null,
      isSubmitting: false,
      files: [],
      imagesPreviewUrls: [],
      albumTitle: "",
      remoteFiles: [],
      isNotificationRequire: true
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.saveImageDetailsInDB = this.saveImageDetailsInDB.bind(this);
    this.convertThumbnailAndSaveInStorage = this.convertThumbnailAndSaveInStorage.bind(
      this
    );
    this.saveImageInStorage = this.saveImageInStorage.bind(this);
    this.removeImage = this.removeImage.bind(this);
  }

  removeImage(i) {
    //console.log(`i=${i}`);
    let { imagesPreviewUrls } = this.state;
    imagesPreviewUrls.splice(i, 1);
    console.log(`imagesPreviewUrls=${imagesPreviewUrls.length}`);
    this.setState((state, props) => {
      return { imagesPreviewUrls };
    });
  }
  saveImageDetailsInDB(remoteFile) {
    //const _this = this;
    const { albumTitle } = this.state;
    const newPostKey = fire
      .database()
      .ref()
      .child(`gallery/album/${albumTitle}`)
      .push().key;

    var updates = {};
    updates[`/gallery/album/${albumTitle}/${newPostKey}`] =
      remoteFile.remoteUrl;
    updates[`/gallery/metadata/${albumTitle}/${newPostKey}`] = {
      thumbnail: remoteFile.thumbnailUrl,
      title: albumTitle
    };
    sendPushNotificationToAll("New album added");

    fire
      .database()
      .ref()
      .update(updates, function(error) {
        if (error) {
          alert(error);
        } else {
          alert("Data saved successfully!");
        }
      });
  }

  convertThumbnailAndSaveInStorage(remoteUrl, inputFile) {
    const _this = this;
    const { albumTitle, remoteFiles } = this.state;
    let remoteFile = { remoteUrl, fileName: inputFile.name };

    const fileName = inputFile.name;
    const reader = new FileReader();
    reader.readAsDataURL(inputFile);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        const width = 200;
        const scaleFactor = width / img.width;
        elem.width = width;
        elem.height = img.height * scaleFactor;
        const ctx = elem.getContext("2d");
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        ctx.canvas.toBlob(
          blob => {
            const file = new File([blob], fileName, {
              type: "image/png",
              lastModified: Date.now()
            });
            const thumbnailFileRef = fire
              .storage()
              .ref(`gallery/${albumTitle}/thumbnail`)
              .child(file.name);
            thumbnailFileRef.put(file).then(snapshot =>
              thumbnailFileRef.getDownloadURL().then(url => {
                remoteFile.thumbnailUrl = url;
                remoteFiles.push(remoteFile);
                _this.saveImageDetailsInDB(remoteFile);
                _this.setState({ remoteFiles });
              })
            );
          },
          "image/jpeg",
          1
        );
      };
      reader.onerror = error => {
        console.log(error);
        remoteFiles.push(remoteFile);
        _this.saveImageDetailsInDB(remoteFile);
        _this.setState({ remoteFiles });
      };
    };
  }

  saveImageInStorage() {
    const _this = this;
    const { albumTitle, files } = this.state;
    files.forEach(file => {
      const storageRef = fire.storage().ref(`gallery/${albumTitle}`);
      const mainImage = storageRef.child(file.name);
      mainImage.put(file).then(snapshot =>
        mainImage.getDownloadURL().then(remoteUrl => {
          //remoteFile = { fileName: file.name, remoteUrl: url };
          _this.convertThumbnailAndSaveInStorage(remoteUrl, file);
        })
      );
    });
  }

  _handleSubmit(e) {
    this.setState((state, props) => {
      return {
        isSubmitting: true
      };
    });
    this.saveImageInStorage();
    // sendPushNotificationToAll("New album added");

    // sendPushNotification(
    //   "8754298377",
    //   "LOVE YOU PONDATI",
    //   "epdi love you sonnen parthaya"
    // ).catch(function(error) {
    //   console.error(`_handleSubmit-error=${JSON.stringify(error)}`);
    // });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let files = Array.from(e.target.files);

    files.forEach(file => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          files: [...this.state.files, file],
          imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
        });
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    const { classes } = this.props;
    const {
      isSuccess,
      isFailure,
      message,
      isSubmitting,
      imagesPreviewUrls
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
    return (
      <BlockUi tag="div" blocking={isSubmitting}>
        <ErrorToast />
        <SuccessToast />
        <Typography variant="h6" gutterBottom>
          Add/Edit Gallery
        </Typography>
        <Paper className={classes.paper}>
          <Grid
            container
            className={classes.formGrid}
            justify="space-between"
            alignItems="center"
          >
            <TextField
              margin="normal"
              InputLabelProps={{
                shrink: true
              }}
              name="title"
              label="Album Title"
              value={this.state.title}
              onChange={e => this.setState({ albumTitle: e.target.value })}
            />

            <FormControlLabel
              control={
                <Switch
                  checked={this.state.isNotificationRequire}
                  color="primary"
                  onChange={e =>
                    this.setState({
                      isNotificationRequire: e.target.checked
                    })
                  }
                />
              }
              label="Push Notification"
            />
            <input
              accept="image/*"
              className={classes.fileInput}
              id="outlined-button-file"
              onChange={this._handleImageChange}
              multiple
              type="file"
            />
            <label htmlFor="outlined-button-file">
              <Button
                variant="contained"
                component="span"
                className={classes.button}
              >
                Upload
                <CloudUploadIcon className={classes.rightIcon} />
              </Button>
            </label>
          </Grid>
          <Grid item className={classes.submitButton}>
            <Button
              variant="contained"
              color="primary"
              onClick={this._handleSubmit}
            >
              Submit
            </Button>
          </Grid>
        </Paper>

        <Grid item sm={12} xs={12}>
          <div className={classes.gridContainer}>
            <GridList
              cellHeight={160}
              className={imagesPreviewUrls.length ? classes.gridList : null}
              cols={3}
            >
              {imagesPreviewUrls.map((imagePreviewUrl, i) => (
                <GridListTile key={imagePreviewUrl} cols={1}>
                  <img src={imagePreviewUrl} alt={"No Img"} />

                  <GridListTileBar
                    classes={{
                      root: classes.imgTitleBar
                    }}
                    actionIcon={
                      <IconButton
                        className={classes.deleteIcon}
                        onClick={() => this.removeImage(i)}
                      >
                        <DeleteForeverRoundedIcon color="error" />
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Grid>
      </BlockUi>
    );
  }
}

export default withStyles(styles)(GalleryUpload);
