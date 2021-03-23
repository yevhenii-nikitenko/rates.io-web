import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Pin from '../Pin/Pin';
import Popup from '../Popup/Popup';

import { useDispatch } from 'react-redux';
import { toggleMarkerIsSelected } from '../../store/actions';

const Marker = (props) => {
    const [open, setOpen] = React.useState(false);

    const dispatch = useDispatch();
  
    const handleClick = () => {
      setOpen((prev) => !prev);

      setTimeout(() => {
        dispatch(toggleMarkerIsSelected(true));
      })
      
    };
  
    const handleClickAway = () => {
      dispatch(toggleMarkerIsSelected(false));
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
