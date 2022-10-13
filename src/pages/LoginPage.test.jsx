// import { render } from '@testing-library/react';

// import LoginForm from '../components/LoginForm';

// const register = jest.fn();
// const handleSubmit = jest.fn();
// const errors = jest.fn();

// jest.mock('react-hook-form', () => ({
//   useForm() {
//     return {
//       register, handleSubmit, errors,
//     };
//   },
// }));

// const navigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   useNavigate() {
//     return navigate;
//   },
// }));

// const isLoginFail = jest.fn();
// const login = jest.fn();

// jest.mock('../hooks/useShopStore', () => () => ({
//   isLoginFail,
//   login,
// }));

// const changeUserId = jest.fn();

// jest.mock('../hooks/useOrderStore', () => () => ({
//   changeUserId,
// }));

// test('LoginPage', () => {
//   render(<LoginForm />);
// });
