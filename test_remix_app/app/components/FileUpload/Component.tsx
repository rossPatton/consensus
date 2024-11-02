import { cn } from '~/utils';
import { memo } from 'react';
import { v1 } from 'uuid';
import { Emoji } from '~/components';
import { spacesUrl } from '~/constants';

import { tComponentProps } from './_types';

export const FileUploadComponent = memo((props: tComponentProps) => (
  <>
    <h3 className="text-base mb-1">
      {props.title}
    </h3>
    <div
      id="imagePreview"
      className={cn('animated bg-gray-1 p-3 mb-3 flex flex-col items-center', {
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
          width={props.width}
          src={`${spacesUrl}/${props.folder}/${props.img}?v=${v1()}`}
          className={cn({
            rounded: true,
            'w-full': !props.fieldKey.includes('Avatar'),
          })}
        />
      )}
    </div>
    <label
      htmlFor="fileUpload"
      className={cn('fadeInDown bg-gray-1 border cursor-ptr flex flex-col items-center mb-3 p-3 animated', {
        'fadeInDown': !props.img,
        'hidden': props.img,
      })}>
      <input
        accept="image/png, image/jpeg, image/gif"
        id="fileUpload"
        name="eventFeaturedImage"
        onChange={props.setImage}
        type="file"
        className={cn({
          hidden: true,
        })}
      />
      <span className="btn flex items-center mb-1 p-1">
        <Emoji
          className="mr-1"
          label="Picture (Camera) Emoji"
          emoji="📷"
        />
        Upload your image
      </span>
      {props.info && (
        <small>{props.info}</small>
      )}
    </label>
  </>
));
