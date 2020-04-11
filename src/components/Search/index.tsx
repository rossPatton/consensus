import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {getGroupsBySearch} from '../../redux';
import {tProps, tState} from './_types';

// mini search bar located in the header, or maybe homepage
class SearchContainer extends React.PureComponent<tProps, tState> {
  state = {
    key: 'name',
    value: '',
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      value: ev.currentTarget.value,
    })

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.getSearchResults(this.state)
      .then(() => this.props.history.push('/search'))
      .catch(loglevel.error);
  }

  render() {
    return (
      <form
        className={this.props.className || 'mr-2'}
        name="search"
        autoComplete="off"
        onSubmit={this.onSubmit}
        action="/api/v1/search">
        <fieldset>
          <label htmlFor="headerSearch">
            <input
              className="p-1 pl-2 rounded"
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
  getSearchResults: (query: {value: string}) => dispatch(getGroupsBySearch(query)),
});

const Search = connect(null, mapDispatchToProps)(SearchContainer);
export default withRouter(Search);
