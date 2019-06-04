import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Header from "../../components/Header/Header.jsx";
import Button from "../../components/CustomButtons/Button.jsx";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import navbarsStyle from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.jsx";

class TestHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container>
        <Grid item xs={12} sm={12} md={6}>
          <Header
            brand="Menu"
            color="primary"
            links={
              <List className={classes.list}>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink + " " + classes.navLinkActive}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Link
                  </Button>
                </ListItem>
                <ListItem className={classes.listItem}>
                  <Button
                    href="#pablo"
                    className={classes.navLink}
                    onClick={e => e.preventDefault()}
                    color="transparent"
                  >
                    Link
                  </Button>
                </ListItem>
              </List>
            }
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(navbarsStyle)(TestHeader);
