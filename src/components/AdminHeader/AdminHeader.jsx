import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router';
import IconButton from '@material-ui/core/IconButton';
import { RiExchangeDollarLine } from 'react-icons/ri';

const AdminHeader = () => {
    const history = useHistory();
    const gotoApp = () => {
        history.push('/app');
    };

    return (
        <AppBar position="sticky" className="app-bar">
            <Toolbar>
                <Grid container>
                    <Grid item xs={3} style={{ padding: 5 }}>
                        <IconButton
                            color="inherit"
                            edge="start"
                            onClick={gotoApp}
                        >
                            <RiExchangeDollarLine size="1.2em" color="white" />
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default AdminHeader;
