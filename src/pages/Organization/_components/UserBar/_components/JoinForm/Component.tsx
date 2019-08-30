import React, {memo} from 'react';

export const JoinFormComponent = memo((props: any) => (
  <>
    <form
      method="POST"
      onSubmit={props.onSubmit}
      action="/api/v1/usersByOrg">
      <fieldset>
        <legend>
          <button className="bgWhite hvrBgGrey1 brdA1 br8 p1 pL2 pR2 mR2 trans1">
            Join This Organization
          </button>
        </legend>
      </fieldset>
    </form>
  </>
));
