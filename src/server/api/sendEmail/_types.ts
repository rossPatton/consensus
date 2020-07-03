export type tQuery = {
  content: string,
  from: string,
  html: string,
  recipientVariables: {[key: string]: {id: number}},
  subject: string,
  text: string,
  to: string,
};
