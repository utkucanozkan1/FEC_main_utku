/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Modal , FormContainer} from './q&a-styled-components/q&aSectionContainerStyle';
export default class ImageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false };
    this.handleShowDialog = this.handleShowDialog.bind(this);
  }

  handleShowDialog = () => {
    this.setState({ isOpen: !this.state.isOpen });
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
            <div className="modal-div">
              <div className="container-div">
              <img
              className="image"
              src={this.props.photo.url}
              onClick={this.handleShowDialog}
              alt="no image"
            />
              </div>
            </div>
          </dialog>
        )}
      </div>
    );
  }
}
