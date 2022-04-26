import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import App from '../App';

const emailInputTestId = 'email-input';
const passwordInputTestId = 'password-input';
const submitButtonButtonTestId = 'login-submit-btn';

const invalidPassword = 'senha';
const validPassword = '1234567';
const invalidEmail = 'email';
const validEmail = 'email@email.com';

describe('Requirement 02', () => {
  it('should have an email input', () => {
    render(<Login />);

    expect(screen.getByTestId(emailInputTestId)).toBeInTheDocument();
  });

  it('should have an password input', () => {
    render(<Login />);

    expect(screen.getByTestId(passwordInputTestId)).toBeInTheDocument();
  });

  it('should have a button with text "Entrar"', () => {
    render(<Login />);

    const submitButton = screen.getByTestId(submitButtonButtonTestId);

    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent('Entrar');
  });
});

describe('Requirement 03', () => {
  it('should be able to type an email', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailInputTestId);
    fireEvent.change(inputEmail, { target: {
      value: validEmail,
    } });
    expect(inputEmail.value).toBe(validEmail);
  });
});

describe('Requirement 04', () => {
  it('should be able to type a password', () => {
    render(<Login />);
    const inputPassword = screen.getByTestId(passwordInputTestId);
    fireEvent.change(inputPassword, { target: {
      value: validPassword,
    } });
    expect(inputPassword.value).toBe(validPassword);
  });
});

describe('Requirement 05', () => {
  it('should be disabled if email is invalid', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailInputTestId);
    fireEvent.change(inputEmail, { target: {
      value: invalidEmail,
    } });
    const inputPassword = screen.getByTestId(passwordInputTestId);
    fireEvent.change(inputPassword, { target: {
      value: validPassword,
    } });

    const submitButton = screen.getByTestId(submitButtonButtonTestId);
    expect(submitButton).toBeDisabled();
  });

  it('should be disabled if password is invalid', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailInputTestId);
    fireEvent.change(inputEmail, { target: {
      value: validEmail,
    } });
    const inputPassword = screen.getByTestId(passwordInputTestId);
    fireEvent.change(inputPassword, { target: {
      value: invalidPassword,
    } });

    const submitButton = screen.getByTestId(submitButtonButtonTestId);
    expect(submitButton).toBeDisabled();
  });

  it('should be enabled if email and password are valid', () => {
    render(<Login />);
    const inputEmail = screen.getByTestId(emailInputTestId);
    fireEvent.change(inputEmail, { target: {
      value: validEmail,
    } });
    const inputPassword = screen.getByTestId(passwordInputTestId);
    fireEvent.change(inputPassword, { target: {
      value: validPassword,
    } });

    const submitButton = screen.getByTestId(submitButtonButtonTestId);
    expect(submitButton).not.toBeDisabled();
  });
});

describe('Requirement 06', () => {
  it('should have 2 token into localStorage (mealsToken and cocktailsToken)', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const inputEmail = screen.getByTestId(emailInputTestId);
    fireEvent.change(inputEmail, { target: {
      value: validEmail,
    } });
    const inputPassword = screen.getByTestId(passwordInputTestId);
    fireEvent.change(inputPassword, { target: {
      value: validPassword,
    } });

    const submitButton = screen.getByTestId(submitButtonButtonTestId);
    fireEvent.click(submitButton);
    expect(localStorage.getItem('mealsToken')).toBe('1');
    expect(localStorage.getItem('cocktailsToken')).toBe('1');
  });
});

describe('Requirement 07', () => {
  it('should have user email into localStorage', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = screen.getByTestId(emailInputTestId);
    fireEvent.change(inputEmail, { target: {
      value: validEmail,
    } });
    const inputPassword = screen.getByTestId(passwordInputTestId);
    fireEvent.change(inputPassword, { target: {
      value: validPassword,
    } });

    const submitButton = screen.getByTestId(submitButtonButtonTestId);
    fireEvent.click(submitButton);
    expect(localStorage.getItem('user')).toBe(`{"email":"${validEmail}"}`);
  });
});

describe('Requirement 08', () => {
  it('should redirect to /comidas on submit', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const inputEmail = screen.getByTestId(emailInputTestId);
    fireEvent.change(inputEmail, { target: {
      value: validEmail,
    } });
    const inputPassword = screen.getByTestId(passwordInputTestId);
    fireEvent.change(inputPassword, { target: {
      value: validPassword,
    } });

    const submitButton = screen.getByTestId(submitButtonButtonTestId);
    fireEvent.click(submitButton);
    const recipesPage = screen.getByTestId('recipes-page');
    expect(recipesPage).toBeInTheDocument();
  });
});

describe('Requirement 04', () => {
  it('should be able to type a password', () => {
    render(<Login />);
    const inputPassword = screen.getByTestId('password-input');
    fireEvent.change(inputPassword, { target: {
      value: '1234567',
    } });
    expect(inputPassword.value).toBe('1234567');
  });
});
