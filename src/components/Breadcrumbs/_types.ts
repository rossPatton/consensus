export type tProps = {
  country: tCountry,
  city: tCity,
  region: tRegion,
};

export type tContainerProps = tProps & {
  isLoading: boolean,
};

export type tStore = {
  country: tThunk<tCountry>,
  city: tThunk<tCity>,
  region: tThunk<tRegion>,
}
