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

  sendEmail = async () => {
    const {checked, group, usersByGroupIdThunk} = this.props;
    const {content, subject} = this.state;
    const selectedUsers = usersByGroupIdThunk.data.filter(user => checked[user.id]);

    const to = selectedUsers
      .map(user => user.email)
      .join(', ');

    const recipientVariables = {};
    for (const user of selectedUsers) {
      // @ts-ignore
      recipientVariables[user.email] = {id: user.id};
    }

    try {
      await api({
        path: '/api/v1/sendEmail',
        query: {
          content,
          data: group,
          from: group.name,
          html: content,
          recipientVariables: JSON.stringify(recipientVariables),
          subject,
          template: 'group',
          text: content,
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
