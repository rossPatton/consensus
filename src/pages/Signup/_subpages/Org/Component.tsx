import _ from 'lodash';
import React, {memo} from 'react';

import {PasswordInput} from '../../../../components';
import {tComponentProps} from './_types';

export const OrgSignupComponent = memo((props: tComponentProps) => (
  <form
    method="POST"
    name="orgSignupForm"
    autoComplete="off"
    action="/api/v1/org"
    className="row p4 brdA1 br8"
    onSubmit={props.onSubmit}>
    <fieldset>
      <legend>
        <h2 className="mB4">New Organization</h2>
      </legend>
      <h2 className="ffLab fs5 mB1 lh1">
        Organization Email
      </h2>
      <label htmlFor="emailInput" className="mB3">
        <p className="fs5 copyBlack mB1">
          Email required for verification + account recovery.
        </p>
        <input
          required
          id="emailInput"
          name="email"
          className="row"
          onChange={ev => props.updateState('email', ev)}
          placeholder="Your organization's email here"
          value={props.email}
        />
      </label>
      <h2 className="ffLab fs5 mB1 lh1">
        Organization Login
      </h2>
      <label htmlFor="loginInput" className="mB3">
        <p className="fs5 copyBlack mB1">
          Secret login name, only used for logging in. Kept private.
        </p>
        <input
          required
          id="loginInput"
          name="login"
          className="row"
          onChange={ev => props.updateState('login', ev)}
          placeholder="YourSecretOrgLoginHere"
          value={props.login}
        />
      </label>
      <PasswordInput
        required
        newPassword
        id="password"
        title="Organization Password"
        onChange={ev => props.updateState('password', ev)}
        placeholder="Your organization's password here"
        password={props.password as string}
      />
      <h2 className="ffLab fs5 mB1 lh1">
        Organization Name
      </h2>
      <label htmlFor="nameInput" className="mB3">
        <p className="fs5 copyBlack mB1">
          How your organization will get seen in the directory. Is searchable. Determines organization url. Should be unique.
        </p>
        <input
          required
          id="nameInput"
          name="name"
          className="row"
          onChange={ev => props.updateState('name', ev)}
          placeholder="Your organization name here"
          value={props.name}
        />
      </label>
      <h2 className="ffLab fs5 mB1 lh1">
        Organization State
      </h2>
      <label htmlFor="stateInput" className="mB3">
        <p className="fs5 copyBlack mB1">
          All organizations on Consensus are currently local, city-based organizations. Both State and City is required here. International, National, and State/Region based organizations are in the works.
        </p>
        <input
          required
          id="stateInput"
          name="state"
          className="row"
          onChange={ev => props.updateState('region', ev)}
          placeholder="The state your organization is located in"
          value={props.region}
        />
      </label>
      <h2 className="ffLab fs5 mB1 lh1">
        Organization City
      </h2>
      <label htmlFor="cityInput" className="mB3">
        <p className="fs5 copyBlack mB1">
          All organizations on Consensus are currently local, city-based organizations. Both State and City is required here. International, National, and State/Region based organizations are in the works.
        </p>
        <input
          required
          id="cityInput"
          name="city"
          className="row"
          onChange={ev => props.updateState('city', ev)}
          placeholder="The city your organization is located in"
          value={props.city}
        />
      </label>
      <h2 className="ffLab fs5 mB1 lh1">
        Organization Category
      </h2>
      <label htmlFor="categoryInput" className="mB3">
        <p className="fs5 copyBlack mB1">
          Tag your organization using an existing category. Not required but makes it easier for people to find your organization.
        </p>
        <input
          id="categoryInput"
          className="row"
          name="category"
          onChange={ev => props.updateState('category', ev)}
          placeholder="Your organization category here"
          value={props.category}
        />
      </label>
      <h2 className="ffLab fs5 mB1 lh1">
        Organization Description
      </h2>
      <label htmlFor="categoryInput" className="mB3">
        <p className="fs5 copyBlack mB1">
          What&apos;s your organization about? Let people know here.
        </p>
        <textarea
          rows={6}
          spellCheck
          className="row fs5"
          placeholder="Organization Description Here"
          value={props.description}
          onChange={ev => props.updateState('description', ev)}
        />
      </label>
      <h2 className="ffLab fs5 mB1 lh1">
        Membership Vetting Process
      </h2>
      <label htmlFor="gateSelect" className="mB3">
        <p className="fs5 copyBlack mB1">
          Is anyone free to join your org, or do you want to be able to vet membership?
        </p>
        <select
          name="gate"
          id="gateSelect"
          className="row"
          value={props.gate}
          onBlur={ev => props.updateState('gate', ev)}
          onChange={ev => props.updateState('gate', ev)}>
          <option value="manual">
            Manual, new members must be approved
          </option>
          <option value="public">
            Public, no vetting process at all
          </option>
          <option value="private">
            Private, invite only
          </option>
        </select>
      </label>
      <h2 className="ffLab fs5 mB1 lh1">
        Event privacy defaults
      </h2>
      <label htmlFor="eventPrivacySelect" className="mB3">
        <p className="fs5 copyBlack mB1">
          When events are created, are they public or private by default?
        </p>
        <select
          id="eventPrivacySelect"
          name="eventPrivacy"
          className="mB4 row"
          value={props.eventPrivacy}
          onBlur={ev => props.updateState('eventPrivacy', ev)}
          onChange={ev => props.updateState('eventPrivacy', ev)}>
          <option value="manual">
            Manual, event privacy can be changed per event
          </option>
          <option value="public">
            Public, all events are public
          </option>
          <option value="private">
            Private, all events are private
          </option>
        </select>
      </label>
      <div className="brdT1 pT4 pB4 mT4 fx aiCtr">
        <button className="p3 pL4 pR4 hvrBgGrey1 trans1">
          Save
        </button>
      </div>
    </fieldset>
  </form>
));
