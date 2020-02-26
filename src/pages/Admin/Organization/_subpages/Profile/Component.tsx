import _ from 'lodash';
import React, {memo} from 'react';

import {PasswordInput} from '../../../../../components';
import {categories} from '../../../../../constants';
import {tComponentProps} from './_types';

export const ProfileComponent = memo((props: tComponentProps) => (
  <form
    id="form"
    className="row"
    onSubmit={props.onSubmit}>
    <fieldset>
      <legend>
        <h1 className="fs3 mB3">
          Edit your Profile
        </h1>
      </legend>
      <h2 className="ffLab fs5 mB1 lh1">
        Name
      </h2>
      <div className="mB4">
        {props.name}
      </div>
      <h2 className="ffLab fs5 mB1 lh1">
        Category
      </h2>
      <select
        className="mB4 row"
        defaultValue={props.category}
        onBlur={ev => props.updateState('category', ev)}
        onChange={ev => props.updateState('category', ev)}>
        {categories.map(({display}) => (
          <option key={display} value={display}>
            {display}
          </option>
        ))}
      </select>
      <h2 className="ffLab fs5 mB1 lh1">
        Description
      </h2>
      <textarea
        rows={6}
        spellCheck
        className="mB4 row fs5"
        placeholder="Organization Description Here"
        value={props.description}
        onChange={ev => props.updateState('description', ev)}
      />
      <h2 className="ffLab fs5 mB1 lh1">
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
      <small className="dBl mB4 copyBlack">
        This option only affects future membership approvals
      </small>
      <label className="row mB4" htmlFor="email">
        <h2 className="ffLab fs5 mB1 lh1">
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
      <label className="dBl mB4" htmlFor="website">
        <h2 className="ffLab fs5 mB1 lh1">
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
      <label className="dBl mB4" htmlFor="facebook">
        <h2 className="ffLab fs5 mB1 lh1">
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
        <h2 className="ffLab fs5 mB1 lh1">
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
      <button
        disabled={!props.password}
        className="p3 pL4 pR4 hvrBgGrey1 trans1">
        Save Changes
      </button>
    </fieldset>
  </form>
));
