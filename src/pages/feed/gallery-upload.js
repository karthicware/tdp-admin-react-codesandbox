import React from "react";
//import axios from "axios";
import fire from "../../fire";
import {
  sendPushNotificationToAll,
  sendPushNotification
} from "../../services/notification-service";

export default class GalleryUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      files: [],
      imagesPreviewUrls: [],
      albumTitle: "",
      remoteFiles: [],
      isNotificationRequire: true
    };
    this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.saveImageDetailsInDB = this.saveImageDetailsInDB.bind(this);
    this.convertThumbnailAndSaveInStorage = this.convertThumbnailAndSaveInStorage.bind(
      this
    );
    this.saveImageInStorage = this.saveImageInStorage.bind(this);
  }

  saveImageDetailsInDB(remoteFile) {
    //const _this = this;
    const { albumTitle } = this.state;
    const newPostKey = fire
      .database()
      .ref()
      .child(`gallery/album/${albumTitle}`)
      .push().key;

    var updates = {};
    updates[`/gallery/album/${albumTitle}/${newPostKey}`] =
      remoteFile.remoteUrl;
    updates[`/gallery/metadata/${albumTitle}/${newPostKey}`] = {
      thumbnail: remoteFile.thumbnailUrl,
      title: albumTitle
    };
    sendPushNotificationToAll("New album added");

    fire
      .database()
      .ref()
      .update(updates, function (error) {
        if (error) {
          alert(error);
        } else {
          alert("Data saved successfully!");
        }
      });
  }

  convertThumbnailAndSaveInStorage(remoteUrl, inputFile) {
    const _this = this;
    const { albumTitle, remoteFiles } = this.state;
    let remoteFile = { remoteUrl, fileName: inputFile.name };

    const fileName = inputFile.name;
    const reader = new FileReader();
    reader.readAsDataURL(inputFile);
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const elem = document.createElement("canvas");
        const width = 200;
        const scaleFactor = width / img.width;
        elem.width = width;
        elem.height = img.height * scaleFactor;
        const ctx = elem.getContext("2d");
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, img.height * scaleFactor);
        ctx.canvas.toBlob(
          blob => {
            const file = new File([blob], fileName, {
              type: "image/png",
              lastModified: Date.now()
            });
            const thumbnailFileRef = fire
              .storage()
              .ref(`gallery/${albumTitle}/thumbnail`)
              .child(file.name);
            thumbnailFileRef.put(file).then(snapshot =>
              thumbnailFileRef.getDownloadURL().then(url => {
                remoteFile.thumbnailUrl = url;
                remoteFiles.push(remoteFile);
                _this.saveImageDetailsInDB(remoteFile);
                _this.setState({ remoteFiles });
              })
            );
          },
          "image/jpeg",
          1
        );
      };
      reader.onerror = error => {
        console.log(error);
        remoteFiles.push(remoteFile);
        _this.saveImageDetailsInDB(remoteFile);
        _this.setState({ remoteFiles });
      };
    };
  }

  saveImageInStorage() {
    const _this = this;
    const { albumTitle, files } = this.state;
    files.forEach(file => {
      const storageRef = fire.storage().ref(`gallery/${albumTitle}`);
      const mainImage = storageRef.child(file.name);
      mainImage.put(file).then(snapshot =>
        mainImage.getDownloadURL().then(remoteUrl => {
          //remoteFile = { fileName: file.name, remoteUrl: url };
          _this.convertThumbnailAndSaveInStorage(remoteUrl, file);
        })
      );
    });
  }

  _handleSubmit(e) {
    //Sumbit handler
    e.preventDefault();
    //this.saveImageInStorage();
    sendPushNotificationToAll("New album added");

    sendPushNotification(
      "8754298377",
      "LOVE YOU PONDATI",
      "epdi love you sonnen parthaya"
    ).catch(function (error) {
      console.error(`_handleSubmit-error=${JSON.stringify(error)}`);
    });
  }

  _handleImageChange(e) {
    e.preventDefault();

    let files = Array.from(e.target.files);

    files.forEach(file => {
      let reader = new FileReader();
      reader.onloadend = () => {
        this.setState({
          files: [...this.state.files, file],
          imagesPreviewUrls: [...this.state.imagesPreviewUrls, reader.result]
        });
      };
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <div class="card">
        <div class="card-header">
        <h4 class="card-title">Gallery</h4>
  </div>
        <div class="card-body">


          <div className="col-12">
            <form onSubmit={this._handleSubmit}>
              <div className="form-group row">
                <div className="col-sm-3">
                  <label>Album Title</label>
                </div>
                <div className="col-sm-9">
                  <input
                    type="text"
                    className="form-control"
                    value={this.state.albumTitle}
                    onChange={e => this.setState({ albumTitle: e.target.value })}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-3">Push Notification (Y/N)</div>
                <div className="col-sm-9">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      onChange={e =>
                        this.setState({ isNotificationRequire: e.target.checked })
                      }
                      checked={this.state.isNotificationRequire}
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-3">
                  <label>Choose Files</label>
                </div>
                <div className="col-sm-9">
                  <div className="custom-file">
                    <input
                      type="file"
                      className="custom-file-input"
                      id="customFile"
                      onChange={this._handleImageChange}
                      multiple
                      accept="image/*"
                    />
                    <label className="custom-file-label" for="customFile">
                      {this.state.imagesPreviewUrls.length > 0
                        ? "No.of choosed files: " +
                        this.state.imagesPreviewUrls.length
                        : "Choose files"}
                    </label>
                  </div>
                </div>
              </div>

              
              {this.state.imagesPreviewUrls.map(imagePreviewUrl => {
                return (
                  <img
                    key={imagePreviewUrl}
                    alt="previewImg"
                    src={imagePreviewUrl}
                    style={{ width: "100px", height: "100px" }}
                  />
                );
              })}
            </form>
          </div>
          </div>
          <div class="card-footer text-muted">
          <div className="row">
                <div className="col-md-12">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={this._handleSubmit}
                  >
                    <i className="fa fa-upload" />
                    Upload
              </button>
                </div>
              </div>
  </div>
          </div>
    );
  }
}
