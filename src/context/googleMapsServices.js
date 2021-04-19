import React from 'react';

const GoogleMapsServicesContext = React.createContext({
    autocompleteService: null,
    setAutocompleteService: (instance) => {},
    placesService: null,
    setPlacesService: (instance) => {},
});

export default GoogleMapsServicesContext;
