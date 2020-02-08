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
    return (
      <form
        className="mR2"
        name="search"
        autoComplete="off"
        onSubmit={this.onSubmit}
        action="/api/v1/search">
        <fieldset>
          <div className="fx aiCtr rel">
            <input
              className="p3 br4"
              value={this.state.value}
              onChange={this.onChange}
              placeholder="Eg, TWC, DSA"
              type="search"
            />
            <button className="fw600 abs r mR2 p1 bgBlue white">
              <legend>Search</legend>
            </button>
          </div>
        </fieldset>
      </form>
    );
  }
}

export default withRouter(SearchContainer);
