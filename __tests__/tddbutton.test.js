// @noflow
import React from 'react';
import renderer from 'react-test-renderer';
import TDDButton from '../src/views/Component/TDDButton';

it('renders correctly', () => {
  const tree = renderer.create(<TDDButton />).toJSON();
  expect(tree).toMatchSnapshot();
});
