import React, {FunctionComponent, memo} from 'react';
import {connect} from 'react-redux';

import {Announcer, Mailer} from './_components';
import {tProps, tStore} from './_types';

const MailContainer: FunctionComponent<tProps> = memo(props => (
  <>
    <Mailer
      group={props.sessionThunk.data.profile as ts.group}
    />
    <Announcer
      group={props.sessionThunk.data.profile as ts.group}
    />
  </>
));

const mapStateToProps = (store: tStore) => ({
  sessionThunk: store.session,
});

const Mail = connect(mapStateToProps)(MailContainer);
export default Mail;
