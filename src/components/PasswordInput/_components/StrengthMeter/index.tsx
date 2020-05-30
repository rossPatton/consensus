import cx from 'classnames';
import React, {memo} from 'react';

const StrengthMeter = memo((props: {password: string}) => {
  const len = props.password.length;

  let inlineStyle = {};
  if (len > 0) {
    inlineStyle = {
      height: '5px',
      width: len > 0 ? `${len * 3.125}%` : '0%',
    };
  }

  return (
    <>
      {len > 0 && (
        <div className="mb-2 flex items-center">
          <span className="text-sm mr-2">
            {len < 12 && 'Weak'}
            {(len >= 12 && len < 24) && 'Passable'}
            {(len >= 24 && len < 32) && 'Strong'}
            {(len >= 32) && 'Very Strong'}
          </span>
          <div className="bg-white w-full border rounded-lg p-1">
            <span
              style={inlineStyle}
              className={cx({
                'rounded-lg block transition-all': true,
                'bg-red-1': len < 12,
                'bg-yellow-2': len >= 12 && len < 24,
                'bg-green-1': len >= 24 && len < 32,
                'bg-green-2': len >= 32,
              })}
            />
          </div>
        </div>
      )}
      <ul className="text-sm leading-tight list-disc ml-2 mb-3">
        <li className="mb-1">Passwords must be at least 12 characters long, and can&apos;t be too common like &quot;password&quot;.</li>
        <li className="mb-1">We strongly recommend adding numbers, capitals, or special characters, but they aren&apos;t required.</li>
        <li className="mb-1">Use a password manager to generate and save strong passwords!</li>
      </ul>
    </>
  );
});

export default StrengthMeter;
