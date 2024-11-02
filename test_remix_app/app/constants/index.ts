// TODO: some of these should be reviewed/removed
export const categories = [
  {
    "display": "Community",
    "slug": "community",
    "description": 'Your local neighborhood group. From your church, to community centers, any kind of miscellaneous group can be found here.',
  },
  {
    "display": "Cooperative",
    "slug": "coop",
    "description": 'For your local worker-owned or membership-based cooperative. Come to consensus, on Consensus.',
  },
  {
    "display": "Unions & Labor",
    "slug": "union",
    "description": "Find your local union, worker's center or other labor-affilitated group. Never miss another union meeting!",
  },
  {
    "display": "Political",
    "slug": "pol",
    "description": "From anarchist collectives to the Democratic Socialists of America or Tech Worker's Coalition, get involved with your local political group today.",
  },
] as const;

export enum categorySlugsEnum {
  'community' = 'Community',
  'coop' = 'Cooperative',
  'union' = 'Unions & Labor',
  'pol' = 'Political',
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

export const roles = ['member', 'facilitator'] as const;

export const spacesUrl = 'https://consensus.nyc3.digitaloceanspaces.com';
