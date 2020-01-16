export const categories: tCategories = [
  {display: 'Religious', slug: 'religious'},
  {display: 'Community Center', slug: 'community-center'},
  {display: 'Cooperative', slug: 'cooperative' },
  {display: 'Union', slug: 'union' },
  {display: 'Political Organization', slug: 'political-organization' },
];

export const categoryMap: tCategoryMap = {
  'religious': 'Religious',
  'community-center': 'Community Center',
  'cooperative': 'Cooperative',
  'union': 'Union',
  'political-organization': 'Political Organization',
};

export const decisionTypes = [
  'Approval',
  'Consensus',
  'Simple Majority',
  'Simple Poll',
];

export const consensusOptions = [
  'Agree',
  'Disagree',
  'Abstain',
  'Block',
];

export const simplePollOptions = [
  'Yes',
  'No',
  'Abstain',
];

export const APPROVAL = 'Approval';
export const CONSENSUS = 'Consensus';
export const MAJORITY = 'Simple Majority';
export const POLL = 'Simple Poll';
