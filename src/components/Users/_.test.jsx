import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {testGroup1, testUser1} from '~app/constants/jest';

import Users from '.';
import {UsersComponent} from './Component';

const mockStore = configureStore([thunk]);

describe('components/Users', () => {
  it('renders container', () => {
    const store = mockStore({
      isLoading: false,
      usersByGroupId: {data: []},
    });

    const component = render.create((
      <Provider store={store}>
        <Users group={testGroup1} />
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders container alternative props', () => {
    const store = mockStore({
      isLoading: false,
      usersByGroupId: {
        data: [{
          id: 1,
          role: 'member',
        }, {
          id: 2,
          role: 'pending',
        }],
      },
    });

    const component = render.create((
      <Provider store={store}>
        <Users
          group={testGroup1}
          type="pending"
        />
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders empty component', () => {
    const component = render.create((
      <MemoryRouter>
        <UsersComponent
          group={testGroup1}
          isEditable
          isDesktop
          isMobile={false}
          items={[]}
          onRoleFilterChange={jest.fn()}
          onSearchChange={jest.fn()}
          removeUser={jest.fn()}
          showMobileControls={1}
          toggleMobileControls={jest.fn()}
          type="pending"
          users={[testUser1, testUser1]}
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders empty component alternative props', () => {
    const component = render.create((
      <MemoryRouter>
        <UsersComponent
          group={testGroup1}
          isEditable
          isDesktop={false}
          isMobile
          items={[]}
          onRoleFilterChange={jest.fn()}
          onSearchChange={jest.fn()}
          removeUser={jest.fn()}
          showMobileControls={1}
          toggleMobileControls={jest.fn()}
          type="members"
          users={[testUser1, testUser1]}
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders component with users', () => {
    const component = render.create((
      <MemoryRouter>
        <UsersComponent
          group={testGroup1}
          isEditable
          isDesktop={false}
          isMobile
          items={[testUser1, testUser1, testUser1]}
          onRoleFilterChange={jest.fn()}
          onSearchChange={jest.fn()}
          removeUser={jest.fn()}
          showMobileControls={1}
          toggleMobileControls={jest.fn()}
          type="members"
          users={[testUser1, testUser1]}
        />
      </MemoryRouter>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
