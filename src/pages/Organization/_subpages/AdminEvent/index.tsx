import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { padDate } from '../../../../utils';
import { createEvent } from '../../../../redux';
import { Helmet } from '../../../../components';
import { tProps, tState, tStateUnion } from './_types';
import { AdminEventComponent } from './Component';

export class AdminEventContainer extends Component<tProps, tState> {
  constructor(props: tProps) {
    super(props);

    // set default date value to right now
    const date = new Date(Date.now());
    const yr = date.getFullYear();
    const mo = date.getMonth();
    const day = date.getDate();
    const dateStr = `${yr}-${padDate(mo + 1)}-${padDate(day)}`;

    this.state = {
      category: props.org.category,
      date: dateStr,
      description: '',
      endDate: '',
      isPrivate: false,
      location: '',
      time: '19:00',
      title: '',
    };
  }

  publishEvent = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const { time, ...restOfEvent } = this.state;
    const event = {
      ...restOfEvent,
      date: new Date(`${this.state.date} ${time}`).toUTCString(),
      orgId: this.props.org.id,
    };

    await this.props.createEvent(event);
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
        <AdminEventComponent
          {...this.props}
          {...this.state}
          publishEvent={this.publishEvent}
          toggleChecked={this.toggleChecked}
          updateState={this.updateState}
        />
      </>
    );
  }
}

const mapStateToProps = (state: {session: tSession}) => ({session: state.session});

const mapDispatchToProps = <S extends {}>(dispatch: Dispatch<S>) => ({
  createEvent: (event: tState) => dispatch(createEvent(event)),
});

export const AdminEvent = connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminEventContainer);
