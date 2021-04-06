const LOCALITY = 'locality';

const getCity = (maps, callback) => {
    if (navigator.geolocation) {
        var geocoder = new maps.Geocoder();
        navigator.geolocation.getCurrentPosition((position) => {
            var geolocate = new maps.LatLng(
                position.coords.latitude,
                position.coords.longitude
            );

            geocoder.geocode({
                latLng: geolocate
            }, (results, status) => {
                if (status === maps.GeocoderStatus.OK) {
                    console.log('results', results);
                    if (results[1]) {
                        var city = null;
                        var place_id = null;
                        var c, lc, component;
                        for (var r = 0, rl = results.length; r < rl; r += 1) {
                            var result = results[r];

                            if (!city && result.types[0] === LOCALITY) {
                                for (
                                    c = 0, lc = result.address_components.length; c < lc; c += 1
                                ) {
                                    component = result.address_components[c];

                                    if (component.types[0] === LOCALITY) {
                                        city = component.long_name;
                                        place_id = result.place_id;
                                        break;
                                    }
                                }
                            }
                        }

                        callback({
                            city,
                            place_id,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        });
                    }
                }
            });
        });
    }
};

export default getCity;