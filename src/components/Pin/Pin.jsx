import React from 'react';
import { RiExchangeDollarLine } from 'react-icons/ri';
import './Pin.css';

const Pin = (props) => {
    return (
        <>
            <div className="pin bounce" onClick={props.handleClick}>
                <RiExchangeDollarLine size="2.7em" color="white" />
            </div>
            {props.pulsate ? <div className="pulse"></div> : null}
        </>
    );
};

export default Pin;
