// import cx from 'classnames';
import React, {FunctionComponent, memo} from 'react';
import ReactDOM from 'react-dom';
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from 'react-share';

import {Emoji} from '~app/components';

import {tProps} from './_types';

/**
 * @description portal half of ShareButton. renders on click
*/
const SharePortal: FunctionComponent<tProps> = memo(props => {
  const portalNode = document.getElementById('portal');

  return ReactDOM.createPortal(
    <aside className="animated fadeInUp b fixed flex flex-col items-center l p-4 r t-hdr">
      <div className="relative bg-white border font-semibold p-3 rounded z-10">
        <button
          className="border-0"
          onClick={props.onClick}>
          <Emoji
            className="absolute t r p-2 text-3"
            label="Close Modal"
            emoji="✖️"
          />
        </button>
        <div className="font-bold text-3 mb-1">
          Share this meeting
        </div>
        <ul>
          <li className="mb-1">
            <EmailShareButton
              children={(
                <div className="flex items-center">
                  <span className="mr-1">
                    <EmailIcon size={24} round />
                  </span>
                  Email
                </div>
              )}
              url={window.location.href}
            />
          </li>
          <li className="mb-1">
            <FacebookShareButton
              children={(
                <div className="flex items-center">
                  <span className="mr-1">
                    <FacebookIcon size={24} round />
                  </span>
                  Facebook
                </div>
              )}
              url={window.location.href}
            />
          </li>
          <li className="mb-1">
            <TelegramShareButton
              children={(
                <div className="flex items-center">
                  <span className="mr-1">
                    <TelegramIcon size={24} round />
                  </span>
                  Telegram
                </div>
              )}
              url={window.location.href}
            />
          </li>
          <li className="mb-1">
            <TumblrShareButton
              children={(
                <div className="flex items-center">
                  <span className="mr-1">
                    <TumblrIcon size={24} round />
                  </span>
                  Tumblr
                </div>
              )}
              url={window.location.href}
            />
          </li>
          <li className="mb-1">
            <TwitterShareButton
              children={(
                <div className="flex items-center">
                  <span className="mr-1">
                    <TwitterIcon size={24} round />
                  </span>
                  Twitter
                </div>
              )}
              url={window.location.href}
            />
          </li>
          <li className="mb-1">
            <WhatsappShareButton
              children={(
                <div className="flex items-center">
                  <span className="mr-1">
                    <WhatsappIcon size={24} round />
                  </span>
                  Whatsapp
                </div>
              )}
              url={window.location.href}
            />
          </li>
        </ul>
      </div>
      <div
        role="button"
        tabIndex={0}
        className="absolute b bg-gray-1 l opacity-5 r t"
        onKeyPress={props.onClick}
        onClick={props.onClick}
      />
    </aside>,
    portalNode,
  );
});

export default SharePortal;
