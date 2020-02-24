import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {getOrgsBySearch} from '../../redux';

class SearchContainer extends React.PureComponent<any, {value: string}> {
  state = {
    value: '',
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      value: ev.currentTarget.value,
    })

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.getSearchResults({value: this.state.value})
      .then(this.props.history.push(`/search?value=${this.state.value}`))
      .catch(loglevel.error);
  }

  render() {
    return (
      <form
        className="mR2"
        name="search"
        autoComplete="off"
        onSubmit={this.onSubmit}
        action="/api/v1/search">
        <fieldset>
          <label htmlFor="headerSearch">
            <input
              className="p2 pL3 br4"
              name="headerSearch"
              onChange={this.onChange}
              placeholder="Search group name"
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
  getSearchResults: (query: {value: string}) => dispatch(getOrgsBySearch(query)),
});

const Search = connect(
  null,
  mapDispatchToProps,
)(SearchContainer);

export default withRouter(Search);
