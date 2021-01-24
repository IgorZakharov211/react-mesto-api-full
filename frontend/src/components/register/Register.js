import React from 'react';
import { Link } from 'react-router-dom'; 

function Register(props){

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  

  const handleSubmit = (e) =>{
    e.preventDefault();
    props.onRegister(email, password);
  }
  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);
  
  
  return (
    <div className="sign page__sign">
      <div className="sign__container">
        <form className="sign__form" action="#" method="POST" name="register" noValidate onSubmit={handleSubmit}>
          <fieldset className="sign__fieldset">
            <h2 className="sign__heading">Регистрация</h2>
            <label className="sign__field">
              <input 
              type="email" 
              className="sign__input" 
              placeholder="Email" 
              name="email" 
              required 
              id="email-input" 
              minLength="2" 
              maxLength="40"
              value={email}
              onChange={handleEmailChange}  
              />
            </label>
            <label className="sign__field">
              <input 
              type="password" 
              className="sign__input" 
              placeholder="Пароль" 
              name="password" 
              required 
              id="password-input" 
              minLength="6" 
              maxLength="30"
              value={password}
              onChange={handlePasswordChange}
              />
            </label>
          </fieldset>
          <fieldset className="sign__fieldset">
            <button className="sign__button-submit" type="submit">Зарегистрироваться</button>
            <Link to="/sign-in" className="sign__link"><p className="sign__link-text">Уже зарегистрированы? Войти</p></Link>
          </fieldset>
      </form>
    </div>
  </div>
  
  )
}

export default Register;