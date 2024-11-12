export const LeaveForm = (props: any) => {
  if (!props.role) return null;
  if (props.role === 'admin') return null;
  if (props.role === 'pending') return null;

  return (
    <form onSubmit={() => { }}>
      <fieldset>
        <legend>
          <button className="text-black text-sm p-1">
            Leave Group
          </button>
        </legend>
      </fieldset>
    </form >
  );
}

// const mapStateToProps = (store: {session: ts.thunk<ts.session>}) => ({
//   session: store.session.data,
// });

// const mapDispatchToProps = (dispatch: Function) => ({
//   dispatch,
//   deleteUserByGroupIdDispatch: (query: ts.usersByGroupIdQuery) =>
//     dispatch(deleteUserByGroupId(query)),
// });

// const LeaveForm = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(LeaveFormContainer);

// onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
//   ev.preventDefault();

//   const {dispatch, group, session} = this.props;
//   const userId = session.profile.id;

//   this.props.deleteUserByGroupIdDispatch({groupId: group.id, userId})
//     .then(() => dispatch(deleteRoleSuccess({groupId: group.id, role: null})))
//     .catch(loglevel.error);
// }
