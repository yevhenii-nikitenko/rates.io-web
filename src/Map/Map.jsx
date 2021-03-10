import React, { Component } from 'react';
import GoogleMap from 'google-map-react';

import Place from '../Place/Place.jsx';

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.95,
            lng: 30.33
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMap
                    bootstrapURLKeys={{ key: 'AIzaSyBZni7SQo5eSmkaZVOFM_Q_xSz9LExDMUA' }}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                >
                    <Place
                        lat={59.955413}
                        lng={30.337844}
                        text="My Marker"
                    />
                </GoogleMap>
            </div>
        );
    }
}

export default SimpleMap;
