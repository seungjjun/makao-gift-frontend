import { render, screen } from '@testing-library/react';
import StoreHeader from '../../src/components/StoreHeader';

test('StoreHeader', () => {
  render(<StoreHeader />);

  screen.getByText('평범한 선물은 주기도 민망하다구요?');
  screen.getByText(/작정하고 준비한/);
  screen.getByText('마카오톡 선물하기에서만 볼 수 있는 특별템 기획전');
});
