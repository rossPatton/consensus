namespace ts {
  declare type fetchResponse<T = any> = Response & {
    json<P = T>(): Promise<P>
  };

  declare type infoUnon = ErrorInfo | string | null;
  declare type statusUnion = 200 | 204 | 400 | 401 | 404 | 500;

  // form submit boolean we add in middleware
  declare type formSubmit = Readonly<{
    isFormSubmit?: boolean,
  }>;

  // standard db query modifiers + form submit boolean we add in middleware
  declare type baseQuery = formSubmit & Readonly<{
    // exclude an id, or something else
    exclude?: number,
    limit?: number,
    offset?: number,
  }>;

  declare type idQuery = baseQuery & {
    id: string | number,
  };

  declare type responseError = Readonly<{
    message: fetchResponse<Error> | string;
    status: 200 | 204 | 400 | 401 | 404 | 500;
  }>;
}
