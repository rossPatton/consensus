import loglevel from 'loglevel';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getGroupsBySearch} from '~app/redux';

import {tProps, tState} from './_types';

/**
 * @description Basic search field component. Used in Header
 */
class SearchContainer extends React.PureComponent<tProps, tState> {
  state = {
    key: 'name' as ts.searchKeyUnion,
    value: '',
    redirect: false,
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      value: ev.currentTarget.value,
    })

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.getSearchResultsDispatch({
      key: this.state.key,
      value: this.state.value,
    })
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
              className="p-1 pl-2 rounded w-full"
              name="headerSearch"
              onChange={this.onChange}
              placeholder="Search for group"
              type="search"
              value={this.state.value}
            />
          </label>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (store: {groupsBySearch: ts.thunk<ts.group[]>}) => ({
  groupsBySearchThunk: store.groupsBySearch,
});

const mapDispatchToProps = (dispatch: Function) => ({
  getSearchResultsDispatch: (query: {value: string}) => dispatch(getGroupsBySearch(query)),
});

const Search = connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
export default withRouter(Search);
