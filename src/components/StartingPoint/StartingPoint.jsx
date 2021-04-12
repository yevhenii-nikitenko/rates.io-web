import React from 'react';

import MyLocationIcon from '@material-ui/icons/MyLocation';

const StartingPoint = () => {
    return (
        <MyLocationIcon
            size="2em"
            style={{
                color: '#0d1f36',
                textAlign: 'center',
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
            }}
        />
    );
};

export default StartingPoint;
