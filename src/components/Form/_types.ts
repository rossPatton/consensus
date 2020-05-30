export type tState = {
  hasMounted: boolean,
  token: string,
};

export type tProps = {
  autoComplete?: string, // auto browser autocomplete or not
  captcha?: boolean,
  className?: string, // optional classname
  encType?: 'multipart/form-data',
  error?: string | ts.fetchResponse<Error>,
  legend: React.ReactNode, // necessary for a11y
  name: string, // necessary unique name to associate with the form

  // client-side js submit (action handles server only submit)
  onSubmit: (captchaToken: string) => void,
  renderFields: (state: tState) => any,
  renderSubmit: (state: tState) => any,
};
