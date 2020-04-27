export type tMeetingTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type tUpdateState = (key: any, value: string | number | object | boolean) => void;

// these are inherited by the form
type tProps = {
  city: string,
  cityId: number,
  geo: ts.geo,
  label?: string,
  region: string,
  regionId: number,
  session: ts.session,
};

export type tContainerProps = tProps & {
  citiesThunk: ts.thunk<ts.city[]>,
  getCitiesDispatch: (query?: {region: string}) => ts.thunkPayload<ts.city[]>,
  // inherited. updates form state
  updateState: tUpdateState,
};

export type tState = {showRegionField: boolean};
export type tKeyUnion = 'city' | 'cityId' | 'region';

export type tComponentProps = tState & tProps & {
  cities: ts.city[],
  // local update state. just updates the city and region inputs
  updateState: (state: Partial<tProps>) => void,
  toggleRegionField: () => void,
};

export type tStore = {
  cities: ts.thunk<ts.city[]>,
  geo: ts.thunk<ts.geo>,
  session: ts.thunk<ts.session>,
};
