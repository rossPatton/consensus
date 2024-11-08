import { DesktopMeetings, MobileMeetings } from './_breakpoints';

export const MeetingsList = (props: any) => {
  return (
    <DesktopMeetings
      deleteMeeting={props.deleteMeeting}
      horizontal={props.horizontal}
      isEditable={props.isEditable}
      meetingsToRender={props.meetings}
      publishedFilter={props.publishedFilter}
      renderPastAsFallback={props.renderPastAsFallback}
      showGroupName={props.showGroupName}
    />
  );
};
