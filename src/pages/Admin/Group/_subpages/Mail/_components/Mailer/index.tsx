import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {api} from '~app/utils';

import {tContainerProps, tKeyUnion, tState, tStore} from './_types';
import {MailerComponent} from './Component';

class MailerContainer extends PureComponent<tContainerProps, tState> {
  state = {
    content: '',
    error: '',
    subject: '',
  };

  sendEmail = async (isTest = false) => {
    const {checked, group, usersByGroupIdThunk} = this.props;
    const {content, subject} = this.state;

    let users = usersByGroupIdThunk.data.filter(user => checked[user.id]);
    if (isTest) {
      users = [{email: group.email, id: group.id}] as ts.user[];
    }

    const to = users.map(u => u.email).join(', ');

    const recipientVariables = {};
    for (const user of users) {
      // @ts-ignore
      recipientVariables[user.email] = {id: user.id};
    }

    try {
      await api({
        path: '/api/v1/sendEmail',
        query: {
          content,
          data: JSON.stringify(group),
          from: group.name,
          recipientVariables: JSON.stringify(recipientVariables),
          subject,
          template: 'group',
          to,
        },
      });
    } catch (error) {
      return this.setState({
        error: error.message,
      });
    }
  }

  updateState = async (key: string, value: string) =>
    this.setState({
      [key]: value,
    } as Pick<tState, tKeyUnion>);

  render() {
    return (
      <MailerComponent
        {...this.state}
        checked={this.props.checked}
        group={this.props.group}
        sendEmail={this.sendEmail}
        updateState={this.updateState}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  checked: store.checked,
  usersByGroupIdThunk: store.usersByGroupId,
});

const Mailer = connect(mapStateToProps)(MailerContainer);
export default Mailer;
