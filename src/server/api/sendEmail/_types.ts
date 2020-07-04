export type tQuery = {
  content: string,
  data?: any,
  from: string,
  html: string,
  recipientVariables: {[key: string]: {id: number}},
  subject: string,
  template?: 'announcement' | 'group',
  text: string,
  to: string,
};
