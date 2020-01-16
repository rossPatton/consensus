export type tContainerProps = {
  category: tCategorySlug,
  getOrgs: (params: {category: tCategory}) => tThunk<tOrg[]>,
  isLoading: boolean,
  orgs: tOrg[],
};

export type tStore = {
  orgs: tThunk<tOrg[]>,
};
