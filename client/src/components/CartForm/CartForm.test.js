import { CartForm } from './CartForm';
import { render, waitFor, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../../store/store';
const val = {
  classBtn: '.order-submit',
};

describe('Testing CartForm component', () => {
  test('Testing CartForm btn exists', () => {
    const mock = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <CartForm __testFunc__={mock} />
      </Provider>,
    );
    const button = container.querySelector(val.classBtn);
  });

  test('Testing CartForm submit function work', async () => {
    const mock = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <CartForm __testFunc__={mock} />
      </Provider>,
    );
    const name = container.querySelector('input[name="name"]');
    const secondName = container.querySelector('input[name="secondName"]');
    const age = container.querySelector('input[name="age"]');
    const address = container.querySelector('input[name="address"]');
    const mobNumber = container.querySelector('input[name="mobNumber"]');
    const button = container.querySelector('button[type="submit"]');
    await waitFor(() => {
      fireEvent.change(name, {
        target: {
          value: 'Yaroslav',
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(secondName, {
        target: {
          value: 'Horobets',
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(age, {
        target: {
          value: '31',
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(address, {
        target: {
          value: 'Ukraine',
        },
      });
    });
    await waitFor(() => {
      fireEvent.change(mobNumber, {
        target: {
          value: '+380900000000',
        },
      });
    });
    expect(mock).not.toHaveBeenCalled();
    await waitFor(() => {
      fireEvent.click(button);
      expect(mock.mock.calls.length).toBe(1);
    });
  });
});
