import React, { Component } from "react";
import fire from "../fire";

function uploadImages(albumTitle, file) {
  //let remoteFileLocation = "";
  const storageRef = fire.storage().ref(`gallery/${albumTitle}`);
  const mainImage = storageRef.child(file.name);
  // mainImage
  //   .put(file)
  //   .then(snapshot =>
  //     mainImage.getDownloadURL().then(url => (remoteFileLocation = url))
  //   );
  // return remoteFileLocation;
  return mainImage.put(file);
}
