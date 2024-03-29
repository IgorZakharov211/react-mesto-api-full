import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import React from 'react';
import Card from '../card/Card';
import Header from '../header/Header';



function Main(props){
  const currentUser = React.useContext(CurrentUserContext);

  return(
    <div>
    <Header email={props.email} signOut={props.signOut}/>
    <main className="content">
      <section className="profile content__profile">
        <div className="profile__avatar">
          <a className="profile__avatar-edit" href="#" onClick={props.onEditAvatar}></a>
          <img src={currentUser.avatar} alt="Аватар" className="profile__image" />
        </div>
    	<div className="profile__text">
    	  <div className="profile__name">
    	    <h1 className="profile__title">{currentUser.name}</h1>
          <button 
          className="profile__edit-button" 
          type="button" 
          aria-label="Редактировать" 
          onClick={props.onEditProfile}>
          </button>
    	  </div>
    	  <p className="profile__subtitle">{currentUser.about}</p>
    	</div>
    	<button className="profile__add-button" type="button" aria-label="Добавить" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements content__elements">
        {
         props.cards.map(({id, name, link, likes, owner, likeCount})=>{
           return <Card key={id} id={id} name={name} link={link} likes={likes} owner={owner} likeCount={likeCount} onCardClick={props.handleCardClick} onCardLike={props.onCardLike} onDeleteCard={props.onCardDelete}/>
         })
        }
      
      </section>
    </main>
    </div>
  );
}


export default Main;