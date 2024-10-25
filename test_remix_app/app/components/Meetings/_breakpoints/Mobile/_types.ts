export type tProps = {
  deleteMeeting: (ev: React.MouseEvent, id: number) => void,
  isEditable?: boolean,
  meetingsToRender: ts.meeting[],
  publishedFilter?: ts.filterEnum,
  renderPastAsFallback?: boolean,
  sessionRole?: ts.role,
  showGroupName?: boolean,
  showRSVPs?: boolean,
};
