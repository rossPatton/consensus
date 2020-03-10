import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

import {getOrgsBySearch} from '../../redux';

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
        className="p3 bgWhite br8 mB4 fs6 fw600"
        name="superSearch"
        autoComplete="off"
        onSubmit={this.onSubmit}
        action="/api/v1/search">
        <fieldset>
          <div className="fx aiCtr">
            <select
              className="mR2"
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
            <label className="row" htmlFor="superSearch">
              <input
                className="bgGrey1 row p3 br4 mR3"
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
  getSearchResults: (query: any) => dispatch(getOrgsBySearch(query)),
});

const SuperSearch = connect(
  null,
  mapDispatchToProps,
)(SuperSearchContainer);

export default withRouter(SuperSearch);
