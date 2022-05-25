import React from "react";

export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleShowDialog = this.handleShowDialog.bind(this)
  }

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
    // console.log("clicked");

  };

  render() {
    // console.log(this.props);
    return (
      <div className="image-component">
        <img
          className="small"
          src={this.props.photo.url}
          onClick={this.handleShowDialog}
          alt="no image"
        />
        {this.state.isOpen && (
          <dialog
            className="dialog"
            open
            onClick={this.handleShowDialog}
          >
            <img
              className="image"
              src={this.props.photo.url}
              onClick={this.handleShowDialog}
              alt="no image"
            />
          </dialog>
        )}
      </div>
    );
  }
}
