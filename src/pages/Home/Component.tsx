import React, {memo} from 'react';
import {Link} from 'react-router-dom';

import {tComponentProps} from './_types';

export const HomeComponent = memo((props: tComponentProps) => (
  <>
    <header className="bxSh1 brdB1 pT5 pB5">
      <div className="contain taCtr">
        <h1 className="mB3 pB1">
          Consensus is an events platform<br />for activists and community groups.
        </h1>
        {/* <h2 className="mB3">
          A platform for community groups, organizers, unions, activists, and anyone seeking an ethical, private platform to organize their peers.
        </h2> */}
        <Link
          className="br4 brdA1 dInBl p2 fs5 fw600 noUnderline"
          to={props.isLoading
            ? '/directory/us/'
            : `/directory/us/${props.geo.state}/${props.geo.handle}`}>
            Join a group {props.isLoading
            ? 'near you'
            : `in ${props.geo.city}`}
        </Link>
      </div>
    </header>
    <section className="brdB1 bgGrey1 pT4 pB4">
      <div className="contain fx jcCtr">
        <span className="btn br8 p2 pL3 pR3 mR2">
          Make decisions
        </span>
        <span className="btn br8 p2 pL3 pR3 mR2">
          Make events
        </span>
        <span className="btn br8 p2 pL3 pR3 mR2">
          Screen new members
        </span>
        <span className="btn br8 p2 pL3 pR3">
          RSVP - privately
        </span>
      </div>
    </section>
    <section className="contain pT5 pB5">
      <h3 className="fs2 taCtr mB3">
        Make decisions collectively:
      </h3>
    </section>
    <section className="contain pT5 pB5">
      <h3 className="fs2 taCtr mB3">
        Share events - and restrict who sees them
      </h3>
    </section>
    <section className="contain pT5 pB5">
      <h3 className="fs2 taCtr mB3">
        Screen membership
      </h3>
    </section>
    <section className="contain pT5 pB5">
      <h3 className="fs2 taCtr mB3">
        Do it all – privately
      </h3>
    </section>
    <section className="contain pT5 pB5">
      <h3 className="fs2 taCtr mB3">
        Find a group near you:
      </h3>
    </section>
    <section className="contain pT5 pB5">
      <h3 className="fs2 taCtr mB3">
        Find an event near you:
      </h3>
    </section>
    <section className="contain pT5 pB5">
      <h3 className="fs2 taCtr mB3">
        Or search by category:
      </h3>
    </section>
    <section className="pT5 contain">
      <h3 className="fs2 taCtr mB3">
        How Consensus Works
      </h3>
      <div className="fx aiCtr jcBetween">
        <div className="col row mR2">
          <h3 className="ffLab">
            As a user:
          </h3>
          <p>
            Find an issue you&apos;re interested in, and join a group near you!
          </p>
          <Link
            to="/signup/newUser"
            className="btn fs4 p3 pL4 pR4 mR3 hvrBgGrey1 trans1">
            Sign up
          </Link>
        </div>
        <div className="col row mL2">
          <h3 className="ffLab">
            As an organization:
          </h3>
          <p>
            Find an issue you&apos;re interested in, and join a group near you!
          </p>
          <Link
            to="/signup/newOrg"
            className="btn fs4 p3 pL4 pR4 mR3 hvrBgGrey1 trans1">
            Create an organization
          </Link>
        </div>
      </div>
    </section>
  </>
));
