import { DesktopMeetings, MobileMeetings } from './_breakpoints';

export const Meetings = (props: any) => {
  if (props.isDesktop) {
    return (
      <DesktopMeetings
        deleteMeeting={props.deleteMeeting}
        horizontal={props.horizontal}
        isEditable={props.isEditable}
        meetingsToRender={props.meetingsToRender}
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
      meetingsToRender={props.meetingsToRender}
      publishedFilter={props.publishedFilter}
      renderPastAsFallback={props.renderPastAsFallback}
      showGroupName={props.showGroupName}
    />
  );
};
