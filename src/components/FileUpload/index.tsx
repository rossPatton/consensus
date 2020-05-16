import _ from 'lodash';
import loglevel from 'loglevel';
import React, { PureComponent } from 'react';
// import { connect } from 'react-redux';
import {v4} from 'uuid';

import {tProps, tState} from './_types';
import {FileUploadComponent} from './Component';

/**
 * @description A Component for uploading files to the consensus DO spaces account
 * must be used as part of a form with multi-part encoding
 */
class FileUploadContainer extends PureComponent<tProps, tState> {
  static defaultProps = {
    folder: 'groups' as 'groups' | 'users',
    hash: v4(),
    info: 'We recommend a size of at least 760x428px',
    prefix: '',
    title: 'Upload Image',
    width: '60',
  };

  state = {
    image: null as string | null,
  };

  removeImage = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    this.setState({
      image: null,
    });
  }

  setImage = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    ev.preventDefault();

    const regexExt = /[^\\]*\.(\w+)$/;
    let image = `${this.props.prefix}:${this.props.hash}`;
    let ext = 'jpg';

    const body = new FormData();
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput !== null) {
      const { files }: { files: FileList | null } = fileInput;
      if (files !== null) {
        ext = files[0].name.match(regexExt)[1];
        image = `${image}.${ext}`;
        body.append(this.props.fieldKey, files[0], image);
      }
    }

    // upload image to fileserver, resize, etc if we have one
    // TODO this should go through redux probably
    try {
      await fetch('/api/v1/spaces', {method: 'post', body});
      console.log('image => ', image);
      setTimeout(() => this.setState({image}), 1000);
    } catch (err) {
      loglevel.error(`failed to upload ${this.props.fieldKey}`);
    }
  }

  render() {
    return (
      <FileUploadComponent
        fieldKey={this.props.fieldKey}
        folder={this.props.folder}
        image={this.state.image}
        info={this.props.info}
        title={this.props.title}
        removeImage={this.removeImage}
        setImage={this.setImage}
        width={this.props.width}
      />
    );
  }
}

export default FileUploadContainer;
