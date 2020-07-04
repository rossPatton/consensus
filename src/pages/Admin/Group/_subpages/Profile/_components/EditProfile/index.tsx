import cx from 'classnames';
import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {FileUpload, Form} from '~app/components';
import {categories} from '~app/constants';

import {tComponentProps} from '../../_types';

const EditProfile = memo((props: tComponentProps) => (
  <Form
    className="w-full"
    error={props.error}
    name="editProfile"
    legend={(<h2 className="text-3 mb-2 leading-none">Edit your Profile</h2>)}
    onSubmit={props.onSubmit}
    renderFields={() => (
      <>
        <label className="w-full mb-2" htmlFor="memberName">
          <h3 className="text-base mb-1 leading-none">
            Email
          </h3>
          <input
            onChange={ev => props.updateState('email', ev)}
            className="p-2 w-full"
            maxLength={4096}
            placeholder={`Currently ${props.session.profile.email}`}
            value={props.email}
            name="email"
            type="email"
          />
        </label>
        <FileUpload
          fieldKey="groupAvatar"
          folder="groups"
          info="We recommend a size of at least 60x60px"
          prefix={`g${props.session.profile.id}:gAv`}
          title="Upload New Group Logo"
        />
        <h3 className="text-base mb-1 leading-none">
          Category
        </h3>
        <select
          className="mb-2 w-full"
          defaultValue={props.category}
          onBlur={ev => props.updateState('category', ev)}
          onChange={ev => props.updateState('category', ev)}>
          {categories.map(({display}) => (
            <option key={display} value={display}>
              {display}
            </option>
          ))}
        </select>
        <h3 className="text-base mb-1 leading-none">
          Group Type
        </h3>
        <select
          className="w-full"
          value={props.type}
          onBlur={ev => props.updateState('type', ev)}
          onChange={ev => props.updateState('type', ev)}>
          <option value="public">
            Public
          </option>
          <option value="private">
            Private
          </option>
          <option value="hidden">
            Hidden
          </option>
        </select>
        <small className="block mb-2 text-gray-5">
          This option only affects future membership approvals
        </small>
        <label className="w-full mb-2" htmlFor="memberName">
          <h3 className="text-base mb-1 leading-none">
            Membership Title
          </h3>
          <input
            onChange={ev => props.updateState('memberName', ev)}
            className="p-2 w-full"
            maxLength={90}
            placeholder="What are your members called?"
            value={props.memberName}
            name="memberName"
          />
        </label>
        <label className="w-full mb-2" htmlFor="modName">
          <h3 className="text-base mb-1 leading-none">
            Moderator Title
          </h3>
          <input
            onChange={ev => props.updateState('modName', ev)}
            className="p-2 w-full"
            maxLength={90}
            placeholder="What should moderators be called?"
            value={props.modName}
            name="modName"
          />
        </label>
        <h3 className="text-base mb-1 leading-none">
          Description
        </h3>
        <textarea
          rows={6}
          spellCheck
          maxLength={4096}
          className="mb-2 w-full text-base"
          placeholder="Group Description Here"
          value={props.description}
          onChange={ev => props.updateState('description', ev)}
        />
        <label className="block mb-2" htmlFor="website">
          <h3 className="text-base mb-1 leading-none">
            Personal Website
          </h3>
          <input
            onChange={ev => props.updateState('website', ev)}
            className="p-2 w-full"
            maxLength={4096}
            pattern="https://.*"
            placeholder="Link your website here"
            value={props.website}
            name="website"
            type="url"
          />
        </label>
        <label className="block mb-2" htmlFor="facebook">
          <h3 className="text-base mb-1 leading-none">
            Facebook
          </h3>
          <input
            className="p-2 w-full"
            name="facebook"
            maxLength={4096}
            pattern="https://facebook.com/.*"
            onChange={ev => props.updateState('facebook', ev)}
            placeholder="Link your facebook profile here"
            value={props.facebook}
            type="url"
          />
        </label>
        <label className="block mb-2" htmlFor="twitter">
          <h3 className="text-base mb-1 leading-none">
            Twitter
          </h3>
          <input
            className="p-2 w-full"
            name="twitter"
            maxLength={4096}
            pattern="https://twitter.com/.*"
            onChange={ev => props.updateState('twitter', ev)}
            placeholder="Link your twitter here"
            value={props.twitter}
            type="url"
          />
        </label>
      </>
    )}
    renderSubmit={formProps => (
      <div className="flex flex-col d:flex-row items-center">
        <button
          disabled={!formProps.hasMounted}
          className={cx({
            'p-2 pl-3 pr-3 mb-1 d:mb-0 d:mr-1 w-full d:w-auto': true,
            'bg-green-1 hover:bg-green-2': formProps.hasMounted,
          })}>
          Save Changes
        </button>
        <Link
          to="/admin/profile"
          className="btn p-2 pl-3 pr-3 hover:bg-gray-3 transition w-full d:w-auto">
          Go back
        </Link>
      </div>
    )}
  />
));

export default EditProfile;
