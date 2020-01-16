// import React, {memo} from 'react';
// import {Link} from 'react-router-dom';

// import {slugify} from '../../../../utils';
// import {tProps} from './_types';

// export const RegionComponent = memo((props: tProps) => (
//   <>
//     <h1>
//       {props.region.name}
//     </h1>
//     <label
//       htmlFor="searchFilter"
//       className="fx aiCtr p3 bgGrey1 br8 mB4">
//       <input
//         spellCheck
//         type="search"
//         id="searchFilter"
//         className="mR2 lh1 row"
//         onChange={props.onChange}
//         placeholder="Search for a city by name"
//       />
//     </label>
//     <h2 className="mB2 fs3">
//       {props.citiesToRender.length > 0 && `Cities in ${props.region.name}`}
//       {props.citiesToRender.length === 0 && 'No cities found'}
//     </h2>
//     <ul className="fx fxWrap">
//       {props.citiesToRender.map((city: tCity, i) => (
//         <li
//           key={i}
//           className="col fxg0 third mB3">
//           <Link
//             to={`${props.match.url}/${slugify(city.name)}`}
//             className="dBl p3 brdA1 br8 hvrBgGrey1 trans1">
//             {city.name}
//           </Link>
//         </li>
//       ))}
//     </ul>
//   </>
// ));
