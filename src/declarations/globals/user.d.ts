namespace ts {
  declare type user = Readonly<{
    avatar: string,
    created_at?: Date,
    bio?: string,
    city?: string, // city.name
    cityId?: number, // city.id
    // lives in accounts_emails table,
    // but we merge into user when rendering user pages
    emails?: string[],
    facebook: string,
    id: number,
    name: string,
    phone: string,
    privateEmail: boolean,
    privateMemberships: boolean,
    privateRSVP: boolean,
    region?: string,
    regionId?: number,
    role?: ts.role,
    updated_at?: Date,
    username: string,
    twitter: string,
    website: string,
  }>;

  // getting/posting/deleting users by org membership
  declare type userQuery = Partial<ts.user> & ts.formSubmit & ts.baseQuery & Readonly<{
    isNew?: boolean,
    password?: string,
  }>;
}
