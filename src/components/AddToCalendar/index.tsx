import AddToCalendarHOC from 'react-add-to-calendar-hoc';

import {AddToCalendarButton, AddToCalendarPortal} from './_components';

/**
 * @description add meeting to your calendar. platform neutral
*/
// @ts-ignore
export default AddToCalendarHOC(AddToCalendarButton, AddToCalendarPortal);
