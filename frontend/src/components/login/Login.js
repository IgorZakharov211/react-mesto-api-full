import React from 'react';

function Login(props){
  
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(!email || !password){
      return;
    } else{
      props.onLogin(email, password);
    }
  }
  const handleEmailChange = event => setEmail(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);


  return (
    <div className="sign page__sign">
      <div className="sign__container">
        <form className="sign__form" action="#" method="POST" name="login" noValidate onSubmit={handleSubmit}>
          <fieldset className="sign__fieldset">
            <h2 className="sign__heading">Вход</h2>
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
          <button className="sign__button-submit" type="submit">Войти</button>
      </form>
    </div>
  </div>
  
  )
}

export default Login;