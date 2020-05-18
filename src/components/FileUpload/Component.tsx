import cx from 'classnames';
import React, {memo} from 'react';
import {v1} from 'uuid';

import {Emoji} from '~app/components';

import {tComponentProps} from './_types';

const baseUrl = 'https://consensus.nyc3.digitaloceanspaces.com';

export const FileUploadComponent = memo((props: tComponentProps) => (
  <>
    <h3 className="text-base mb-1">
      {props.title}
    </h3>
    <div
      id="imagePreview"
      className={cx({
        'animated bg-gray-1 p-3 mb-3 flex flex-col items-center': true,
        'fadeInDown': props.img,
        'hidden': !props.img,
      })}>
      <button
        type="button"
        onClick={props.removeImage}
        className="mb-2 p-2">
        <Emoji
          label="Close Emoji"
          emoji="✖️"
        />
        Remove Image
      </button>
      {props.img && (
        <img
          alt="Your uploaded file preview."
          height={props.width}
          width={props.width}
          src={`${baseUrl}/${props.folder}/${props.img}${__DEV__ ? `?v=${v1()}` : ''}`}
          className={cx({
            'rounded w-full': !props.fieldKey.includes('Avatar'),
            'rounded-circ': props.fieldKey.includes('Avatar'),
          })}
        />
      )}
    </div>
    <label
      htmlFor="fileUpload"
      className={cx({
        'fadeInDown bg-gray-1 border cursor-ptr flex flex-col items-center mb-3 p-3 rounded animated': true,
        'fadeInDown': !props.img,
        'hidden': props.img,
      })}>
      <input
        accept="image/png, image/jpeg, image/gif"
        id="fileUpload"
        name="eventFeaturedImage"
        onChange={props.setImage}
        type="file"
        className={cx({
          hidden: true,
        })}
      />
      <span className="btn flex items-center mb-1 p-1">
        <Emoji
          label="Picture (Camera) Emoji"
          emoji="📷"
        />
        Upload Your Image
      </span>
      {props.info && (
        <small>{props.info}</small>
      )}
    </label>
  </>
));
