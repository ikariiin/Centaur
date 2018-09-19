import React from 'react';
import DeleteIcon from "@material-ui/icons/DeleteOutline";

export class ImagePreviewBar extends React.Component {
  render() {
    return (
      <section className="image-preview-bar">
        {this.props.base64Images.map((imageStr) => (
          <div className="image-preview" style={{ backgroundImage: `url(${imageStr.base64})` }} key={imageStr.id}>
            <div className="delete-overlay" onClick={() => this.props.removeImage(imageStr.id)}>
              <section style={{ textAlign: 'center' }}>
                <DeleteIcon style={{ fontSize: '.8rem' }} />
                <br />
                Remove this image from upload
              </section>
            </div>
          </div>
        ))}
      </section>
    );
  }
}