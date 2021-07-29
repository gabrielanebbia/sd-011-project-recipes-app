import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';


function Login() {
  const [user, setUser] = useState([]);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

  /* aqui faço a minha validação de email usando regex */
  function handleEmail(e) {
    const Email = e;
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+$/.test(Email);
    setUser(Email);
    return setEmail(regex);
  }

  /* aqui faço a minha validação do tamanho da senha*/
  function handlePassword(e) {
    const Password = e;
    const minLength = 6;
    let validPass = false;
    if (Password.length > minLength) {
      validPass = true;
    }
    return setPassword(validPass);
  }
/* aqui salvo o token no local store */
  function setLocalStorage() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: user }));
    };

  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          data-testid="email-input"
          placeholder="Digite seu Email"
          onChange={ ({ target }) => handleEmail(target.value) }
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>impo
        <Form.Control
          type="password"
          data-testid="password-input"
          placeholder="Password"
          onChange={ ({ target }) => handlePassword(target.value) }
        />
      </Form.Group>
      <Link to="/comidas">
        <Button
          variant="primary"
          type="button"
          data-testid="login-submit-btn"
          disabled={ !email + !password }
          value={ user }
          onChange={ (e) => setUser(e.target.value) }
          onClick={ setLocalStorage }
        >
          Entrar
        </Button>
      </Link>
    </Form>
  );
}
export default Login;
