import React from 'react';
import {Link} from 'react-router-dom';
import favoriteCardProp from './favorite-card.prop';

const STAR_RATING_PART = 20;

function FavoriteCard(props) {
  const {offer} = props;
  const {
    previewImage,
    price,
    title,
    rating,
    type,
    id,
  } = offer;

  return (
    <article className="favorites__card place-card">
      <div className="favorites__image-wrapper place-card__image-wrapper">
        <Link to={`/hotels/${id}`}>
          <img className="place-card__image" src={previewImage} width="150" height="110" alt="Place card"/>
        </Link>
      </div>
      <div className="favorites__card-info place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"/>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
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
          <Link to={`/hotels/:${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

FavoriteCard.propTypes = {
  offer: favoriteCardProp,
};

export default FavoriteCard;
