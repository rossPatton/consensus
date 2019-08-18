import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import dayJS from 'dayjs';

import { getDateNowAsISOStr, parseTimeString, notNull } from '../../../../utils';
import { createEvent, fileUpload } from '../../../../redux';
import { getEventsByOrgSuccess } from '../../../../redux/async/getEventsByOrg/actions';
import { Helmet } from '../../../../components';
import { tContainerProps, tState, tStateUnion, tStore } from './_types';
import { AdminEventComponent } from './Component';

export class AdminEventContainer extends Component<tContainerProps, tState> {
  state = {
    category: this.props.org.category,
    date: getDateNowAsISOStr(),
    description: '',
    duration: '2',
    featuredImage: null,
    imagePreview: null,
    isPrivate: false,
    location: '',
    locationLink: '',
    time: '19:00',
    title: '',
  };

  // create preview image, store featuredImage in state to be uploaded on submit
  setImage = (ev: React.ChangeEvent<HTMLInputElement> | null) => {
    if (ev) ev.preventDefault();

    if (ev === null) {
      return this.setState({
        featuredImage: null,
        imagePreview: null,
      });
    }

    if (!ev.currentTarget.files) return;

    const images = Array.from(ev.currentTarget.files);
    const featuredImage = images[0];

    const reader = new FileReader();
    reader.readAsDataURL(featuredImage);
    reader.onload = () => {
      this.setState({
        featuredImage,
        imagePreview: reader.result as string,
      });
    };
  }

  onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { events } = this.props;
    const {
      duration,
      featuredImage,
      imagePreview,
      time,
      ...restOfEvent
    } = this.state;

    // TODO move date manipulation logic to server
    const timeArr = parseTimeString(time);
    const date = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    const endDate = dayJS(this.state.date).hour(timeArr[0]).minute(timeArr[1]);
    endDate.hour(endDate.hour() + parseInt(duration, 10));

    let newEvent = null;
    try {
      const createEvent = await this.props.createEvent({
        ...restOfEvent,
        // every date is stored in the db as an ISO string
        date: date.toISOString(),
        endDate: endDate.toISOString(),
        orgId: this.props.org.id,
      });

      newEvent = createEvent.payload;
    } catch (err) {
      console.error('failed to save event to db');
    }

    const body = new FormData();
    const fileInput = document.getElementById('fileUpload') as HTMLInputElement;
    if (fileInput !== null) {
      const { files }: { files: FileList | null } = fileInput;

      if (files !== null) {
        body.append('featuredImage', files[0]);
        body.append('eventId', newEvent.id);
      }
    }

    // upload featuredImage to fileserver, resize, etc
    try {
      await fetch(`/api/v1/fileUpload?eventId=${newEvent.id}`, {method: 'post', body});
    } catch (err) {
      console.error('failed to upload featured image');
    }

    // update redux on client side on event upload success
    getEventsByOrgSuccess([newEvent, ...events]);
  }

  toggleChecked = () => {
    this.setState({
      isPrivate: !this.state.isPrivate,
    });
  }

  updateState = (stateKey: tStateUnion, ev: any) => {
    this.setState({
      [stateKey]: ev.currentTarget.value,
    } as Pick<tState, tStateUnion>);
  }

  render() {
    const { session } = this.props;

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
          <AdminEventComponent
            {...this.props}
            {...this.state}
            onSubmit={this.onSubmit}
            setImage={this.setImage}
            toggleChecked={this.toggleChecked}
            updateState={this.updateState}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state: tStore) => ({
  events: state.events.data,
  session: state.session.data,
});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  createEvent: (event: tState) => dispatch(createEvent(event)),
});

export const AdminEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEventContainer);
