import React from 'react';
import PropTypes from 'prop-types';

const minPasswordLength = 6;
// Email Regex Source: http://jsfiddle.net/ghvj4gy9/
const username = '^(([^<>()[\\]\\.,;:\\s@"]+(\\.[^<>()[\\]\\.,;:\\s@"]+)*)|(".+"))';
const domainName = '@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}';
const domain = '\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';
const EMAIL_REGEX = new RegExp([username, domainName, domain].join(''));

function Login({ history }) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isFormValid, setIsFormValid] = React.useState(false);

  function handleLoginSubmit() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/comidas');
  }

  React.useEffect(() => {
    const formValidation = () => {
      const isValid = EMAIL_REGEX.test(email) && password.length > minPasswordLength;
      setIsFormValid(isValid);
    };

    formValidation();
  }, [email, password]);

  return (
    <main>
      <h1>Login</h1>
      <form>
        <label htmlFor="email">
          Email
          <input
            id="email"
            type="email"
            placeholder="example@example.com"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            required
            data-testid="email-input"
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            id="password"
            type="password"
            placeholder="Senha"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            required
            data-testid="password-input"
          />
        </label>
        <button
          type="button"
          disabled={ !isFormValid }
          onClick={ handleLoginSubmit }
          data-testid="login-submit-btn"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
