import React, { useState } from "react";
import { Route } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";

import NewsUpload from "./news-upload";
import NewsManage from "./news-manage";
import Paperbase from "../../layout/dashboard/Paperbase";

const NewsRoute = ({ match }) => {
  //console.log(`match=${JSON.stringify(match)}`);
  return (
    <>
      <Route exact path={`${match.url}`} component={NewsUpload} />
      <Route path={`${match.url}/manage`} component={NewsManage} />
    </>
  );
};

const HeaderTab = props => {
  const [active, setActive] = useState(0);
  return (
    <Tabs value={active} textColor="inherit">
      <Tab
        textColor="inherit"
        label="Upload News"
        onClick={() => {
          props.history.push("/news");
          setActive(0);
        }}
      />
      <Tab
        textColor="inherit"
        label="Manage Existing"
        onClick={() => {
          props.history.push("/news/manage");
          setActive(1);
        }}
      />
    </Tabs>
  );
};

const NewsPage = props => {
  console.log(`NewsPage props=${JSON.stringify(props)}`);
  return (
    <Paperbase
      headerTabs={<HeaderTab {...props} />}
      content={<NewsRoute {...props} />}
      headerTitle="News"
      {...props}
    />
  );
};

export default NewsPage;
