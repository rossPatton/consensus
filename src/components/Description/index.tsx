import parse from 'html-react-parser';
import React, {memo, useState} from 'react';

const Description = memo((props: {description?: string}) => {
  const [showAll, toggleShowAll] = useState(false);

  const {description} = props;
  if (typeof description !== 'string' || description === '') {
    return null;
  }

  const descArr = description
    .split('\n')
    .filter(p => !!p)
    .map(p => parse(p));

  return (
    <div className="break-words">
      {!showAll && (
        <p className="mb-1">
          {descArr?.[0]}
        </p>
      )}
      {showAll
        && descArr.map((p, i) => (
          <p
            key={i}
            className="mb-1">
            {p}
          </p>
        ))}
      {descArr.length > 1 && (
        <button
          className="mb-2 border-0 bg-0"
          onClick={() => toggleShowAll(!showAll)}>
          {showAll ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
});

export default Description;
