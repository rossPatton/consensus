import React from 'react';
import render from 'react-test-renderer';

import Form from '.';

// @TODO add checks for all the variants
describe('components/Form', () => {
  it('renders', () => {
    const component = render.create((
      <Form
        encType="multipart/form-data"
        error="Something is wrong"
        name="planEventForm"
        onSubmit={jest.fn()}
        legend={(<h2 className="text-3 mb-1">Legend here</h2>)}
        renderFields={() => (<></>)}
        renderSubmit={() => (<></>)}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with server error', () => {
    const component = render.create((
      <Form
        encType="multipart/form-data"
        error="400:Bad Request"
        name="planEventForm"
        onSubmit={jest.fn()}
        legend={(<h2 className="text-3 mb-1">Legend here</h2>)}
        renderFields={() => (<></>)}
        renderSubmit={() => (<></>)}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
