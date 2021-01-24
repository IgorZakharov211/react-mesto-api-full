import React from 'react';
import SuccessSvg from '../../images/info-tooltip-success.svg';
import AgainSvg from '../../images/info-tooltip-again.svg';

function InfoTooltip(props){
    const popupOpened = props.isOpen ? 'popup_opened' : '';
    const successImage = props.isSuccess ? SuccessSvg : AgainSvg;
    const successTitle = props.isSuccess ? props.successText : props.unsuccessText;

  return(
    
    <div className={`popup ${popupOpened}`} id="popup-tooltip">
      <div className="popup__container">
        <button 
        className="popup__button-close" 
        type="button" 
        aria-label="Закрыть" 
        onClick={props.onClose}>
        </button>
        <div className="popup__tooltip">
          <img src={successImage} className="popup__svg" alt={`${successTitle}`} />
          <h2 className="popup__heading">{successTitle}</h2>
        </div>
      </div>
    </div>
  )
}

export default InfoTooltip;