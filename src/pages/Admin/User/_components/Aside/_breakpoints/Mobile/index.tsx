import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

const MobileAside = memo(() => (
  <aside className="border shadow order-2 w-full bg-white rounded p-2">
    <div className="font-semibold mb-1">
      Other actions
    </div>
    <div className="flex flex-col">
      <form
        className="w-full mb-1"
        action="/api/v1/download">
        <fieldset>
          <button className="w-full text-sm p-2 hover:bg-gray-3">
            <legend className="w-full whitespace-no-wrap flex justify-center items-center">
              <img
                alt=""
                height="20"
                className="mr-1"
                src="/images/download.svg"
                width="20"
              /> Download Data
            </legend>
          </button>
        </fieldset>
      </form>
      <Link
        to="/admin/deleteAccount"
        className="btn w-full text-sm p-2 whitespace-no-wrap flex justify-center items-center hover:bg-gray-3">
        <img
          alt=""
          height="20"
          className="mr-1"
          src="/images/delete.svg"
          width="20"
        /> Delete Account
      </Link>
    </div>
  </aside>
));

export default MobileAside;
