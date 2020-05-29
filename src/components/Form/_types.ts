export type tState = {
  hasMounted: boolean,
  token: string,
};

export type tProps = {
  action: string, // api
  autoComplete?: string, // auto browser autocomplete or not
  captcha?: boolean,
  className?: string, // optional classname
  error?: string | ts.fetchResponse<Error>,
  legend: string // necessary for a11y
  method?: string, // type of api call to make
  name: string, // necessary unique name to associate with the form

  // client-side js submit (action handles server only submit)
  onSubmit: (token: string) => void,
  renderFields: (state: tState) => any,
  renderSubmit: (state: tState) => any,
};
