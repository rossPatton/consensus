const country = 'United States';

export const testGroup1 = {
  avatar: '',
  category: 'Union' as ts.category,
  city: 'New York',
  cityId: 1,
  country,
  countryId: 1,
  description: '',
  deletionDeadline: '',
  email: 'testgroup1@test.com',
  id: 1,
  memberName: 'member',
  modName: 'facilitator',
  name: 'Tech Workers Coalition Chapter',
  region: 'New York',
  regionId: 1,
  handle: 'tech-workers-coalition-chapter',
  sessionType: 'group' as ts.sessionType,
  type: 'private' as ts.privacyEnum,
};

export const testUser1 = {
  avatar: '',
  city: 'New York',
  cityId: 1,
  country,
  countryId: 1,
  email: 'testgroup1@test.com',
  id: 1,
  name: 'Test User',
  privateMemberships: true,
  privateRSVP: true,
  region: 'New York',
  regionId: 1,
  sessionType: 'user' as ts.sessionType,
} as ts.user;

export const testMeeting1 = {
  attendees: 1,
  host: '',
  publicRSVPS: [{}] as ts.user[],
  rsvp: { userId: 1 },
  id: 12,
  category: 'Political' as ts.category,
  groupId: 1,
  cityId: 16624,
  groupName: 'Tech Workers Coalition NYC',
  isOnline: false,
  isPrivate: false,
  description: 'Asperiores et perspiciatis fugit sint. Nihil dolore autem enim numquam dolores aliquam sed repudiandae. Eius dolorem nostrum quo aut culpa incidunt. Aut eum adipisci. Amet amet suscipit et. Voluptas animi distinctio adipisci. Nam voluptas similique quam esse magni quidem id. In aut nulla inventore facilis dicta ducimus molestias saepe. Autem voluptatibus mollitia quos ullam quidem ex consequuntur quia. Adipisci quod est incidunt quas repellendus rem voluptatem. Cumque iusto corporis velit nam nostrum commodi vel possimus velit. Quibusdam ea cumque dignissimos cumque magni voluptas ipsa natus sunt. Est qui officiis atque dolorem voluptatibus aut explicabo.',
  location: '717 Borer Oval',
  locationLink: 'http://sam.info',
  locationType: 'online',
  title: 'aut occaecati iusto nostrum ut',
  slug: 'aut-occaecati-iusto-nostrum-ut',
  date: '2020-05-02T10:47:34.393Z',
  endDate: '2020-05-02T11:01:06.513Z',
  isDraft: false,
  duration: 2,
  tag: 'Protest' as ts.meetingTypes,
  img: '',
  time: '19:00',
};

export const testMeeting2 = {
  attendees: 1,
  category: 'Cooperative' as ts.category,
  cityId: 16624,
  date: '2021-05-02T10:47:34.393Z',
  description: 'Asperiores et perspiciatis fugit sint. Nihil dolore autem enim numquam dolores aliquam sed repudiandae. Eius dolorem nostrum quo aut culpa incidunt. Aut eum adipisci. Amet amet suscipit et. Voluptas animi distinctio adipisci. Nam voluptas similique quam esse magni quidem id. In aut nulla inventore facilis dicta ducimus molestias saepe. Autem voluptatibus mollitia quos ullam quidem ex consequuntur quia. Adipisci quod est incidunt quas repellendus rem voluptatem. Cumque iusto corporis velit nam nostrum commodi vel possimus velit. Quibusdam ea cumque dignissimos cumque magni voluptas ipsa natus sunt. Est qui officiis atque dolorem voluptatibus aut explicabo.',
  duration: 2,
  endDate: '2021-05-02T12:01:06.513Z',
  groupId: 1,
  groupName: 'Test Group',
  host: '',
  id: 12,
  img: '',
  isDraft: false,
  isOnline: false,
  isPrivate: false,
  location: '717 Borer Oval',
  locationLink: 'http://sam.info',
  locationType: 'online',
  publicRSVPS: [{}] as ts.user[],
  rsvp: { userId: 1 },
  slug: 'aut-occaecati-iusto-nostrum-ut',
  tag: 'Protest' as ts.meetingTypes,
  time: '19:00',
  title: 'aut occaecati iusto nostrum ut',
};

export const testGeo = {
  city: 'New York',
  countryCode: 'us',
  handle: 'new-york',
  region: 'New York',
  regionCode: 'ny',
  postcode: 10002,
};

export const testGeoEmpty = {
  city: '',
  countryCode: 'us',
  handle: '',
  region: '',
  regionCode: '',
  postcode: 0,
};

export const testNYC = {
  id: 1,
  name: 'New York',
  country,
  countryId: 1,
  region: 'New York',
  regionId: 37,
  regionCode: 'ny',
};

export const testUserSession = {
  error: null as Error | null,
  isLoading: false,
  data: {
    isAuthenticated: false,
    profile: {
      region: 'New York',
    } as ts.user,
    qr: {},
    type: 'user',
  },
};

export const testUserSession2 = {
  error: null as Error | null,
  isLoading: false,
  data: {
    isAuthenticated: false,
    profile: {
      region: 'Los Angeles',
      privateRSVP: false,
    } as ts.user,
    qr: {},
    type: 'user',
  },
};
