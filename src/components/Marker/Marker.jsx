import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Pin from '../Pin/Pin';
import Popup from '../Popup/Popup';

import { useDispatch } from 'react-redux';
import { deselectExchange } from '../../store/actions';

const Marker = (props) => {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const handleClickAway = (event) => {
        const clickInsideMap = event.path.find((e) =>
            e.classList?.contains('map-root'),
        );

        if (!clickInsideMap) return;

        dispatch(deselectExchange());
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={open ? handleClickAway : () => {}}>
            <div>
                <Pin handleClick={handleClick} />
                {open ? <Popup place={props.place} /> : null}
            </div>
        </ClickAwayListener>
    );
};

export default Marker;
