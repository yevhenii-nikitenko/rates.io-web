import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { RiExchangeDollarLine } from 'react-icons/ri';
import CurrencyForm from '../CurrencyForm/CurrencyForm';
import LocationPicker from '../LocationPicker/LocationPicker';
import { currencies } from '../../constants';

const Header = () => {
    return (
        <AppBar position="sticky" className="app-bar">
            <Toolbar>
                <Grid container>
                    <Grid item xs={6} style={{ padding: 5 }}>
                        <IconButton color="inherit" edge="start">
                            <RiExchangeDollarLine size="1.2em" color="white" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={6} style={{ padding: 5 }}>
                        <LocationPicker />
                    </Grid>
                </Grid>
            </Toolbar>
            <CurrencyForm mode={'SEARCH'} currencies={currencies} />
        </AppBar>
    );
};

export default Header;
