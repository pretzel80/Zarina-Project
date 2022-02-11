import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Cart from './Cart';
import store from '../../store/store';

describe('Cart tests', () => {
  test('Smoke test Cart', () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>,
    );
  });
});
