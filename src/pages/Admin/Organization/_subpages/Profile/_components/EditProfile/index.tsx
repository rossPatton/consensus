import _ from 'lodash';
import React, {memo} from 'react';

import {tComponentProps} from '../../_types';
import {PasswordInput} from '../../../../../../../components';
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
      <h2 className="fs5 mB1 lh1">
        Category
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
        Description
      </h2>
      <textarea
        rows={6}
        spellCheck
        className="mB3 row fs5"
        placeholder="Organization Description Here"
        value={props.description}
        onChange={ev => props.updateState('description', ev)}
      />
      <h2 className="fs5 mB1 lh1">
        Group Type
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
      <label className="row mB3" htmlFor="email">
        <h2 className="fs5 mB1 lh1">
          Email address
        </h2>
        <p className="fs5 copyBlack mB1">
          Used for account verification, and so group members can contact you
        </p>
        <input
          onChange={ev => props.updateState('email', ev)}
          className="p3 row"
          placeholder="Update your email here"
          value={props.email}
          name="email"
        />
      </label>
      <label className="row mB3" htmlFor="memberName">
        <h2 className="fs5 mB1 lh1">
          Membership Title
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
          Moderator Title
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
        Should the group be restricted to verified members only?
      </h2>
      <div
        tabIndex={0}
        role="button"
        className="fx aiCtr curPtr fs6 p1 mB3"
        onClick={ev => props.updateState('allowNonVerified', ev)}
        onKeyPress={ev => props.updateState('allowNonVerified', ev)}>
        <input
          readOnly
          type="checkbox"
          className="mR2"
          autoComplete="nope"
          checked={props.allowNonVerified}
        />
        <span>
          {props.allowNonVerified && (
            'Anyone can join this group, regardless of verification status.'
          )}
          {!props.allowNonVerified && (
            'Memberships is limited to only verified accounts.'
          )}
        </span>
      </div>
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
      <label className="dBl mB5" htmlFor="twitter">
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
        <button
          onClick={props.toggleLock}
          className="p3 pL4 pR4 hvrBgGrey1 trans1">
          Go back
        </button>
      </div>
    </fieldset>
  </form>
));

export default EditProfile;
