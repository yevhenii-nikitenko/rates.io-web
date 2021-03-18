import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import './Marker.css';
import Pin from '../Pin/Pin';
import Popup from '../Popup/Popup';

const Marker = (props) => {
    const [open, setOpen] = React.useState(false);
  
    const handleClick = () => {
      setOpen((prev) => !prev);
    };
  
    const handleClickAway = () => {
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
