import React from 'react';
import headerLogo from '../../images/header-logo.svg';
import { Link, Switch, Route } from 'react-router-dom'; 



function Header(props){
  const [isShowMoreOpen, setShowMoreOpen] = React.useState(true);
  const [isUserMobileDisplay, setUserMobileDisplay] = React.useState(false);

  const showUserMobile = (isUserMobileDisplay) ? "mobile-user_display_block" : "";
  const showShowMore = (isShowMoreOpen) ? "" : "header__show-more_image_close";

  function handleShowMore(){
    if (isShowMoreOpen) {
      setUserMobileDisplay(true);
      setShowMoreOpen(false); 
    } else{
      setUserMobileDisplay(false);
      setShowMoreOpen(true)
    }
  }

  return(
  <Switch>
    <Route exact path="/">
      <div className={`mobile-user ${showUserMobile}`}>
        <p className="mobile-user__email">{props.email}</p>
        <Link to={'/sign-in'} onClick={props.signOut} className="mobile-user__link">Выйти</Link>
      </div>
      <header className="header page__header">
        <img src={headerLogo} alt="Логотип" className="header__logo" />
        <button onClick={handleShowMore} className={`header__show-more ${showShowMore}`}></button>
        <div className={`header__user`}>
          <p className="header__email">{props.email}</p>
          <Link to={'/sign-in'} onClick={props.signOut} className="header__link header__link_color_grey">Выйти</Link>
        </div>
      </header>
      </Route>
      <Route path="/sign-up">
      <header className="header page__header">
        <img src={headerLogo} alt="Логотип" className="header__logo" />
        <Link className="header__link" to="/sign-in">Войти</Link>
      </header>
      </Route>
      <Route path="/sign-in">
      <header className="header page__header">
        <img src={headerLogo} alt="Логотип" className="header__logo" />
        <Link className="header__link" to="/sign-up">Регистрация</Link>
      </header>
    </Route>
  </Switch>
  )
}


export default Header;
