import React from 'react';
import { Provider } from 'react-redux';
import {create} from 'react-test-renderer';
import configureStore from 'redux-mock-store';

const mockStore = configureStore();

import FileUpload from '.';
import { FileUploadComponent } from './Component';

describe('components/FileUpload', () => {
  let store = mockStore({});

  beforeAll(() => {
    store = mockStore({
      uploads: {
        error: null,
        isLoading: false,
        data: {
          userAvatar: 'hashorsomething',
        },
      },
    });
  });

  it('container renders with cust img hash', () => {
    const component = create((
      <Provider store={store}>
        <FileUpload fieldKey="userAvatar" img="customHash" />
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('container renders', () => {
    const component = create((
      <Provider store={store}>
        <FileUpload fieldKey="userAvatar" />
      </Provider>
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component renders', () => {
    const component = create((
      <Provider store={store}>
        <FileUploadComponent
          fieldKey="userAvatar"
          removeImage={jest.fn()}
          setImage={jest.fn()}
        />
      </Provider>
    ));
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component removeImage', () => {
    const component = create((
      <Provider store={store}>
        <FileUploadComponent
          fieldKey="userAvatar"
          removeImage={jest.fn()}
          setImage={jest.fn()}
        />
      </Provider>
    ));

    component.root.props.children.props.removeImage();

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
