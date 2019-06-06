import React from "react";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-pickers";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "../../components/CustomButtons/Button.jsx";
import { makeStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  grid: {
    width: "60%"
  },
  paper: {
    padding: 20,
    marginBottom: 20
  },
  searchTitle: {
    padding: 10
  }
});

const GalleryFilter = () => {
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
      <Paper className={classes.paper}>
        <Grid container spacing={16} direction="row" alignItems="center">
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="From Date"
                value={fromDate}
                format="dd/MM/yyyy"
                onChange={handleFromDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="To Date"
                value={toDate}
                format="dd/MM/yyyy"
                onChange={handleToDateChange}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <Button color="primary" round justIcon>
              <SearchIcon />
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default GalleryFilter;
