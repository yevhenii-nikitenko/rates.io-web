import React from 'react';
import PropTypes from 'prop-types';
import { RiExchangeDollarLine } from 'react-icons/ri';
import './Pin.css';

const Pin = (props) => {
    return (
        <>
            {props.price ? (
                <>
                    <div className={'pin bounce'} onClick={props.handleClick}>
                        {props.price ? (
                            <div
                                style={{
                                    background: '#282c34',
                                    color: 'white',
                                    padding: '10px',
                                    display: 'initial',
                                    transform: 'rotate(45deg)',
                                    position: 'absolute',
                                    left: '-50%',
                                    textAlign: 'center',
                                    width: '40px',
                                }}
                            >
                                {props.price}
                            </div>
                        ) : (
                            <RiExchangeDollarLine size="2.7em" color="white" />
                        )}
                    </div>
                </>
            ) : (
                <div
                    className={
                        'pin bounce ' + (props.minimize ? 'inactive-pin' : '')
                    }
                    onClick={props.handleClick}
                >
                    <RiExchangeDollarLine size="2.7em" color="white" />
                </div>
            )}

            {props.pulsate ? <div className="pulse"></div> : null}
        </>
    );
};

Pin.propTypes = {
    minimize: PropTypes.bool,
    handleClick: PropTypes.func.isRequired,
    price: PropTypes.number,
};

export default Pin;
