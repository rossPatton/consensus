import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from '../../_types';
import {ExternalLink, PasswordInput} from '../../../../../../../components';
import {categories} from '../../../../../../../constants';

const EditProfile = memo((props: tComponentProps) => (
  <form
    id="form"
    className="row"
    onSubmit={props.onSubmit}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3 lh1">
          Edit your Profile
        </h1>
      </legend>
      <label htmlFor="avatarEmail">
        <h2 className="fs5 mB1 lh1">
          Change Group Logo
        </h2>
        <p className="fs5 copyBlack mB1">
          We use <ExternalLink noFollow to="https://www.libravatar.org">Libravatar</ExternalLink> for avatars. To connect your avatar, enter your Libravatar email below. It does not have to be the same as your Consensus email. We do not store this. Any changes you make to your avatar on Libravatar will be automatically reflected here.
        </p>
        <input
          autoComplete="nope"
          className="p3 mB3 row"
          onChange={ev => props.updateState('avatarEmail', ev)}
          placeholder="your_email_here@example.com"
          value={props.avatarEmail}
          name="avatarEmail"
        />
      </label>
      <h2 className="fs5 mB1 lh1">
        Change Category
      </h2>
      <select
        className="mB3 row"
        defaultValue={props.category}
        onBlur={ev => props.updateState('category', ev)}
        onChange={ev => props.updateState('category', ev)}>
        {categories.map(({display}) => (
          <option key={display} value={display}>
            {display}
          </option>
        ))}
      </select>
      <h2 className="fs5 mB1 lh1">
        Change Group Type
      </h2>
      <select
        className="row mB1"
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
      <small className="dBl mB3 copyBlack">
        This option only affects future membership approvals
      </small>
      <label className="row mB3" htmlFor="memberName">
        <h2 className="fs5 mB1 lh1">
          Change Membership Title
        </h2>
        <input
          onChange={ev => props.updateState('memberName', ev)}
          className="p3 row"
          placeholder="What are your members called?"
          value={props.memberName}
          name="memberName"
        />
      </label>
      <label className="row mB3" htmlFor="modName">
        <h2 className="fs5 mB1 lh1">
          Change Moderator Title
        </h2>
        <input
          onChange={ev => props.updateState('modName', ev)}
          className="p3 row"
          placeholder="What should moderators be called?"
          value={props.modName}
          name="modName"
        />
      </label>
      <h2 className="fs5 mB1 lh1">
        Change Description
      </h2>
      <textarea
        rows={6}
        spellCheck
        className="mB3 row fs5"
        placeholder="Organization Description Here"
        value={props.description}
        onChange={ev => props.updateState('description', ev)}
      />
      <label className="dBl mB3" htmlFor="website">
        <h2 className="fs5 mB1 lh1">
          Personal Website
        </h2>
        <input
          onChange={ev => props.updateState('website', ev)}
          className="p3 row"
          placeholder="Update your website here"
          value={props.website}
          name="website"
        />
      </label>
      <label className="dBl mB3" htmlFor="facebook">
        <h2 className="fs5 mB1 lh1">
          Facebook
        </h2>
        <input
          className="p3 row"
          name="facebook"
          onChange={ev => props.updateState('facebook', ev)}
          placeholder="Link your facebook profile here"
          value={props.facebook}
        />
      </label>
      <label className="dBl mB3" htmlFor="twitter">
        <h2 className="fs5 mB1 lh1">
          Twitter
        </h2>
        <input
          className="p3 row"
          name="twitter"
          onChange={ev => props.updateState('twitter', ev)}
          placeholder="Link your twitter here"
          value={props.twitter}
        />
      </label>
      <h2 className="fs5 mB1 lh1">
        Should the group be restricted to verified members only?
      </h2>
      <div
        tabIndex={0}
        role="button"
        className="fx aiCtr curPtr fs6 p1 mB5"
        onClick={ev => props.updateState('allowNonVerified', ev)}
        onKeyPress={ev => props.updateState('allowNonVerified', ev)}>
        <input
          readOnly
          type="checkbox"
          className="mR2"
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
      <div className="fx aiCtr">
        <button
          disabled={!props.password}
          className="p3 pL4 pR4 mR2 hvrBgGrey1 trans1">
          Save Changes
        </button>
        <Link
          to="/admin/profile"
          className="btn p3 pL4 pR4 hvrBgGrey1 trans1">
          Go back
        </Link>
      </div>
    </fieldset>
  </form>
));

export default EditProfile;
