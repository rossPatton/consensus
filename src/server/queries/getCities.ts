import _ from 'lodash';
import memoizee from 'memoizee';

import {pg} from '../db/connection';

const getCities = async (region: string) => pg('cities').where({region});
export const getCitiesQuery = memoizee(getCities, {async: true});
