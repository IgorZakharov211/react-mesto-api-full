import {CurrentUserContext} from '../contexts/CurrentUserContext';
import React, { useDebugValue, useEffect } from 'react';
import { Switch, Route, useHistory} from 'react-router-dom';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';
import PopupWithForm from './popup_with_form/PopupWithForm';
import EditProfilePopup from './edit_profile_popup/EditProfilePopup';
import EditAvatarPopup from './edit_avatar_popup/EditAvatarPopup';
import ImagePopup from '../components/image_popup/ImagePopup';
import * as api from '../utils/api';
import AddPlacePopup from './add_place_popup/AddPlacePopup';
import Register from './register/Register';
import Login from './login/Login';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
import InfoTooltip from './infoTooltip/InfoTooltip';
import * as Auth from '../utils/auth';


function App() {
  const [userEmail, setUserEmail] = React.useState('');
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);
  const [isTooltipSuccess, setTooltipSuccess] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({name: '', link: ''});
  const [currentUser, setCurrentUser] = React.useState({name: 'Имя', about: 'Профессия', avatar: ''});
  const [currentToken, setCurrentToken] = React.useState({token: ''});
  const [cards, setCards] = React.useState([]);
  const history = useHistory();

  function tokenCheck(){
    if(localStorage.getItem('token')){
      const jwt = localStorage.getItem('token');
      Auth.getContent(jwt).then((res)=>{
        setUserEmail(res.email);
        setCurrentUser({id: res._id, name: res.name, about: res.about, avatar: res.avatar});
        setCurrentToken({token: jwt});
        handleInitialCards(jwt);
        setLoggedIn(true);
        history.push('/');
      })
      .catch((err) => console.log(err));
    }
  }

  useEffect(() => {tokenCheck()}, [isLoggedIn])
  
  function handleLogin(email, password){
    Auth.authorize(email, password).then((res) => {
      if(res.token){
        localStorage.setItem('token', res.token);
        setLoggedIn(true);
        history.push('/');
      }
    })
    .catch((err)=> {console.log(err)})
  }


  function handleInitialCards(token){
    api.getInitialCards(token).then((data) =>{
      setCards(data.map((item) => ({
        key: item._id,
        id: item._id,
        name: item.name,
        link: item.link,
        likes: item.likes,
        owner: item.owner,
        likeCount: item.likes.length
      })));
    })
    .catch((err) =>{
      console.log(err);
    });
  }

  function changeLike(newCard, card){
    const newCards = cards.map((c) => {
      if(c.id === card.id) {
        return {
          key: newCard.data._id,
          id: newCard.data._id,
          name: newCard.data.name,
          link: newCard.data.link,
          likes: newCard.data.likes,
          owner: newCard.data.owner,
          likeCount: newCard.data.likes.length
        };
      } else{ 
        return c;
      }
    });
    setCards(newCards);
  }

  function handleCardLike({card}) {
    const isLiked = card.likes.some(i => i === currentUser.id);
    if (isLiked){
      api.deleteLike(card.id, currentToken.token).then((newCard) => {
        changeLike(newCard, card);
      })
      .catch((err) =>{
        console.log(err);
      });
    } else{
      api.putLike(card.id, currentToken.token).then((newCard) => {
        changeLike(newCard, card);
      })
      .catch((err) =>{
        console.log(err);
      });
    }
  } 

  function handleDeleteCard(id){
    api.deleteCard(id, currentToken.token).then((data) => {
      const cardsFilter = cards.filter((item) => {
        return id !== item.id;
      });
      setCards(cardsFilter);
    })
    .catch((err) =>{
      console.log(err);
    });
  }
 
  
  function handleEditAvatarClick(){
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick(){
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick(){
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups(){
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardPopupOpen(false);
    setInfoTooltipOpen(false);
  }

  function handleCardClick({name, link}){
    setCardPopupOpen(true);
    setSelectedCard({name: name, link: link});
  }

  function handleUpdateUser({name, about}){
    api.patchMyInfo(name, about, currentToken.token).then((res) => {
      setCurrentUser({id: res.data._id, name: res.data.name, about: res.data.about, avatar: res.data.avatar});
      closeAllPopups();
    })
    .catch((err) =>{
      console.log(err);
    });
  }

  function handleUpdateAvatar({avatar}){
    api.patchMyAvatar(avatar, currentToken.token).then((res) => {
      setCurrentUser({id: res.data._id, name: res.data.name, about: res.data.about, avatar: res.data.avatar});
      closeAllPopups();
    })
    .catch((err) =>{
      console.log(err);
    });
  }

  function handleAddPlaceSubmit({title, link}){
    api.postCard(title, link, currentToken.token).then((res) => {
      const newCard = {
        key: res._id,
        id: res._id,
        name: res.name,
        link: res.link,
        likes: res.likes,
        owner: res.owner,
        likeCount: res.likes.length
      }
      setCards([newCard, ...cards])
      closeAllPopups();
    })
    .catch((err) =>{
      console.log(err);
    });
  }


  function handleSignOut(){
    localStorage.removeItem('token');
    setCurrentToken({token: ''});
    history.push('/');
    setLoggedIn(false);
  }

  function handleRegister(email, password){
    if (email && password){
      Auth.register(email, password).then((res) =>{
        if (res.statusCode !== 400){
          setInfoTooltipOpen(true);
          setTooltipSuccess(true);
          history.push('/sign-in');
        } else{
          console.log('Некорректно заполнено одно из полей');
          setInfoTooltipOpen(true);
          setTooltipSuccess(false);
        }
      })
      .catch(() => {
        setInfoTooltipOpen(true);
        setTooltipSuccess(false);
      })
      } else{
        setInfoTooltipOpen(true);
        setTooltipSuccess(false);
        console.log('Не передано одно из полей');
    }}

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      
      <Switch>
        <Route path="/sign-up">
          <Header type="register" />
          <Register 
          onClose={closeAllPopups} 
          onRegister={handleRegister}/>
        </Route>
        <Route path="/sign-in">
          <Header type="login" />
          <Login 
          onClose={closeAllPopups} 
          onLogin={handleLogin}/>
        </Route>
        <ProtectedRoute 
          path="/" 
          loggedIn={isLoggedIn} 
          type="email" 
          onEditProfile={handleEditProfileClick} 
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          handleCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleDeleteCard}
          email={userEmail}
          signOut={handleSignOut}
          component={Main}>
        </ProtectedRoute>
        
      </Switch>
      <Footer />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
      <PopupWithForm name="confirm" title="Вы уверены?" isOpen={false} onClose={closeAllPopups}>
        <button className="popup__button-save" type="submit">Да</button>
      </PopupWithForm>
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isCardPopupOpen} />
      <InfoTooltip 
      isOpen={isInfoTooltipOpen} 
      onClose={closeAllPopups} 
      isSuccess={isTooltipSuccess} 
      successText={'Вы успешно зарегистрировались!'}
      unsuccessText={'Что-то пошло не так! Попробуйте ещё раз.'}
      />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
