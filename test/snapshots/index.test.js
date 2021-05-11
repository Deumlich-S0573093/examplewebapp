import React from 'react';
import renderer from 'react-test-renderer';
import Link from '../Link.react';

it('renders correctly', () => {
    const tree = renderer
        .create(<Link page="index">Index</Link>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});