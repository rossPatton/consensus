export interface tProps {
  items: tEvent[],
  render: (renderProps: tPrivacyFilterProps) => React.ReactNode,
}

export interface tState {
  privacyFilter: tPrivacyFilter,
}
