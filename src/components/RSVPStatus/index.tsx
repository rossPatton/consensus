import React, { memo } from 'react';
import { connect } from 'react-redux';
import { tProps } from './_types';

const RSVPStatusComponent = memo((props: tProps) => {
  const { event } = props;
  if (!event.session) return null;

  const { session } = event;

  return (
    <>
      {session.isGoing && (
        <span className="ffLab circ bgGreen white lh1 p1 pR2 pL2 mR2">
          ✔
        </span>
      )}
      {session.isInterested && (
        <span className="ffLab circ bgYellow black lh1 p1 pR2 pL2 mR2">
          ?
        </span>
      )}
    </>
  );
});

const mapStateToProps = (state: { session: tSession }) => ({ session: state.session });
export const RSVPStatus = connect(mapStateToProps)(RSVPStatusComponent);
