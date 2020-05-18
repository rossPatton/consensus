import _ from 'lodash';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {v4} from 'uuid';

import {tContainerProps} from './_types';
import {postFeaturedImage} from '~app/redux';
import {success as postFeaturedImageSuccess} from '~app/redux/featuredImage/post/actions'
import {FileUploadComponent} from './Component';

/**
 * @description A Component for uploading files to the consensus DO spaces account
 * must be used as part of a form with multi-part encoding
 */
class FileUploadContainer extends PureComponent<tContainerProps> {
  static defaultProps = {
    folder: 'groups' as 'groups' | 'users',
    hash: v4(),
    info: 'We recommend a size of at least 760x428px',
    prefix: '',
    title: 'Upload Image',
    width: '60',
  };

  removeImage = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    postFeaturedImageSuccess({img: ''});
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

    return this.props.postFeaturedImageDispatch(body);
  }

  render() {
    console.log('all file upload props => ', this.props);
    return (
      <FileUploadComponent
        fieldKey={this.props.fieldKey}
        folder={this.props.folder}
        img={this.props.img}
        info={this.props.info}
        title={this.props.title}
        removeImage={this.removeImage}
        setImage={this.setImage}
        width={this.props.width}
      />
    );
  }
}

const mapStateToProps = (store: any) => ({
  img: store.featuredImage.data?.img,
});

const mapDispatchToProps = (dispatch: Function) => ({
  postFeaturedImageDispatch: (query: ts.spacesQuery) => dispatch(postFeaturedImage(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FileUploadContainer);
