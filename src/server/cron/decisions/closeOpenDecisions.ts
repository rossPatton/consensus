// import {CronJob} from 'cron';
// import dayJS from 'dayjs';
// import _ from 'lodash';
// import loglevel from 'loglevel';

// import {pg} from '../../db/connection';

// const closeDecisionsQuery = async (now: dayJS.Dayjs) => {
//   let decisionsClosed: tDecision[];
//   try {
//     decisionsClosed = await pg('decisions')
//       .where({isClosed: false, isDraft: false})
//       .where('deadline', '<=', now)
//       .update({isClosed: true})
//       .returning('*');
//   } catch (err) {
//     loglevel.error(err);
//   }

//   return decisionsClosed;
// };

// export const closeOpenDecisions = () => {
//   /* eslint-disable */
//   new CronJob(
//     '* * * * * *',
//     async () => closeDecisionsQuery(dayJS()),
//     null,
//     true,
//     'America/Los_Angeles'
//   );
// };

