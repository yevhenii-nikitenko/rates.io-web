import React from 'react';
import PropTypes from 'prop-types';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Pin from '../Pin/Pin';
import Popup from '../Popup/Popup';
import { operations } from '../../constants';

const setPrice = (currency, operation) => {
    if (!currency) return;
    if (operation === operations.BUY) return currency.ask / currency.count;
    if (operation === operations.SELL) return currency.bid / currency.count;
};

const Marker = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (event) => {
        const clickInsideMap = event.path.find((e) =>
            e.classList?.contains('map-root'),
        );

        if (!clickInsideMap) return;

        props.deselectExchange();

        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={open ? handleClickAway : () => {}}>
            <div>
                <Pin
                    handleClick={handleClick}
                    pulsate={props.pulsate || open}
                    minimize={!!props.currency.code}
                    price={setPrice(
                        props.place.rates[props.currency.code],
                        props.operation,
                    )}
                />
                {open ? <Popup place={props.place} /> : null}
            </div>
        </ClickAwayListener>
    );
};

Marker.propTypes = {
    currencies: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string.isRequired,
            symbol: PropTypes.string,
        }),
    ),
    deselectExchange: PropTypes.func.isRequired,
    pulsate: PropTypes.bool,
    operation: PropTypes.string.isRequired,
    currency: PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string,
    }),
    place: PropTypes.shape({
        id: PropTypes.string.isRequired,
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        placeId: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        phone: PropTypes.string,
        image: PropTypes.string,
        lastUpdate: PropTypes.string,
        baseCurrency: PropTypes.string.isRequired,
        workingHours: PropTypes.shape({
            fullDay: PropTypes.bool.isRequired,
            start: PropTypes.string,
            end: PropTypes.string,
        }).isRequired,
        rates: PropTypes.object,
        // rates: PropTypes.arrayOf(
        //     PropTypes.shape({
        //         code: PropTypes.string,
        //         name: PropTypes.string.isRequired,
        //         symbol: PropTypes.string,
        //     }),
        // ),
    }),
};

export default Marker;
