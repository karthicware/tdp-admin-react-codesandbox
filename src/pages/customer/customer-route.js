import React, { useState } from "react";
import { Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import CustomerEnroll from "./customer-enroll";
import Paperbase from "../../layout/dashboard/Paperbase";

const CustomerRoute = ({ match }) => {
  //console.log(`match=${JSON.stringify(match)}`);
  return (
    <Paper>
      <Route exact path={`${match.url}`} component={CustomerEnroll} />
    </Paper>
  );
};

const HeaderTab = props => {
  const [active, setActive] = useState(0);
  return (
    <Tabs value={active} textColor="inherit">
      <Tab
        textColor="inherit"
        label="Enroll"
        onClick={() => {
          props.history.push("/customer");
          setActive(0);
        }}
      />
    </Tabs>
  );
};

const CustomerPage = props => {
  //console.log(`props=${JSON.stringify(props)}`);
  return (
    <Paperbase
      headerTabs={<HeaderTab {...props} />}
      content={<CustomerRoute {...props} />}
      headerTitle="Customer"
      {...props}
    />
  );
};

export default CustomerPage;
