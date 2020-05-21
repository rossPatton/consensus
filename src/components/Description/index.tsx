import React, {PureComponent} from 'react';

import {MediaContext} from '~app/context';

class Description extends PureComponent<
  {description?: string},
  {showAll: boolean}
> {
  static contextType = MediaContext;

  state = {
    showAll: false,
  };

  toggleDescription = () =>
    this.setState({
      showAll: !this.state.showAll,
    });

  render() {
    const {description} = this.props;
    const {showAll} = this.state;
    const {isMobile} = this.context;
    if (typeof description !== 'string' || description === '') {
      return null;
    }

    const descArr = description.split('\n');

    return (
      <>
        {!showAll && (
          <p className="mb-1">
            {descArr?.[0]}
          </p>
        )}
        {(showAll || isMobile)
          && descArr.map((p, i) => (
            <p
              key={i}
              className="mb-1">
              {p}
            </p>
          ))}
        {(descArr.length > 1 && !isMobile) && (
          <button
            className="mb-2 border-0 bg-0"
            onClick={this.toggleDescription}>
            {showAll ? 'Show less' : 'Show more'}
          </button>
        )}
      </>
    );
  }
}

export default Description;
