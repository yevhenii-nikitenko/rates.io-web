import React, { useState } from 'react';
import GoogleMap from 'google-map-react';
import { useSelector, useDispatch } from 'react-redux';
import Marker from '../Marker/Marker.jsx';
import getCity from '../../libs/getCity';
import { setGoogleMapsApi, setCity } from '../../store/actions';

const db = [
    {
        id: '1',
        lat: 50.46778395757881,
        lng: 30.5142389197426,
        placeId: 'ChIJBUVa4U7P1EAR_kYBF9IxSXY',
        name: 'TBA',
        address: 'Mezhyhirska street, near Apteca',
        rates: {
            usd: {
                bid: 27.6,
                ask: 27.8,
            },
            eur: {
                bid: 32.71,
                ask: 23.05,
            },
            rub: {
                bid: 0.37591,
                ask: 0.381,
            },
        },
    },
    {
        id: '3',
        lat: 51.46778395757881,
        lng: 31.5142389197426,
        name: 'Far awayt',
        placeId: 'ChIJlzXucYlI1UYRtThg59NIIyo',
        address: 'xz',
        rates: {
            usd: {
                bid: 27.61,
                ask: 27.56,
            },
            eur: {
                bid: 32.71,
                ask: 23.05,
            },
            rub: {
                bid: 0.3771,
                ask: 0.381,
            },
        },
    },
    {
        id: '2',
        lat: 50.47032071457849,
        lng: 30.521811373320006,
        name: 'Khoryva',
        address: 'Naberezhno-Khreschatiskaya cross Khoryva',
        placeId: 'ChIJBUVa4U7P1EAR_kYBF9IxSXY',
        rates: {
            usd: {
                bid: 27.61,
                ask: 27.79,
            },
            eur: {
                bid: 32.75,
                ask: 23.1,
            },
            rub: {
                bid: 0.3759,
                ask: 0.38112,
            },
        },
    },
];

const Map = (props) => {
    const center = useSelector((state) => state.googleMaps.center);
    const city = useSelector((state) => state.googleMaps.city);

    React.useEffect(() => {
        console.log('city', city);
        setPlaces(db);
        // city && setPlaces(db.filter((place) => place.placeId === city.place_id));
    }, [city]);

    const dispatch = useDispatch();
    const [places, setPlaces] = useState([]);

    const handleApiLoaded = ({ maps, map }) => {
        let marker;

        map.addListener('click', (mapsMouseEvent) => {
            const latLng = mapsMouseEvent.latLng.toJSON();

            if (marker) marker.setMap(null);

            marker = new maps.Marker({
                position: latLng,
                map,
            });
        });

        getCity(maps, (data) => {
            console.log('ddddd', data);
            setPlaces(db.filter((place) => place.placeId === data.place_id));
            dispatch(setCity(data.city));
        });

        dispatch(setGoogleMapsApi({ map, maps }));
    };

    return (
        <div className="map-root" style={{ height: '100vh', width: '100%' }}>
            <GoogleMap
                bootstrapURLKeys={{
                    key: 'AIzaSyBZni7SQo5eSmkaZVOFM_Q_xSz9LExDMUA',
                    libraries: ['places'],
                }}
                defaultCenter={{
                    lat: 50.463528,
                    lng: 30.5053546,
                }}
                center={center}
                defaultZoom={14}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={handleApiLoaded}
            >
                {places.map((place) => (
                    <Marker
                        key={place.id}
                        lat={place.lat}
                        lng={place.lng}
                        place={place}
                    />
                ))}
            </GoogleMap>
        </div>
    );
};

export default Map;
