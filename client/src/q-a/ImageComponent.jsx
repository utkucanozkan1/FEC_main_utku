import React from "react";

export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleShowDialog = this.handleShowDialog.bind(this)
  }

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });

  };

  render() {
    console.log(this.props);
    return (
      <div style={{display:'inline-block', marginLeft: 10 + 'px'}} >
        <img
          className="small"
          src={this.props.photo}
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
              src={this.props.photo}
              onClick={this.handleShowDialog}
              alt="no image"
            />
          </dialog>
        )}
      </div>
    );
  }
}
