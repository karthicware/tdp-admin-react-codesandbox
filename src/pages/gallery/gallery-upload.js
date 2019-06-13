import React from "react";
import Button from "../../components/CustomButtons/Button.jsx";
import customStyles from "../../assets/jss/material-kit-react/customCheckboxRadioSwitch.jsx";
//import Button from "@material-ui/core/Button";
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

//import MyButton from "../../components/CustomButtons/Button.jsx";
import fire from "../../fire";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";
// import {
//   sendPushNotificationToAll,
//   sendPushNotification
// } from "../../services/notification-service";
import { convertThumbnail } from "../../utils/image-util";

const styles = theme => ({
  ...customStyles,
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
      isNotificationRequire: false
    };
    this.errorCallback = error => {
      this.setState((state, props) => {
        return {
          message: error,
          isFailure: true,
          isSubmitting: false
        };
      });
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.savePhoto = this.savePhoto.bind(this);
    this.updatePhotoCount = this.updatePhotoCount.bind(this);
    this.storeAllImage = this.storeAllImage.bind(this);
    this.removeImage = this.removeImage.bind(this);
    this.saveAlbumMetadata = this.saveAlbumMetadata.bind(this);
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

  savePhoto(key, obj) {
    //sendPushNotificationToAll("New album added");

    fire
      .database()
      .ref(`/gallery/album/${key}`)
      .push()
      .set(obj, function(error) {
        if (error) {
          alert(error);
        } else {
          this.errorCallback();
        }
      });
  }

  updatePhotoCount(key) {
    fire
      .database()
      .ref(`/gallery/metadata/${key}`)
      .transaction(function(post) {
        if (post) {
          post["count"] = post["count"] + 1;
        }
        return post;
      });
    this.setState((state, props) => {
      return {
        message: "Album uploaded successfully",
        isSuccess: true,
        isSubmitting: false,
        files: [],
        imagesPreviewUrls: [],
        albumTitle: ""
      };
    });
  }

  storeAllImage(key) {
    const _this = this;
    const { files } = this.state;
    files.forEach(mainImgFile => {
      const storageRef = fire.storage().ref(`gallery/${key}`);
      const mainImage = storageRef.child(mainImgFile.name);
      mainImage.put(mainImgFile).then(snapshot =>
        mainImage.getDownloadURL().then(mainImgRemoteUrl => {
          const success_cb = thumbnailFile => {
            //
            const thumbnailFileRef = fire
              .storage()
              .ref(`gallery/${key}`)
              .child(thumbnailFile.name);
            thumbnailFileRef.put(thumbnailFile).then(snapshot =>
              thumbnailFileRef.getDownloadURL().then(thumbnailUrl => {
                _this.savePhoto(key, {
                  thumbnail: thumbnailUrl,
                  main: mainImgRemoteUrl
                });
              })
            );
          };
          convertThumbnail(mainImgFile, success_cb, this.errorCallback);
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

    const key = fire
      .database()
      .ref()
      .child(`gallery/metadata`)
      .push().key;

    const saveAlbumMetadata = thumbnailRemoteUrl => {
      const cb = () => {
        this.storeAllImage(key);
        console.log(`finished`);
        this.setState((state, props) => {
          return {
            message: "Album created successfully!",
            isSuccess: true,
            isSubmitting: false
          };
        });
      };
      this.saveAlbumMetadata(key, thumbnailRemoteUrl, cb);
    };

    this.storeDefaultImage(key, saveAlbumMetadata);

    // sendPushNotificationToAll("New album added");

    // sendPushNotification(
    //   "8754298377",
    //   "LOVE YOU PONDATI",
    //   "epdi love you sonnen parthaya"
    // ).catch(function(error) {
    //   console.error(`_handleSubmit-error=${JSON.stringify(error)}`);
    // });
  }

  storeDefaultImage(key, saveMetadata) {
    const { files } = this.state;
    const mainImgFile = files[0];
    const success_cb = thumbnailImg => {
      const storageRef = fire.storage().ref(`gallery/${key}`);
      const mainImage = storageRef.child(thumbnailImg.name);
      mainImage.put(thumbnailImg).then(snapshot =>
        mainImage.getDownloadURL().then(thumbnailRemoteUrl => {
          saveMetadata(thumbnailRemoteUrl);
        })
      );
    };
    convertThumbnail(mainImgFile, success_cb, this.errorCallback);
  }

  saveAlbumMetadata(key, thumbnailRemoteUrl, storeAllImage) {
    fire
      .database()
      .ref()
      .child(`gallery/metadata/${key}`)
      .set(
        {
          title: this.state.albumTitle,
          thumbnail: thumbnailRemoteUrl,
          count: 0,
          timestamp: new Date().getTime()
        },
        error => {
          if (error) {
            this.errorCallback();
          } else {
            storeAllImage();
          }
        }
      );
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
                  classes={{
                    switchBase: classes.switchBase,
                    checked: classes.switchChecked,
                    icon: classes.switchIcon,
                    iconChecked: classes.switchIconChecked,
                    bar: classes.switchBar
                  }}
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
