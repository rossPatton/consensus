import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {getOrgsBySearch} from '../../redux';

class SuperSearchContainer extends React.PureComponent<any, any> {
  state = {
    value: '',
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      value: ev.currentTarget.value,
    })

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.getSearchResults({value: this.state.value});
  }

  render() {
    return (
      <form
        className="'fx aiCtr p3 bgWhite br8 mB4 fs6 fw600'"
        name="superSearch"
        autoComplete="off"
        onSubmit={this.onSubmit}
        action="/api/v1/search">
        <fieldset>
          <label htmlFor="superSearch">
            <input
              className="bgGrey1 row p3 br4"
              name="superSearch"
              onChange={this.onChange}
              placeholder="Search by group name"
              type="search"
              value={this.state.value}
            />
          </label>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  getSearchResults: (query: any) => dispatch(getOrgsBySearch(query)),
});

const SuperSearch = connect(
  null,
  mapDispatchToProps,
)(SuperSearchContainer);

export default withRouter(SuperSearch);
