export type tProps = {
  deleteMeeting: (ev: React.MouseEvent, id: number) => void,
  isEditable?: boolean,
  meetingsToRender: ts.meeting[],
  pastMeetingsCount: number,
  renderPast: boolean,
  renderPastAsFallback: boolean,
  sessionRole?: ts.role,
  showGroupName?: boolean,
  showPastToggle?: boolean,
  showRSVPs?: boolean,
  togglePast: (renderPast: boolean) => void,
  upcomingMeetingsCount: number,
};
