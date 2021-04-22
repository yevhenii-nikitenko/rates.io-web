import React from 'react';
import GoogleMap from 'google-map-react';
import { useSelector, useDispatch } from 'react-redux';
import Marker from '../Marker/Marker.jsx';
import getCurrentLocation from '../../libs/getCurrentLocation';
import { setCurrentCity, setMapCenter } from '../../store/actions';
import StartingPoint from '../StartingPoint/StartingPoint.jsx';
import GoogleMapsServicesContext from '../../context/googleMapsServices';

const Map = (props) => {
    const mapCenter = useSelector((state) => state.geo.mapCenter);
    const { setAutocompleteService, setPlacesService } = React.useContext(
        GoogleMapsServicesContext,
    );

    const dispatch = useDispatch();
    const handleApiLoaded = ({ maps, map }) => {
        setAutocompleteService(new maps.places.AutocompleteService());
        setPlacesService(new maps.places.PlacesService(map));

        map.addListener('click', (event) => {
            const cardIsOpen = document.querySelector('.exchanger-card');

            if (cardIsOpen) return;

            const latLng = event.latLng.toJSON();

            dispatch(setMapCenter(latLng));
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
                    key: 'AIzaSyBZni7SQo5eSmkaZVOFM_Q_xSz9LExDMUA',
                    libraries: ['places'],
                }}
                defaultCenter={{
                    lat: 50.463528,
                    lng: 30.5053546,
                }}
                center={mapCenter}
                defaultZoom={14}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleApiLoaded}
            >
                {props.places.map((place) => (
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
