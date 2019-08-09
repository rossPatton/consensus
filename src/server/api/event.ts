import Koa from 'koa';
import Router from 'koa-router';
import { knex } from '../db/connection';

export const event = new Router();

// @ts-ignore
event.get('getEvent', '/api/v1/event', async (ctx: Koa.Context) => {
  try {
    const event: tEvent = await knex('events').where(ctx.query).limit(1).first();
    ctx.body = event;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// event creation form
// @ts-ignore
event.post('postEvent', '/api/v1/event', async (ctx: Koa.Context) => {
  try {
    const event: tPublicEvent = ctx.query;
    // const newEvent = { date, time, ...event };
    console.log('event => ', event);
    // const utcDate =

    const eventQuery = await knex('events').insert(event).returning('*');
    const newEventInsert = eventQuery[0];
    ctx.body = newEventInsert;
  } catch (err) {
    ctx.throw('400', err);
  }
});

// @ts-ignore
// user.patch('patchUser', '/api/v1/user', async (ctx: Koa.Context) => {
//   try {
//     const { id, ...theRestOfTheQuery }: tUser = ctx.query;

//     const query = {
//       ...theRestOfTheQuery,
//       updated_at: knex.fn.now(),
//     };

//     if (query.password) {
//       const salt = await bcrypt.genSalt();
//       const hash = await bcrypt.hash(theRestOfTheQuery.password, salt);
//       query.password = hash;
//     }

//     const updatedUser = await knex('users')
//       .where({ id })
//       .update(query)
//       .returning('*');

//     const { password, ...safeUserForClient } = updatedUser[0];

//     ctx.body = {
//       ...safeUserForClient,
//       isAuthenticated: ctx.isAuthenticated(),
//     };
//   } catch (err) {
//     ctx.throw('400', err);
//   }
// });
