import React from 'react';
import { Provider } from 'react-redux';
import render from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import {testGroup1} from '~app/constants/jest';

import Groups from '.';
import {Group} from './_components';
import {GroupsComponent} from './Component';

const mockStore = configureStore();

describe('components/Groups', () => {
  it('renders container', () => {
    const store = mockStore({
      roles: [{groupId: 1, role: 'facilitator'}],
    });

    const component = render.create((
      <Provider store={store}>
        <Groups
          showPending
          groups={[testGroup1]}
        />
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders container with no groups', () => {
    const store = mockStore({
      roles: [{groupId: 1, role: 'facilitator'}],
    });

    const component = render.create((
      <Provider store={store}>
        <Groups groups={[]} />
      </Provider>
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders groups component', () => {
    const component = render.create((
      <GroupsComponent
        groups={[testGroup1]}
        leaveGroup={jest.fn()}
        pendingGroups={[testGroup1]}
        setHover={jest.fn()}
        roles={[{groupId: 1, role: 'facilitator'}]}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders individual group component with type', () => {
    const component = render.create((
      <Group
        group={testGroup1}
        groups={[testGroup1]}
        groupType="member"
        hoverIndex={1}
        index={1}
        leaveGroup={jest.fn()}
        pendingGroups={[]}
        setHover={jest.fn()}
        showType
        roles={[{groupId: 1, role: 'member'}]}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders editable group component with location', () => {
    const component = render.create((
      <Group
        group={testGroup1}
        groups={[testGroup1]}
        groupType="member"
        hoverIndex={1}
        index={1}
        isEditable
        leaveGroup={jest.fn()}
        pendingGroups={[]}
        setHover={jest.fn()}
        showLocation
        roles={[{groupId: 1, role: 'pending'}]}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders individual pending group component with category', () => {
    const component = render.create((
      <Group
        group={testGroup1}
        groups={[testGroup1]}
        groupType="member"
        hoverIndex={1}
        index={1}
        leaveGroup={jest.fn()}
        pendingGroups={[]}
        setHover={jest.fn()}
        showCategory
        roles={[{groupId: 1, role: 'member'}]}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders editable pending group component as list', () => {
    const component = render.create((
      <Group
        asList
        group={testGroup1}
        groups={[testGroup1]}
        groupType="pending"
        hoverIndex={1}
        index={1}
        isEditable
        leaveGroup={jest.fn()}
        pendingGroups={[]}
        setHover={jest.fn()}
        roles={[{groupId: 1, role: 'pending'}]}
      />
    ));

    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('group component onClick', () => {
    const component = render.create((
      <Group
        asList
        group={testGroup1}
        groups={[testGroup1]}
        groupType="member"
        hoverIndex={1}
        index={1}
        isEditable
        leaveGroup={jest.fn()}
        pendingGroups={[]}
        setHover={jest.fn()}
        roles={[{groupId: 1, role: 'pending'}]}
      />
    ));

    const tree = component.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
