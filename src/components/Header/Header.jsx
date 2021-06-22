import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import { RiExchangeDollarLine } from 'react-icons/ri';
import CurrencyForm from '../CurrencyForm/CurrencyForm';
import LocationPicker from '../LocationPicker/LocationPicker';
import { currencies } from '../../constants';

const Header = () => {
    const history = useHistory();
    const gotoAdmin = () => {
        history.push('/admin');
    };

    return (
        <AppBar position="sticky" className="app-bar">
            <Toolbar>
                <Grid container>
                    <Grid item xs={3} style={{ padding: 5 }}>
                        <IconButton color="inherit" edge="start">
                            <RiExchangeDollarLine size="1.2em" color="white" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6} style={{ padding: 5 }}>
                        <LocationPicker />
                    </Grid>
                    <Grid item xs={3} style={{ padding: 5 }}>
                        <IconButton
                            color="inherit"
                            style={{
                                float: 'right',
                            }}
                            onClick={() => gotoAdmin()}
                        >
                            <SupervisedUserCircleIcon size="1.2em" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
            <CurrencyForm currencies={currencies} />
        </AppBar>
    );
};

export default Header;
