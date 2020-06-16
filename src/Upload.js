import React, { Component } from "react";
import storage from "./storage";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
//import { NavLink } from "react-router-dom";
class ImageUpload extends Component {
    
    
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: "",
      progress: 0
    };
  }

  handleChange = e => {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      this.setState(() => ({ image }));
    }
  };

  handleUpload = () => {
    
    const { image } = this.state;
    const uploadTask= storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
      },
      error => {
        // Error function ...
        console.log(error);
      },
      () => {
        // complete function ...
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url => {
            this.setState({ url });
          });
      }
    );
  };
  render() {
    
    return (
      <div className="center" >
          <br/>
          <h2 className="green-text">Image Uploader</h2>
          <br/>
          <br/>
        <div className="row">
          <progress value={this.state.progress} max="100" className="progress" />
        </div>
        <br />
        <br />
        <br />
        <div className="file-field input-field">
          <div className="btn">
            
            <input type="file" onChange={this.handleChange} />
          </div>
          <div className="file-path-wrapper">
            
          </div>
        </div>
        <br/>
        <br/>
        <Button
        onClick={this.handleUpload}
        className="waves-effect waves-light btn"
        variant="contained"
        color="default"
        //className={classes.button}
        startIcon={<CloudUploadIcon />}
      >
        upload
      </Button>
       
        <br />
        <br />
        <div id="image">

        <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="500"
          width="500"
        />
        </div>

      </div>
    );
  }
}

export default ImageUpload;