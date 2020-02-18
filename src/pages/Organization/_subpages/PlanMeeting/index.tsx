import dayJS from 'dayjs';
import loglevel from 'loglevel';
import qs from 'query-string';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import {Helmet} from '../../../../components';
import {postEvent} from '../../../../redux';
import {parseTimeString} from '../../../../utils';
import {tContainerProps, tState, tStateUnion, tStore} from './_types';
import {PlanMeetingComponent} from './Component';

class PlanMeetingContainer extends Component<tContainerProps, tState> {
  state = {
    category: this.props.org.category,
    date: dayJS().toISOString(),
    description: '',
    duration: 2,
    // featuredImage: null,
    // imagePreview: null,
    isDraft: false,
    isPrivate: this.props.org.type !== 'public',
    location: '',
    locationLink: '',
    orgName: this.props.org.name,
    // pathToFeaturedImage: null,
    time: '19:00',
    title: '',
  };

  // we use query params to populate the form when editing an event
  constructor(props: tContainerProps) {
    super(props);
    const {router: {search}} = props;
    const draft = qs.parse(search);
    if (!draft.id) return;

    const isPrivate = draft.isPrivate === 'true';

    this.state = {
      category: draft.category as tCategory,
      // convert UTC date with tz to local format for html5 date/time
      date: dayJS(draft.date as string).format('YYYY-MM-DD'),
      description: draft.description as string,
      duration: parseInt(draft.duration as string, 10),
      // @ts-ignore
      id: parseInt(draft.id as string, 10),
      isDraft: true,
      isPrivate,
      location: draft.location as string,
      locationLink: draft.locationLink as string,
      orgName: this.props.org.name,
      // pathToFeaturedImage: draft.pathToFeaturedImage as string,
      time: draft.time as string,
      title: draft.title as string,
    };
  }

  // create preview image, store featuredImage in state to be saved to file server
  // setImage = (ev: React.ChangeEvent<HTMLInputElement>, removeImage: boolean = false) => {
  //   ev.preventDefault();

  //   if (removeImage) {
  //     return this.setState({
  //       featuredImage: null,
  //       imagePreview: null,
  //       pathToFeaturedImage: null,
  //     });
  //   }

  //   if (!ev.currentTarget.files) return;

  //   const images = Array.from(ev.currentTarget.files);
  //   const featuredImage = images[0];

  //   const reader = new FileReader();
  //   reader.readAsDataURL(featuredImage);
  //   reader.onload = () => {
  //     this.setState({
  //       featuredImage,
  //       imagePreview: reader.result as string,
  //     });
  //   };
  // }

  saveAsDraft = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();

    this.setState({
      isDraft: true,
    }, () => this.onSubmit(ev, true));
  }

  onSubmit = async (
    ev: React.MouseEvent<HTMLButtonElement>,
    saveAsDraft: boolean = false) => {
    ev.preventDefault();
    // const {events} = this.props;
    const {
      duration,
      // featuredImage,
      // imagePreview,
      time,
      ...restOfEvent
    } = this.state;

    const dur = typeof duration === 'string' ? parseInt(duration, 10) : duration;

    // TODO move date manipulation logic to server
    const timeArr = parseTimeString(time);
    const date = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    const endDate = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    endDate.hour(endDate.hour() + dur);

    let newEvent: tEvent;
    try {
      const planMeeting = await this.props.postEvent({
        ...restOfEvent,
        // we submit drafts to the same table in the DB as well
        isDraft: saveAsDraft,
        // every date is stored in the db as an ISO string
        date: date.toISOString(),
        endDate: endDate.toISOString(),
        orgId: this.props.org.id as number,
      });

      newEvent = planMeeting.payload;
    } catch (err) {
      return loglevel.error('failed to save event to db', err);
    }

    // update redux on client side on event upload success
    // getEventsSuccess([newEvent, ...events]);
    this.setState({
      id: newEvent.id,
    });

    // const body = new FormData();
    // const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    // if (fileInput !== null) {
    //   const { files }: { files: FileList | null } = fileInput;

    //   if (files !== null) {
    //     body.append('featuredImage', files[0]);
    //     body.append('eventId', `${newEvent.id}`);
    //   }
    // }

    // // upload featuredImage to fileserver, resize, etc if we have one
    // // TODO this should go through redux probably
    // if (featuredImage) {
    //   try {
    //     await fetch(`/api/v1/fileUpload?eventId=${newEvent.id}`, {method: 'post', body});
    //   } catch (err) {
    //     loglevel.error('failed to upload featured image');
    //   }
    // }
  }

  updateState = (stateKey: tStateUnion, value: any) => {
    this.setState({
      [stateKey]: value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const {session} = this.props;

    return (
      <>
        <Helmet
          canonical=""
          title=""
          meta={[
            { name: 'description', content: '' },
            { name: 'keywords', content: '' },
            { property: 'og:title', content: '' },
            { property: 'og:description', content: '' },
          ]}
        />
        {!session.isAuthenticated && <Redirect to="" />}
        {session.isAuthenticated && (
          <PlanMeetingComponent
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
            saveAsDraft={this.saveAsDraft}
            // setImage={this.setImage}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  events: store.eventsByOrgId.data,
  session: store.session.data,
});

const mapDispatchToProps = (dispatch: Function) => ({
  postEvent: (query: tUpsertEventQuery) => dispatch(postEvent(query)),
});

const PlanMeeting = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlanMeetingContainer);

export default PlanMeeting;
