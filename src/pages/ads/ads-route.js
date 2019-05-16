import React, { useState } from "react";
import { Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import AdsUpload from "./ads-upload";
import AdsManage from "./ads-manage";
import Paperbase from "../../layout/dashboard/Paperbase";

const AdsRoute = ({ match }) => {
  //console.log(`match=${JSON.stringify(match)}`);
  return (
    <Paper>
      <Route exact path={`${match.url}`} component={AdsUpload} />
      <Route path={`${match.url}/manage`} component={AdsManage} />
    </Paper>
  );
};

const HeaderTab = props => {
  const [active, setActive] = useState(0);
  return (
    <Tabs value={active} textColor="inherit">
      <Tab
        textColor="inherit"
        label="Upload New"
        onClick={() => {
          props.history.push("/ads/upload");
          setActive(0);
        }}
      />
      <Tab
        textColor="inherit"
        label="Manage Existing"
        onClick={() => {
          props.history.push("/ads/manage");
          setActive(1);
        }}
      />
    </Tabs>
  );
};

const AdsPage = props => {
  //console.log(`props=${JSON.stringify(props)}`);
  return (
    <Paperbase
      headerTabs={<HeaderTab {...props} />}
      content={<AdsRoute {...props} />}
      headerTitle="Advertisement"
      {...props}
    />
  );
};

export default AdsPage;
