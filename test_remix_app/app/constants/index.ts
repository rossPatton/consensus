export const categories: ts.categoryObj[] = [
  {
    align: 'left',
    display: 'Community',
    slug: 'community',
    description: 'Your local neighborhood group. From your church, to community centers, any kind of miscellaneous group can be found here.',
  },
  {
    align: 'right',
    display: 'Cooperative',
    slug: 'cooperative',
    description: 'For your local worker-owned or membership-based cooperative. Come to consensus, on Consensus.',
  },
  {
    align: 'left',
    display: 'Unions and Labor',
    slug: 'union',
    description: "Find your local union, worker's center or other labor-affilitated group. Never miss another union meeting!",
  },
  {
    align: 'right',
    display: 'Political',
    slug: 'political',
    description: "From anarchist collectives to the Democratic Socialists of America or Tech Worker's Coalition, get involved with your local political group today.",
  },
];

export const categoryMap: ts.categoryMap = {
  'community': 'Community',
  'cooperative': 'Cooperative',
  'union': 'Union',
  'political': 'Political',
};

export const meetingTypes = [
  'Meeting',
  'March',
  'Rally',
  'Direct Action',
  'Protest',
  'Strike',
  'Picket',
  'Vote',
  'Election',
];

export const roles: ts.role[] = ['member', 'facilitator'];

export const spacesUrl = 'https://consensus.nyc3.digitaloceanspaces.com';
