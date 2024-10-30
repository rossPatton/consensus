import { DesktopMeetings, MobileMeetings } from './_breakpoints';

export const MeetingsList = (props: any) => {
  console.log('meetings list props ? ', props);
  if (props.isDesktop) {
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
  }

  return (
    <MobileMeetings
      deleteMeeting={props.deleteMeeting}
      isEditable={props.isEditable}
      meetingsToRender={props.meetings}
      publishedFilter={props.publishedFilter}
      renderPastAsFallback={props.renderPastAsFallback}
      showGroupName={props.showGroupName}
    />
  );
};
