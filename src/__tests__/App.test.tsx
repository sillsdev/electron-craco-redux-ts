import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store';
import { render, cleanup, waitForElement } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

const store = configureStore();

const tree = (props?: any) => (
  <Provider store={store}>
    <App />
  </Provider>
);

afterEach(cleanup);

test('can render MediaTab snapshot', async () => {
  const { getByText, container } = render(tree());
  await waitForElement(() => getByText(/^Welcome/i));
  expect(container.firstChild).toMatchSnapshot();
});
