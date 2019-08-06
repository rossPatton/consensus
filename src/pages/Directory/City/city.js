import React from 'react';
import { Link } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/seo';

const City = () => (
  <Layout>
    <SEO title="NYC Directory" />
    <header className="bgBlue pT4 pB4 mT5 mB3 white">
      <div className="contain">
        <ul className="lsNone fx fs5 fw600 brdB1 brdMagenta brdW2 pB2 mB2 white">
          <li><a href="filler" className="white">United States</a></li>
          <li>&nbsp;/&nbsp;</li>
          <li>New York City</li>
        </ul>
        <h1 className="fs3 white">
          All 126 Organizations in New York City
        </h1>
      </div>
    </header>
    <div className="contain pB4">
      <div className="fx aiCtr jcStart mB3">
        <input
          type="search"
          placeholder="Search for organization"
          className="col brdA1 p3 br8 fs4 mR2 fxg0"
          style={{
            maxWidth: '400px',
          }}
        />
        <select className="col fxg0 brdA1 p3 br8 mR2">
          <option>Filter by Neighborhood</option>
          <option>The Bronx</option>
          <option>Brooklyn</option>
          <option>Manhattan</option>
          <option>Queens</option>
          <option>Staten Island</option>
          <option>Alphabet City</option>
          <option>Brooklyn Heights</option>
          <option>Chinatown</option>
          <option>Harlem</option>
          <option>Flushing</option>
          <option>NOHO</option>
          <option>SOHO</option>
          <option>Williamsburg</option>
        </select>
        <select className="col fxg0 brdA1 p3 br8">
          <option>Filter by Tag</option>
          <option>Feminism</option>
          <option>Science & Tech Activism</option>
          <option>Socialism</option>
          <option>Community Groups</option>
          <option>Social Democracy</option>
          <option>Democratic Party</option>
          <option>Communism</option>
          <option>Accessibility</option>
          <option>Racial Justice</option>
          <option>Climate Justice</option>
          <option>LGBTQ+</option>
          <option>Housing Justice</option>
          <option>Union & Labor Issues</option>
        </select>
      </div>
      <div className="p3 brdBlue brdT1 brdW2 fx black m0">
        Logged in as&nbsp;<Link to="">Ross Patton</Link>&nbsp;who is&nbsp;<Link to="" title="Click to see all organizations you follow">following</Link>&nbsp;17 Organizations in New York City
      </div>
      <ul className="lsNone brdA1 bgGrey1 fx aiStart jcBetween grid mB5 p3">
        <li className="col">
          <div className="brdA1 p3 bgWhite mB2">
            <div className="pB2 mB3 brdB1 taCtr rel fs6">
              <div className="abs l">
                <Link to="" className="mR2">←</Link>
                <Link to="" className="mR2">→</Link>
              </div>
              June Events in New York City
            </div>
            <ul
              className="calendarSm lsNone m0 brdA1 fx fxdCol jcCtr bgGrey2 taCtr"
              style={{
                height: '300px',
              }}>
              <li className="col fx brdB1 m0">
                <div className="col p3 brdR1 o5 bgWhite">1</div>
                <div className="col p3 brdR1 o5 bgWhite">2</div>
                <div className="col p3 brdR1 o5 bgWhite">3</div>
                <div className="col p3 brdR1 o5 bgWhite">4</div>
                <div className="col brdR1 rel gradGrey">
                  <Link className="dBl p3" to="">5</Link>
                </div>
                <div className="col brdR1"><Link className="dBl p3" to="">6</Link></div>
                <div className="col"><Link className="dBl p3" to="">7</Link></div>
              </li>
              <li className="col fx brdB1 m0">
                <div className="col brdR1"><Link className="dBl p3" to="">8</Link></div>
                <div className="col brdR1">
                  <Link className="dBl p3" to="">9</Link>
                </div>
                <div className="col brdR1"><Link className="dBl p3" to="">10</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">11</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">12</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">13</Link></div>
                <div className="col"><Link className="dBl p3" to="">14</Link></div>
              </li>
              <li className="col fx brdB1 m0">
                <div className="col brdR1"><Link className="dBl p3" to="">15</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">16</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">17</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">18</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">19</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">20</Link></div>
                <div className="col"><Link className="dBl p3" to="">21</Link></div>
              </li>
              <li className="col fx brdB1 m0">
                <div className="col brdR1"><Link className="dBl p3" to="">22</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">23</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">24</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">25</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">26</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">27</Link></div>
                <div className="col"><Link className="dBl p3" to="">28</Link></div>
              </li>
              <li className="col fx m0">
                <div className="col brdR1"><Link className="dBl p3" to="">29</Link></div>
                <div className="col brdR1"><Link className="dBl p3" to="">30</Link></div>
                <div className="col p3 brdR1 o5 bgWhite">1</div>
                <div className="col p3 brdR1 o5 bgWhite">2</div>
                <div className="col p3 brdR1 o5 bgWhite">3</div>
                <div className="col p3 brdR1 o5 bgWhite">4</div>
                <div className="col p3 o5 bgWhite">5</div>
              </li>
            </ul>
          </div>
          <div className="brdA1 p3 bgWhite">
            <ul className="fs5 lsNone">
              <li className="">
                <Link className="bgGrey2 p2 pL3 pR3 dBl taCtr" to="" title="Not seeing your org? Add it here">Create Organization</Link>
              </li>
              <li className="">
                <Link className="bgGrey2 p2 pL3 pR3 dBl taCtr" to="" title="Is an org listed here that violates our community code of conduct? Report it here">Report Organization</Link>
              </li>
              <li className="taCtr">
                <Link to="" title="How does this all work?">Help</Link> / <Link to="" title="Frequently Asked Questions (and answers!)">FAQ</Link> / <Link to="" title="The fine print">Legal</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="col">
          <div className="brdA1 p3 bgWhite mB2">
            <div className="pB2 mB3 brdB1 taCtr">
              Community & Neighborhoods
            </div>
            <ul className="fs5 lsNone">
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">ALIGN NYC</Link>
              </li>
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">New York Communities for Change</Link>
              </li>
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">Make The Road NY</Link>
              </li>
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">Mijente NYC</Link>
              </li>
              <li className="fx aiCtr pB2">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">New York Communities for Change</Link>
              </li>
              <li className="m0 brdT1 pT2 taCtr">
                <Link to="">See All</Link>
              </li>
            </ul>
          </div>
          <div className="brdA1 p3 bgWhite mB2">
            <div className="pB2 mB3 brdB1 taCtr">Worker&apos;s Centers</div>
            <ul className="lsNone fs5">
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{minHeight: '24px', minWidth: '24px'}} />
                <Link to="">Gig Workers Unite</Link>
              </li>
              <li className="fx aiCtrm0">
                <span
                  className="circ bgGreen brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{minHeight: '24px', minWidth: '24px'}} />
                <Link to="">Game Developers Unite</Link>
              </li>
              <li className="fx aiCtrm0">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{minHeight: '24px', minWidth: '24px'}} />
                <Link to="">Laundry Worker&apos;s Center</Link>
              </li>
              <li className="fx aiCtrm0">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{minHeight: '24px', minWidth: '24px'}} />
                <Link to="">Hospitality Worker&apos;s Center</Link>
              </li>
            </ul>
          </div>
          <div className="brdA1 p3 bgWhite mB2">
            <div className="pB2 mB3 brdB1 taCtr">Non-Profits</div>
            <ul className="lsNone fs5">
              <li className="fx aiCtr ">
                <span
                  className="circ bgGreen brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">ACLU NYC</Link>
              </li>
              <li className="fx aiCtr m0">
                <span
                  className="circ bgGreen brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">EFF NYC</Link>
              </li>
            </ul>
          </div>
        </li>
        <li className="col">
          <div className="brdA1 p3 bgWhite mB2">
            <div className="pB2 mB3 brdB1 taCtr">Activism</div>
            <ul className="fs5 lsNone">
              <li className="fx aiCtr ">
                <span
                  className="circ bgGreen fx aiCtr jcCtr lh1 white mR2"
                  style={{height: '24px', width: '24px'}}>
                  ✔
                </span>
                <Link to="">Tech Workers Coalition (NYC)</Link>
              </li>
              <li className="fx aiCtr ">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">NYC-DSA</Link>
              </li>
              <li className="fx aiCtr ">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">IWW NYC Chapter</Link>
              </li>
            </ul>
          </div>
          <div className="brdA1 p3 bgWhite mB2">
            <div className="pB2 mB3 brdB1 taCtr">Unions & Labor</div>
            <ul className="lsNone fs5">
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{minHeight: '24px', minWidth: '24px'}} />
                <Link to="">OPEIU (Office & Professional Employees International Union)</Link>
              </li>
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{minHeight: '24px', minWidth: '24px'}} />
                <Link to="">RWDSU (Retail, Wholesale & Department Store Union)</Link>
              </li>
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{minHeight: '24px', minWidth: '24px'}} />
                <Link to="">IBEW (International Brotherhood of Electrical Workers)</Link>
              </li>
            </ul>
          </div>
          <div className="brdA1 p3 bgWhite">
            <div className="pB2 mB3 brdB1 taCtr">Electoral Politics</div>
            <ul className="lsNone fs5">
              <li className="fx aiCtr">
                <span
                  className="circ bgGreen fx aiCtr jcCtr lh1 white mR2"
                  style={{height: '24px', width: '24px'}}>
                  ✔
                </span>
                <Link to="">Tech For Bernie</Link>
              </li>
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">Science Debate 2020</Link>
              </li>
              <li className="fx aiCtr">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">Justice Democrats NYC</Link>
              </li>
              <li className="fx aiCtr m0">
                <span
                  className="circ bgWhite brdA1 fx aiCtr jcCtr lh1 mR2"
                  style={{height: '24px', width: '24px'}} />
                <Link to="">Indivisible NYC</Link>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
    <footer className="bgBlue white pT5 pB5">
      <div className="contain">
        @copyright etc
      </div>
    </footer>
  </Layout>
);
