export type tState = {
  captcha: string,
  error: string,
  hasMounted: boolean,
};

export type tProps = {
  autoComplete?: string, // auto browser autocomplete or not
  className?: string, // optional classname
  encType?: 'multipart/form-data',
  error?: string | ts.fetchResponse<Error>,
  includeCaptcha?: boolean,
  legend: React.ReactNode, // necessary for a11y
  name: string, // necessary unique name to associate with the form

  // client-side js submit (action handles server only submit)
  onSubmit: (captchaToken: string) => void,
  renderFields: (state: {captcha: string, hasMounted: boolean}) => any,
  renderSubmit: (state: {captcha: string, hasMounted: boolean}) => any,
};
