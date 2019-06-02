import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  grid: {
    width: "60%"
  },
  searchTitle: {
    padding: 10
  }
});

const NewsFilter = () => {
  const [fromDate, setFromDate] = React.useState(new Date());
  const [toDate, setToDate] = React.useState(new Date());

  const classes = useStyles();

  function handleFromDateChange(date) {
    setFromDate(date);
  }

  function handleToDateChange(date) {
    setToDate(date);
  }

  return (
    <>
      <Typography variant="h6" gutterBottom className={classes.searchTitle}>
        Search
      </Typography>
      <Paper>
        <Grid item sm={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid
              container
              className={classes.grid}
              justify="space-around"
              alignItems="center"
            >
              <DatePicker
                margin="normal"
                label="From Date"
                value={fromDate}
                format="dd/MM/yyyy"
                onChange={handleFromDateChange}
              />
              <DatePicker
                margin="normal"
                label="To Date"
                value={toDate}
                format="dd/MM/yyyy"
                onChange={handleToDateChange}
              />
              <Fab
                size="medium"
                color="primary"
                aria-label="Add"
                className={classes.margin}
              >
                <SearchIcon />
              </Fab>
            </Grid>
          </MuiPickersUtilsProvider>
        </Grid>
      </Paper>
    </>
  );
};

export default NewsFilter;
