import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import OrderForm from '../../src/components/OrderForm';

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate() {
    return navigate;
  },
}));

test('OrderForm', () => {
  render((
    <OrderForm />
  ));

  screen.getByText('받는 분 성함');
  screen.getByText('받는 분 주소');
  screen.getByText('받는 분께 보내는 메세지');
  screen.getByText('선물하기');

  fireEvent.change(screen.getByLabelText('받는 분 성함'), {
    target: { value: '노승준' },
  });

  fireEvent.change(screen.getByLabelText('받는 분 주소'), {
    target: { value: '서울 종로' },
  });

  fireEvent.change(screen.getByLabelText('받는 분께 보내는 메세지'), {
    target: { value: '받아랏' },
  });

  fireEvent.click(screen.getByText('선물하기'));

  waitFor(() => {
    expect(navigate).toBeCalled();
  });
});
