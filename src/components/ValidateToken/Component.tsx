// import cx from 'classnames';
// import _ from 'lodash';
// import React, {memo} from 'react';

// import {Form} from '~app/components';

// import {tComponentProps} from './_types';

// export const ValidateTokenComponent = memo((props: tComponentProps) => (
//   <Form
//     className="animated fadeInUp"
//     error={props.error}
//     legend={(<h2 className="text-base font-semibold mb-2">
//       You enabled 2 factor authentication. Please enter the 6 digit code from your authentication app to finish logging in.
//     </h2>)}
//     name="userSignupForm"
//     onSubmit={props.validateToken}
//     renderFields={() => (
//       <>
//         <label htmlFor="tokenInput">
//           <h2 className="text-base font-semibold">
//             2FA Code
//           </h2>
//           <input
//             required
//             pattern="^[0-9]{1,6}$"
//             autoComplete="off"
//             name="token" // for non-js submit and passportjs
//             id="tokenInput"
//             placeholder="example: 123456"
//             className="p-2 w-full mb-2"
//             value={props.token}
//             onChange={ev => props.updateState('token', ev)}
//           />
//         </label>
//       </>
//     )}
//     renderSubmit={formProps => {
//       const disabled = !formProps.hasMounted || !props.token;

//       return (
//         <button
//           disabled={disabled}
//           className={cx({
//             'p-2 pl-3 pr-3': true,
//             'bg-green-1 hover:bg-green-2': !disabled,
//           })}>
//           Verify and Login
//         </button>
//       );
//     }}
//   />
// ));
