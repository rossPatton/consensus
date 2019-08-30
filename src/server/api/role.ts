import Koa from 'koa';
import Router from 'koa-router';

import { knex } from '../db/connection';

export const role = new Router();
const route = '/api/v1/role';
const table = 'users_orgs';

// get role for current logged in user by orgId
role.get(route, async (ctx: Koa.ParameterizedContext) => {
  try {
    const {id} = ctx.state.locals.data;
    const orgId = parseInt(id, 10);
    const userId = ctx.state.user.id;
    ctx.body = await knex(table).limit(1).where({orgId, userId}).first();
  } catch (err) {
    ctx.throw(400, err);
  }
});

// role.post(route, async (ctx: Koa.ParameterizedContext) => {
//   const {id, value} = ctx.state.locals.data;
//   const eventId = parseInt(id, 10);
//   const userId = ctx.state.user.id;

//   const newRsvp = {
//     eventId,
//     rsvp: value === 'true',
//     userId,
//   };

//   let currentRSVPStatus: any;
//   try {
//     currentRSVPStatus = await knex(table)
//       .limit(1)
//       .where({eventId, userId})
//       .first();
//   } catch (err) {
//     return ctx.throw(400, err);
//   }

//   // TODO reduce branches or just simplify somehow
//   // update existing event or insert new users_events relation
//   if (currentRSVPStatus) {
//     try {
//       ctx.body = await knex(table)
//         .where({id: currentRSVPStatus.id})
//         .update(newRsvp)
//         .returning('*');
//     } catch (err) {
//       return ctx.throw(400, err);
//     }
//   }

//   try {
//     ctx.body = await knex(table)
//       .insert(newRsvp)
//       .returning('*')
//       .first();
//   } catch (err) {
//     ctx.throw(400, err);
//   }
// });
