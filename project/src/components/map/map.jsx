import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {useSelector} from 'react-redux';
import leaflet from '../../../node_modules/leaflet/dist/leaflet';
import '../../../node_modules/leaflet/dist/leaflet.css';
import useMap from '../../hooks/use-map/use-map';
import {selectActiveCardId} from '../../store/active-card/selectors';

const defaultIcon = leaflet.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const customIcon = leaflet.icon({
  iconUrl: 'img/pin-active.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

function Map({city, activeCityPoints}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);
  const activeCardId = useSelector(selectActiveCardId);

  useEffect(() => {
    const markers = [];
    if (map) {
      activeCityPoints.forEach((point) => {
        markers.push(
          leaflet
            .marker({
              lat: point.location.latitude,
              lng: point.location.longitude,
            }, {
              icon: point.id === activeCardId || point.isCurrentOffer ? customIcon : defaultIcon,
            })
            .addTo(map),
        );
      });
    }
    return () => {
      markers.forEach((marker) => {
        map.removeLayer(marker);
      });
    };
  }, [map, activeCityPoints, activeCardId]);

  return (
    <div
      id="map"
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

Map.propTypes = {
  city: PropTypes.object.isRequired,
  activeCityPoints: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Map;
