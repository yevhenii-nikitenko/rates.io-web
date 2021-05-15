import React from 'react';
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

export default Marker;
