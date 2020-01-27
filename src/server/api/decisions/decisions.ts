// import Koa from 'koa';
// import Router from 'koa-router';
// import _ from 'lodash';

// import {utcToDateString} from '../../utils';
// import {knex} from '../db/connection';

// export const decisions = new Router();
// type tQuery = {
//   exclude?: string,
//   id: string,
//   isClosed?: boolean,
//   limit?: string,
//   offset?: string,
// };

// const getDecisions = async (query: tQuery) => {
//   const {exclude, id, isClosed, limit, offset} = query as tQuery;
//   const orgId = parseInt(id, 10);
//   const excludeId = exclude ? parseInt(id, 10) : 0;
//   const parsedLimit = limit ? parseInt(limit, 10) : 3;
//   const parsedOffset = offset ? parseInt(offset, 10) : 0;

//   const decisions = knex('decisions').where({orgId});

//   if (typeof isClosed !== 'undefined') decisions.where({isClosed});

//   if (excludeId > 0) decisions.whereNot({id: exclude});

//   if (parsedLimit > 0) decisions.limit(parsedLimit);

//   if (parsedOffset > 0) decisions.offset(parsedOffset);

//   return decisions.orderBy('deadline', 'desc');
// };

// decisions.get('/api/v1/decisions', async (ctx: Koa.ParameterizedContext) => {
//   const query = _.get(ctx, 'state.locals.data', {});

//   try {
//     const decisions = await getDecisions(query);
//     const decisionsWithMappedDates: tDecision[] = decisions.map(utcToDateString);
//     ctx.body = decisionsWithMappedDates;
//   } catch (err) {
//     ctx.throw(400, err);
//   }
// });

