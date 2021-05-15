import React from 'react';
import Typography from '@material-ui/core/Typography';
import { RiExchangeDollarLine } from 'react-icons/ri';
import './Pin.css';

const Pin = (props) => {
    return (
        <>
            {props.price ? (
                <Typography
                    style={{
                        background: '#282c34',
                        color: 'white',
                        padding: '5px',
                        display: 'initial',
                    }}
                    onClick={props.handleClick}
                >
                    {props.price}
                </Typography>
            ) : (
                <div className={'pin bounce'} onClick={props.handleClick}>
                    <RiExchangeDollarLine size="2.7em" color="white" />
                </div>
            )}

            {props.pulsate ? <div className="pulse"></div> : null}
        </>
    );
};

export default Pin;
