import React, {PureComponent} from 'react';

class Description extends PureComponent<
  {description: string},
  {showAll: boolean}
> {
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

    return (
      <>
        {!showAll && (
          <p className="mb-1">
            {description.split('\n')[0]}
          </p>
        )}
        {showAll
          && description.split('\n').map((p, i) => (
            <p
              key={i}
              className="mb-1">
              {p}
            </p>
          ))}
        <button
          className="mb-2 border-0 bg-0"
          onClick={this.toggleDescription}>
          {showAll ? 'Show less' : 'Show more'}
        </button>
      </>
    );
  }
}

export default Description;
