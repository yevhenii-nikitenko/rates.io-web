import React from 'react';
import GoogleMap from 'google-map-react';
import { useSelector, useDispatch } from 'react-redux';
import Marker from '../Marker/Marker.jsx';
import getCurrentLocation from '../../libs/getCurrentLocation';
import { setCurrentCity, setMapCenter } from '../../store/actions';
import StartingPoint from '../StartingPoint/StartingPoint.jsx';
import GoogleMapsServicesContext from '../../context/googleMapsServices';
import { events } from '../../constants';

const EXCHANGER_CARD_CLASS = '.exchanger-card';

const Map = () => {
    const [map, setMap] = React.useState(null);
    const [circle, setCircle] = React.useState(null);
    const mapCenter = useSelector((state) => state.geo.mapCenter);
    const { list } = useSelector((state) => state.exchanges);
    const distance = useSelector((state) => state.search.distance);

    const { setAutocompleteService, setPlacesService } = React.useContext(
        GoogleMapsServicesContext,
    );

    const addCircle = (map, center, distance) => {
        const circle = new window.google.maps.Circle({
            strokeWeight: 0,
            fillColor: '#2740f5',
            fillOpacity: 0.2,
            map,
            center,
            radius: 1000 * distance
        });

        window.google.maps.event.addListener(circle, events.CLICK, (event) => {
            window.google.maps.event.trigger(map, events.CLICK, event);

            const cardIsOpen = document.querySelector(EXCHANGER_CARD_CLASS);

            if (cardIsOpen) {
                return;
            } else {
                window.google.maps.event.clearListeners(circle, events.CLICK);
                circle.setMap(null);
            }
        });

        setCircle(circle);
    }

    React.useEffect(() => {
        if (!map) return;

        map.panTo(mapCenter);

        if (distance === -1) {
            circle && circle.setMap(null);
            return;
        }

        if (circle) {
            circle.setMap(null);
        }

        setTimeout(() => {
            addCircle(map, mapCenter, distance);
        }, 100)
    }, [mapCenter, distance]);

    const dispatch = useDispatch();
    const handleApiLoaded = ({ maps, map }) => {
        setMap(map);
        setAutocompleteService(new maps.places.AutocompleteService());
        setPlacesService(new maps.places.PlacesService(map));

        map.addListener(events.CLICK, (event) => {
            const cardIsOpen = document.querySelector(EXCHANGER_CARD_CLASS);

            if (cardIsOpen) return;

            dispatch(setMapCenter(event.latLng.toJSON()));
        });

        getCurrentLocation(maps, (location) => {
            dispatch(setMapCenter(location.coords));
            dispatch(
                setCurrentCity({
                    name: location.name,
                    place_id: location.place_id,
                }),
            );
        });
    };

    return (
        <div
            id="root"
            className="map-root"
            style={{ height: '100vh', width: '100%' }}
        >
            <GoogleMap
                bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                    libraries: ['places', 'geometry'],
                }}
                defaultCenter={{
                    lat: 50.463528,
                    lng: 30.5053546,
                }}
                defaultZoom={14}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleApiLoaded}
            >
                {list.map((place) => (
                    <Marker
                        key={place.id}
                        lat={place.lat}
                        lng={place.lng}
                        place={place}
                    />
                ))}
                {mapCenter ? (
                    <StartingPoint lat={mapCenter.lat} lng={mapCenter.lng} />
                ) : null}
            </GoogleMap>
        </div>
    );
};

export default Map;
