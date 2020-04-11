import _ from 'lodash';
import React, {memo} from 'react';
import {Link} from 'react-router-dom';

const MobileAside = memo(() => (
  <aside className="order-2 w-full bg-white rounded p-2">
    <div className="mb-1">
      Other actions
    </div>
    <div className="flex flex-col">
      <form
        className="w-full mb-1"
        action="/api/v1/download">
        <fieldset>
          <button className="w-full text-sm p-2 hover:bg-gray-3">
            <legend className="w-full">
              Download your data
            </legend>
          </button>
        </fieldset>
      </form>
      <Link
        to="/admin/deleteAccount"
        className="btn w-full text-sm p-2 hover:bg-gray-3">
        Delete your account
      </Link>
    </div>
  </aside>
));

export default MobileAside;
