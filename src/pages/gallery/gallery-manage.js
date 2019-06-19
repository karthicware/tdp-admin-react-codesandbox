import React from "react";
import Button from "../../components/CustomButtons/Button.jsx";
import Snackbar from "@material-ui/core/Snackbar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Close from "@material-ui/icons/Close";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import Moment from "react-moment";

import fire from "../../fire";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";
import GalleryFilter from "./gallery-filter";
import modalStyle from "../../assets/jss/material-kit-pro-react/modalStyle.jsx";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const styles = theme => ({
  buttonRow: {
    marginTop: 20
  },
  paper: {
    padding: 20,
    marginTop: 10
  },
  imgContainer: {
    display: "grid"
  },
  albumContainer: {
    marginTop: 20
  },
  card: {
    maxWidth: 300,
    minWidth: 200,
    marginBottom: 10,
    marginRight: 10
  },
  media: {
    height: 60,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex",
    justifyContent: "space-between"
  }
});

function DeleteConfirmation() {
  return (
    <Dialog
      classes={{
        root: classes.modalRoot,
        paper: classes.modal
      }}
      open={this.state.liveDemo}
      TransitionComponent={Transition}
      keepMounted
      onClose={() => this.handleClose("liveDemo")}
      aria-labelledby="classic-modal-slide-title"
      aria-describedby="classic-modal-slide-description"
    >
      <DialogTitle
        id="classic-modal-slide-title"
        disableTypography
        className={classes.modalHeader}
      >
        <Button
          simple
          className={classes.modalCloseButton}
          key="close"
          aria-label="Close"
          onClick={() => this.handleClose("liveDemo")}
        >
          {" "}
          <Close className={classes.modalClose} />
        </Button>
        <h4 className={classes.modalTitle}>Modal title</h4>
      </DialogTitle>
      <DialogContent
        id="classic-modal-slide-description"
        className={classes.modalBody}
      >
        <p>Woohoo, you're reading this text in a modal!</p>
      </DialogContent>
      <DialogActions className={classes.modalFooter}>
        <Button onClick={() => this.handleClose("liveDemo")} color="secondary">
          Close
        </Button>
        <Button color="primary">Save changes</Button>
      </DialogActions>
    </Dialog>
  );
}

class GalleryManage extends React.Component {
  constructor(props) {
    super(props);
    //registeredOn: fire.firestore.FieldValue.serverTimestamp()
    this.state = {
      isSuccess: false,
      isFailure: false,
      message: null,
      isSubmitting: false,
      albumList: []
    };

    this.handleCloseForSuccess = this.handleCloseForSuccess.bind(this);
  }

  componentWillMount() {
    let _this = this;
    var ref = fire.database().ref("gallery/metadata");
    ref.once("value", function(snapshot) {
      if (snapshot.val()) {
        let albumList = [];
        Object.entries(snapshot.val()).forEach(entry => {
          const [key, obj] = entry;
          albumList.push({ key, ...obj });
        });
        //console.log(`albumList=${JSON.stringify(albumList)}`);
        _this.setState({ albumList });
      }
    });
  }

  handleCloseForSuccess = () => {
    this.setState((state, props) => {
      return { isSuccess: false, message: "" };
    });
  };

  render() {
    const { classes } = this.props;
    const {
      albumList,
      isSuccess,
      isFailure,
      message,
      isSubmitting
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
        <GalleryFilter />
        <Grid container sm={12} className={classes.albumContainer}>
          {albumList.map(data => (
            <Card key={data.key} className={classes.card}>
              <CardHeader
                title={data.title}
                subheader={
                  <Moment format="DD/MM/YYYY">{data.timestamp}</Moment>
                }
              />
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={data.thumbnail}
                  title={data.title}
                />
              </CardActionArea>
              <CardActions className={classes.actions} disableActionSpacing>
                <Button color="primary" size="sm">
                  View
                </Button>
                <Button justIcon round color="danger" size="sm">
                  <DeleteIcon style={{ color: "#FFFFFF" }} />
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </BlockUi>
    );
  }
}

export default withStyles(styles)(GalleryManage);
