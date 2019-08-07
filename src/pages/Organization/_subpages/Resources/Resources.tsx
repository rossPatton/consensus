import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Resources = memo(() => (
  <>
    <div className="contain ffLab pB4 mB5 pT3">
      <ul className="lsNone brdA1 bgGrey1 mB5">
        <li className="p3 brdBlue brdT1 brdW2 fx black m0">
          Logged in as<Link className="mL1 mR1" to="">Ross Patton</Link>
          who is a<Link className="mL1 mR1" to="">Member</Link>
          viewing 176 total files in 4 buckets
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Social Media</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6">12 files</span>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Print Materials & Handouts</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6">5 files</span>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="/internal">
            Internal Documents & Notes
          </Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6">64 files</span>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Swag</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6">17 files</span>
          </div>
        </li>
      </ul>
    </div>
    <footer className="bgBlue white pT5 pB5">
      <div className="contain">
        @copyright etc
      </div>
    </footer>
  </>
));
