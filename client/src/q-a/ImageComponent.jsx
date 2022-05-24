import React from "react";

export default class ImageComponent extends React.Component {
  constructor(props){
    super(props)
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
      <div style={{display:'inline-block', marginLeft: 10 + 'px'}} >
        <img
          style={{width:90 +'px'}}
          className="small"
          src={this.props.photo}
          onClick={this.handleShowDialog}
          alt="no image"
        />
        {this.state.isOpen && (
          <dialog
            className="dialog"
            style={{ position: "absolute", top:5 + '%', right:50 + '%'}}
            open
            onClick={this.handleShowDialog}
          >
            <img
              style={{width:600 +'px'}}
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
