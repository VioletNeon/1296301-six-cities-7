import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {APIRoute, AuthorizationStatus} from '../../const';
import offerCardProp from './offer-card.prop';
import {useSelector, useDispatch} from 'react-redux';
import {markFavoriteInList} from '../../store/api-actions';
import {selectAuthorizationStatus} from '../../store/user/selectors';

const STAR_RATING_PART = 20;

function OfferCard(props) {
  const {
    offer,
    onCardHover,
    isNearPlace,
    onBookmarkButtonClick,
  } = props;

  const {
    isPremium,
    previewImage,
    price,
    title,
    isFavorite,
    rating,
    type,
    id,
  } = offer;

  const authorizationStatus = useSelector(selectAuthorizationStatus);
  const dispatch = useDispatch();

  const favoriteCardURL = `${APIRoute.FAVORITE}/${id}/${Number(!isFavorite)}`;

  const handleCardHover = (evt, cardId = 0) => isNearPlace ? evt.stopPropagation() : onCardHover(cardId);
  const handleFavoriteClick = () => {
    authorizationStatus === AuthorizationStatus.NO_AUTH ? onBookmarkButtonClick() : dispatch(markFavoriteInList(favoriteCardURL));
  };

  return (
    <article
      className={`${isNearPlace ? 'near-places__card' : 'cities__place-card'} place-card`}
      onMouseLeave={handleCardHover}
      onMouseOver={(evt) => handleCardHover(evt, id)}
    >
      {isPremium && <div className="place-card__mark"><span>Premium</span></div>}
      <div className={`${isNearPlace ? 'near-places__image-wrapper' : 'cities__image-wrapper'} place-card__image-wrapper`}>
        <Link to={`/hotels/${id}`}>
          <img className="place-card__image" src={previewImage} width="260" height="200" alt="Place card"/>
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${isFavorite && 'place-card__bookmark-button--active'}`}
            onClick={handleFavoriteClick}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${Math.round(rating)*STAR_RATING_PART}%`}}>
            </span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/hotels/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

OfferCard.propTypes = {
  offer: offerCardProp,
  onCardHover: PropTypes.func.isRequired,
  isNearPlace: PropTypes.bool.isRequired,
  onBookmarkButtonClick: PropTypes.func.isRequired,
};

export default OfferCard;
