import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Forum = memo(() => (
  <>
    <div className="contain ffLab pB4 pT3 mB4">
      <ul className="lsNone brdA1 bgGrey1">
        <li className="p3 brdBlue brdT1 brdW2 fx black m0">
          Posting as <Link className="mL1 mR1" to="">Ross Patton</Link> who is a <Link className="mL1" to="">Member</Link>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">General Discussion</Link>
          <div>
            <span className="bgGrey2 br4 p2 mR3 fs6">800 members watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Watch this board</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Cooperatives</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Union Activism</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Direct Action</Link>
          <div>
            <span className="bgGrey2 br4 p2 mR3 fs6">1,500 members watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Watch this board</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Forced Arbitration and other contract issues</Link>
          <div>
            <span className="bgGrey2 br4 p2 mR3 fs6">1,200 members watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Watch this board</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">META & Procedures</Link>
          <div>
            <span className="bgGrey2 br4 p2 mR3 fs6">37 members watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Watch this board</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Upcoming Events</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col o2 disable" to="">Steering Committee</Link>
          <div>
            <span className="bgYellow br4 p2 mR3 fs6">Restricted Access</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Request Access</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Resiliency Working Group</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Anti-Amazon Working Group</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Labor Working Group</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Contracts Working Group</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
          </div>
        </li>
        <li className="brdA1 p3 bgWhite fx">
          <Link className="col" to="">Climate Justice Working Group</Link>
          <div>
            <span className="bgGrey2 br4 p2 fs6 mR3">✔ Watching</span>
            <Link to="" className="bgGrey2 br4 p2 fs6">Unwatch</Link>
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
