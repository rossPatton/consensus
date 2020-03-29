export type tEventTypes = React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>;
type tUpdateState = (key: any, value: string | number | object | boolean) => void;

// these are inherited by the form
type tProps = {
  city: string,
  cityId: number | null,
  geo: tGeo,
  region: string,
  regionId: number | null,
  session: tSession,
};

export type tContainerProps = tProps & {
  citiesThunk: tThunk<tCity[]>,
  getCitiesDispatch: (query?: {region: string}) => tThunkPayload<tCity[]>,
  // inherited. updates form state
  updateState: tUpdateState,
};

export type tState = {showRegionField: boolean};
export type tKeyUnion = 'city' | 'cityId' | 'region';

export type tComponentProps = tState & tProps & {
  cities: tCity[],
  // local update state. just updates the city and region inputs
  updateState: (state: Partial<tProps>) => void,
  toggleRegionField: () => void,
};

export type tStore = {
  cities: tThunk<tCity[]>,
  geo: tThunk<tGeo>,
  session: tThunk<tSession>,
};
