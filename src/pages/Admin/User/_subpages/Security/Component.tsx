// import React, {memo} from 'react';

// import {Form} from '~app/components';

// import {tComponentProps} from './_types';

// export const SecurityComponent = memo((props: tComponentProps) => (
//   <Form
//     className="w-full"
//     error={props.error}
//     name="editProfile"
//     legend={(<h2 className="text-3 font-semibold">Security Settings</h2>)}
//     onSubmit={props.save}
//     renderFields={() => (
//       <>
//         {props.session.otpSecret && (
//           <div
//             tabIndex={0}
//             role="button"
//             className="flex items-center text-sm font-semibold mb-1"
//             onClick={() => props.updateState('otpSecret', !props.disableOtp)}
//             onKeyPress={() => props.updateState('otpSecret', !props.disableOtp)}>
//             <input
//               readOnly
//               type="checkbox"
//               className="flex-1 mr-1 w-auto"
//               autoComplete="nope"
//               checked={props.disableOtp}
//             />
//             <span className="w-full">
//               {props.disableOtp && (
//                 'Two factor authentication is on.'
//               )}
//               {!props.disableOtp && (
//                 'Two factor authentication will be disabled on save.'
//               )}
//             </span>
//           </div>
//         )}
//         {!props.session.otp && (
//           <>
//             <h3 className="text-base font-semibold mb-1">
//               2-factor authentication is <b>off</b>. Scan QR code below to enable it.
//             </h3>
//             <img
//               alt="Scan to setup 2FA on your phone"
//               height="200"
//               src={props?.session?.qr?.qrcode}
//               width="200"
//             />
//             <p className="text-sm font-semibold m-0">
//               QR code not working? Try entering the following instead:
//             </p>
//             <p className="font-semibold leading-none mb-2 text-sm">
//               {props?.session?.qr?.secret}
//             </p>
//             <label className="w-full mb-3" htmlFor="token">
//               <h3 className="text-base mb-6/12">
//                 Enter code to verify 2FA
//               </h3>
//               <input
//                 className="w-auto p-6/12"
//                 onChange={ev => props.updateState('token', ev.currentTarget.value)}
//                 value={props.token}
//                 name="token"
//               />
//             </label>
//           </>
//         )}
//       </>
//     )}
//     renderSubmit={formProps => (
//       <button
//         disabled={!formProps.hasMounted}
//         className="p-2 pl-3 pr-3 mr-1 hover:bg-gray-3">
//         Save
//       </button>
//     )}
//   />
// ));
