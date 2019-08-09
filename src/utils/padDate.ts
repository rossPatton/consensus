// JS Date object to string methods don't include leading zeros for days/months
// but many inputs expect date in format of 2019-0x-0x instead of 2019-x-x
// so we use this util to pad by adding the leading zero
export const padDate = (dateString: string | number) => `0${dateString}`.slice(-2);
