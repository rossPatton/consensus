import React, { memo } from 'react';
import { Link } from 'react-router-dom';

export const Events = memo(() => (
  <>
    <div className="contain ffLab pB4 pT3">
      <div className="mB5 pB5">
        <div className="fw600 black fx mB2 rel">
          <div className="abs l">
            <Link to="" className="mR2">←</Link>
            <Link to="" className="mR2">→</Link>
          </div>
          <div className="col fs2 taCtr">June 2019</div>
          <Link to="" className="abs r">Subscribe to this calendar</Link>
        </div>
        <ul className="calendar lsNone m0 brdA1 fx fxdCol jcCtr bgGrey2">
          <li className="col fx brdB1 m0">
            <div className="col p3 brdR1 o5 bgWhite">
              1
              <Link to="" className="bgGreen o5 p2 dBl lh1 fs6 fw600 truncate mB1">
                Edit-a-thon
              </Link>
            </div>
            <div className="col p3 brdR1 o5 bgWhite">
              2
              <Link to="" className="bgGrey2 p2 dBl lh1 fs6 fw600 truncate mB1">
                Picnic!
              </Link>
            </div>
            <div className="col p3 brdR1 o5 bgWhite">3</div>
            <div className="col p3 brdR1 o5 bgWhite">4</div>
            <div className="col p3 brdR1 rel gradGrey">
              5
              <Link to="" className="bgGreen p2 dBl lh1 fs6 fw600 truncate mB1">
                TWC General Meeting
              </Link>
            </div>
            <div className="col p3 brdR1">6</div>
            <div className="col p3">7</div>
          </li>
          <li className="col fx brdB1 m0">
            <div className="col p3 brdR1">8</div>
            <div className="col p3 brdR1">
              9
              <Link to="" className="bgYellow p2 dBl lh1 fs6 fw600 truncate mB1">
                TWC Steering Call
              </Link>
              <Link to="" className="bgWhite p2 dBl lh1 fs6 fw600 truncate">
                Potluck!
              </Link>
            </div>
            <div className="col p3 brdR1">10</div>
            <div className="col p3 brdR1">11</div>
            <div className="col p3 brdR1">12</div>
            <div className="col p3 brdR1">
              13
              <Link to="" className="bgWhite p2 dBl lh1 fs6 fw600 truncate">
                Potluck!
              </Link>
            </div>
            <div className="col p3">14</div>
          </li>
          <li className="col fx brdB1 m0">
            <div className="col p3 brdR1">15</div>
            <div className="col p3 brdR1">16</div>
            <div className="col p3 brdR1">17</div>
            <div className="col p3 brdR1">18</div>
            <div className="col p3 brdR1">19</div>
            <div className="col p3 brdR1">20</div>
            <div className="col p3">21</div>
          </li>
          <li className="col fx brdB1 m0">
            <div className="col p3 brdR1">22</div>
            <div className="col p3 brdR1">23</div>
            <div className="col p3 brdR1 ovfScr">24
              <Link to="" className="bgYellow p2 dBl lh1 fs6 fw600 truncate mB1">
                TWC Steering Call
              </Link>
              <Link to="" className="bgGreen p2 dBl lh1 fs6 fw600 truncate mB1">
                Anti-Palantir Action
              </Link>
              <Link to="" className="bgWhite p2 dBl lh1 fs6 fw600 truncate">
                Potluck!
              </Link>
            </div>
            <div className="col p3 brdR1">25</div>
            <div className="col p3 brdR1">26</div>
            <div className="col p3 brdR1">27</div>
            <div className="col p3">28</div>
          </li>
          <li className="col fx m0">
            <div className="col p3 brdR1">29</div>
            <div className="col p3 brdR1">30</div>
            <div className="col p3 brdR1 o5 bgWhite">1</div>
            <div className="col p3 brdR1 o5 bgWhite">2</div>
            <div className="col p3 brdR1 o5 bgWhite">3</div>
            <div className="col p3 brdR1 o5 bgWhite">4</div>
            <div className="col p3 o5 bgWhite">5
              <Link to="" className="bgYellow p2 dBl lh1 fs6 fw600 truncate o5">
                Far-Future Event
              </Link>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <footer className="bgBlue white pT5 pB5">
      <div className="contain">
        @copyright etc
      </div>
    </footer>
  </>
));
