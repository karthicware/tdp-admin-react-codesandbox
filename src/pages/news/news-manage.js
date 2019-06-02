import React from "react";
import Button from "@material-ui/core/Button";
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
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

import fire from "../../fire";
import MySnackbarContentWrapper from "../../components/MySnackbarContentWrapper";
import NewsFilter from "./news-filter";

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
    maxWidth: 200,
    marginBottom: 10,
    marginRight: 10
  },
  media: {
    height: 60,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  }
});

class NewsManage extends React.Component {
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
        //console.log(`snapshot.val()=${JSON.stringif1y(snapshot.val())}`);
        Object.entries(snapshot.val()).forEach(entry => {
          const [title, value] = entry;
          Object.entries(value).forEach(entry => {
            const [key, value] = entry;
            console.log(`key=${key}, v=${JSON.stringify(value)}`);
            albumList.push({ key, title, thumbnail: value.thumbnail });
          });
        });
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
        <NewsFilter />
        <Grid container sm={12} className={classes.albumContainer}>
          {albumList.map(data => (
            <Card className={classes.card}>
              <CardHeader title={data.title} subheader="September 14, 2016" />
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={data.thumbnail}
                  title="Paella dish"
                />
                <CardContent>
                  <Typography component="p">
                    This impressive paella is a perfect party dish and a fun
                    meal to cook together with your guests. Add 1 cup of frozen
                    peas along with the mussels, if you like.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions} disableActionSpacing>
                <Button size="small" color="primary">
                  Share
                </Button>
                <Button size="small" color="primary">
                  Learn More
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>
      </BlockUi>
    );
  }
}

export default withStyles(styles)(NewsManage);
