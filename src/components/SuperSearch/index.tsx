import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import {getGroupsBySearch} from '../../redux';

const filterOptions = [
  {display: 'Group name', key: 'name'},
  {display: 'Category', key: 'category'},
  {display: 'City', key: 'city'},
  {display: 'State', key: 'region'},
];

// filter-panel like search on the search page, with additional features
class SuperSearchContainer extends React.PureComponent<any, any> {
  state = {
    key: 'name',
    value: '',
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      value: ev.currentTarget.value,
    })

  onFilterOptionChange = (ev: React.ChangeEvent<HTMLSelectElement>) =>
    this.setState({
      key: ev.currentTarget.value,
    })

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    this.props.getSearchResults(this.state);
  }

  render() {
    return (
      <form
        className="mb-3"
        name="superSearch"
        autoComplete="off"
        onSubmit={this.onSubmit}
        action="/api/v1/search">
        <fieldset>
          <div className="flex flex-col d:flex-row">
            <select
              className="min-w-full d:min-w-0 mr-1"
              onBlur={this.onFilterOptionChange}
              onChange={this.onFilterOptionChange}>
              {filterOptions.map(opt => (
                <option
                  key={opt.key}
                  value={opt.key}>
                  {opt.display}
                </option>
              ))}
            </select>
            <label className="w-full" htmlFor="superSearch">
              <input
                className="w-full"
                name="superSearch"
                onChange={this.onChange}
                placeholder="Search by group name"
                type="search"
                value={this.state.value}
              />
            </label>
          </div>
        </fieldset>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: Function) => ({
  getSearchResults: (query: tSearchQuery) => dispatch(getGroupsBySearch(query)),
});

const SuperSearch = connect(null, mapDispatchToProps)(SuperSearchContainer);
export default withRouter(SuperSearch);
