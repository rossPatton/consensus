import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import Form from '.';

const mockStore = configureStore();

describe('components/Form', () => {
  it('renders', () => {
    const component = render.create((
      <Provider store={mockStore({})}>
        <Form
          encType="multipart/form-data"
          error="Something is wrong"
          name="planEventForm"
          onSubmit={jest.fn()}
          legend={(<h2 className="text-3 mb-1">Legend here</h2>)}
          renderFields={() => (<></>)}
          renderSubmit={() => (<></>)}
        />
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with string legend and captcha', () => {
    const component = render.create((
      <Provider store={mockStore({})}>
        <Form
          encType="multipart/form-data"
          error="Something is wrong"
          includeCaptcha
          name="planEventForm"
          onSubmit={jest.fn()}
          legend="Legend here"
          renderFields={() => (<></>)}
          renderSubmit={() => (<></>)}
        />
      </Provider>
    )).root;

    const hcaptcha = component.findByProps({id: 'hcaptcha-wrapper'});
    expect(hcaptcha).toBeDefined();
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
