import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

import Marker from '../Marker/Marker.jsx';
class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 50.463528,
            lng: 30.5053546
        },
        zoom: 14
    };

    constructor(props) {
        super(props);
        this.state = {
            places: [
                {
                    id: '1',
                    lat: 50.46778395757881,
                    lng: 30.5142389197426,
                    name: 'TBA',
                    address: 'Mezhyhirska street, near Apteca',
                    rates: {
                        usd: {
                            bid: 27.6,
                            ask: 27.8
                        },
                        eur: {
                            bid: 32.71,
                            ask: 23.05
                        },
                        rub: {
                            bid: 0.37591,
                            ask: 0.381
                        },
                    }
                },
                {
                    id: '2',
                    lat: 50.47032071457849,
                    lng: 30.521811373320006,
                    name: 'Khoryva',
                    address: 'Naberezhno-Khreschatiskaya cross Khoryva',
                    rates: {
                        usd: {
                            bid: 27.61,
                            ask: 27.79
                        },
                        eur: {
                            bid: 32.75,
                            ask: 23.1
                        },
                        rub: {
                            bid: 0.37590,
                            ask: 0.38112
                        }
                    }
                }
            ]
        };
    }

    render() {
        console.log('this.props.center', this.props);
        console.log('SimpleMap', SimpleMap.defaultProps.center)

        return (
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMap
                    bootstrapURLKeys={{
                        key: 'AIzaSyBZni7SQo5eSmkaZVOFM_Q_xSz9LExDMUA',
                        libraries:['places'],
                    }}
                    defaultCenter={SimpleMap.defaultProps.center}
                    center={this.props.center}
                    defaultZoom={this.props.zoom}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => this.props.handleApiLoaded(map, maps)}
                >
                    {this.state.places.map(place => (
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
    }
}

export default SimpleMap;
