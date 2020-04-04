import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';
import {ExternalLink, PasswordInput} from '../../../../../../../components';
import {categories} from '../../../../../../../constants';

const EditProfile = memo((props: tComponentProps) => (
  <form
    id="form"
    className="w-full"
    onSubmit={props.onSubmit}>
    <fieldset>
      <legend>
        <h1 className="fs3 mb-2 leading-none">
          Edit your Profile
        </h1>
      </legend>
      <label htmlFor="avatarEmail">
        <h2 className="text-base mb-1 leading-none">
          Change Group Logo
        </h2>
        <p className="text-base copyBlack mb-1">
          We use <ExternalLink noFollow to="https://www.libravatar.org">Libravatar</ExternalLink> for avatars. To connect your avatar, enter your Libravatar email below. It does not have to be the same as your Consensus email. We do not store this. Any changes you make to your avatar on Libravatar will be automatically reflected here.
        </p>
        <input
          autoComplete="nope"
          className="p-2 mb-2 w-full"
          onChange={ev => props.updateState('avatarEmail', ev)}
          placeholder="your_email_here@example.com"
          value={props.avatarEmail}
          name="avatarEmail"
        />
      </label>
      <h2 className="text-base mb-1 leading-none">
        Change Category
      </h2>
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
      <h2 className="text-base mb-1 leading-none">
        Change Group Type
      </h2>
      <select
        className="w-full mb-1"
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
      <small className="block mb-2 copyBlack">
        This option only affects future membership approvals
      </small>
      <label className="w-full mb-2" htmlFor="memberName">
        <h2 className="text-base mb-1 leading-none">
          Change Membership Title
        </h2>
        <input
          onChange={ev => props.updateState('memberName', ev)}
          className="p-2 w-full"
          placeholder="What are your members called?"
          value={props.memberName}
          name="memberName"
        />
      </label>
      <label className="w-full mb-2" htmlFor="modName">
        <h2 className="text-base mb-1 leading-none">
          Change Moderator Title
        </h2>
        <input
          onChange={ev => props.updateState('modName', ev)}
          className="p-2 w-full"
          placeholder="What should moderators be called?"
          value={props.modName}
          name="modName"
        />
      </label>
      <h2 className="text-base mb-1 leading-none">
        Change Description
      </h2>
      <textarea
        rows={6}
        spellCheck
        className="mb-2 w-full text-base"
        placeholder="Organization Description Here"
        value={props.description}
        onChange={ev => props.updateState('description', ev)}
      />
      <label className="block mb-2" htmlFor="website">
        <h2 className="text-base mb-1 leading-none">
          Personal Website
        </h2>
        <input
          onChange={ev => props.updateState('website', ev)}
          className="p-2 w-full"
          placeholder="Update your website here"
          value={props.website}
          name="website"
        />
      </label>
      <label className="block mb-2" htmlFor="facebook">
        <h2 className="text-base mb-1 leading-none">
          Facebook
        </h2>
        <input
          className="p-2 w-full"
          name="facebook"
          onChange={ev => props.updateState('facebook', ev)}
          placeholder="Link your facebook profile here"
          value={props.facebook}
        />
      </label>
      <label className="block mb-2" htmlFor="twitter">
        <h2 className="text-base mb-1 leading-none">
          Twitter
        </h2>
        <input
          className="p-2 w-full"
          name="twitter"
          onChange={ev => props.updateState('twitter', ev)}
          placeholder="Link your twitter here"
          value={props.twitter}
        />
      </label>
      <h2 className="text-base mb-1 leading-none">
        Should the group be restricted to verified members only?
      </h2>
      <div
        tabIndex={0}
        role="button"
        className="flex flex-col d:flex-row items-center curPtr text-sm p-1 mB5"
        onClick={ev => props.updateState('allowNonVerified', ev)}
        onKeyPress={ev => props.updateState('allowNonVerified', ev)}>
        <input
          readOnly
          type="checkbox"
          className="mr-2"
          autoComplete="nope"
          checked={!props.allowNonVerified}
        />
        <span>
          {props.allowNonVerified && (
            'Anyone can join this group, regardless of verification status.'
          )}
          {!props.allowNonVerified && (
            'Membership is limited to only verified accounts.'
          )}
        </span>
      </div>
      <PasswordInput
        id="pwInput"
        title="Current Password"
        password={props.password}
        placeholder="Your current password"
        onChange={ev => props.updateState('password', ev)}
      />
      <div className="flex flex-col d:flex-row items-center">
        <button
          disabled={!props.password}
          className="p-2 pl-3 pr-3 mr-2 hover:bg-gray-1 transition">
          Save Changes
        </button>
        <Link
          to="/admin/profile"
          className="btn p-2 pl-3 pr-3 hover:bg-gray-1 transition">
          Go back
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EditProfile;
