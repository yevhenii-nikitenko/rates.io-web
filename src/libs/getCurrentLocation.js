const LOCALITY = 'locality';

const getCurrentLocation = (maps, callback) => {
    if (navigator.geolocation) {
        const geocoder = new maps.Geocoder();

        navigator.geolocation.getCurrentPosition((position) => {
            const geolocate = new maps.LatLng(
                position.coords.latitude,
                position.coords.longitude,
            );

            geocoder.geocode(
                {
                    latLng: geolocate,
                },
                (results, status) => {
                    if (status === maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            let city = null;
                            let place_id = null;
                            let c, lc, component;

                            for (
                                let r = 0, rl = results.length;
                                r < rl;
                                r += 1
                            ) {
                                let result = results[r];

                                if (!city && result.types[0] === LOCALITY) {
                                    for (
                                        c = 0,
                                        lc =
                                                result.address_components
                                                    .length;
                                        c < lc;
                                        c += 1
                                    ) {
                                        component =
                                            result.address_components[c];

                                        if (component.types[0] === LOCALITY) {
                                            city = component.long_name;
                                            place_id = result.place_id;
                                            break;
                                        }
                                    }
                                }
                            }

                            callback({
                                name: city,
                                place_id,
                                coords: {
                                    lat: position.coords.latitude,
                                    lng: position.coords.longitude
                                }
                            });
                        }
                    }
                },
            );
        });
    }
};

export default getCurrentLocation;
