import React, { useState } from "react";
import { Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import GalleryUpload from "./gallery-upload";
import GalleryManage from "./gallery-manage";
import Paperbase from "../../layout/dashboard/Paperbase";

const GalleryRoute = ({ match }) => {
  //console.log(`match=${JSON.stringify(match)}`);
  return (
    <Paper>
      <Route path={`${match.url}/upload`} component={GalleryUpload} />
      <Route path={`${match.url}/manage`} component={GalleryManage} />
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
          props.history.push("/gallery/upload");
          setActive(0);
        }}
      />
      <Tab
        textColor="inherit"
        label="Manage Existing"
        onClick={() => {
          props.history.push("/gallery/manage");
          setActive(1);
        }}
      />
    </Tabs>
  );
};

const GalleryPage = props => {
  //console.log(`props=${JSON.stringify(props)}`);
  return (
    <Paperbase
      headerTabs={<HeaderTab {...props} />}
      content={<GalleryRoute {...props} />}
      headerTitle="Gallery"
    />
  );
};

export default GalleryPage;
