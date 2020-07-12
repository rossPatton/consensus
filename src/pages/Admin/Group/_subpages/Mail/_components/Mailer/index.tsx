import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {GenericLoader} from '~app/containers';
import {postEmail} from '~app/redux';

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
      await this.props.postEmailDispatch({
        content,
        data: JSON.stringify(group),
        from: group.name,
        recipientVariables: JSON.stringify(recipientVariables),
        subject,
        template: 'group',
        to,
      });
      this.setState({
        content: '',
        error: '',
        subject: '',
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
      <GenericLoader
        isLoading={this.props.emails.isLoading}
        render={() => (
          <MailerComponent
            {...this.state}
            checked={this.props.checked}
            group={this.props.group}
            sendEmail={this.sendEmail}
            updateState={this.updateState}
          />
        )}
      />
    );
  }
}

const mapStateToProps = (store: tStore) => ({
  checked: store.checked,
  emails: store.emails,
  usersByGroupIdThunk: store.usersByGroupId,
});

const mapDispatchToProps = (dispatch: Function) => ({
  postEmailDispatch: (query: any) => dispatch(postEmail(query)),
});


const Mailer = connect(mapStateToProps, mapDispatchToProps)(MailerContainer);
export default Mailer;
