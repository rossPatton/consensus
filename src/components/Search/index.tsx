import React from 'react';
import {withRouter} from 'react-router';

class SearchContainer extends React.PureComponent<any, any> {
  state = {
    value: '',
  };

  onChange = (ev: React.ChangeEvent<HTMLInputElement>) =>
    this.setState({
      value: ev.currentTarget.value,
    })

  onSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    return this.props.history.push(`/search?value=${this.state.value}`);
  }

  render() {
    const {value} = this.state;

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
              value={value}
            />
          </label>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(SearchContainer);
