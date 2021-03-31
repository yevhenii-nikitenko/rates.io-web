import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import { selectExchange } from '../../store/actions';

import { useDispatch } from 'react-redux';

import './Popup.css';

const Popup = (props) => {

    const dispatch = useDispatch();

    return (
        <Card className="exchanger-card">
            <CardActions>
                <Button
                    fullWidth
                    onClick={() => dispatch(selectExchange(props.place))}>
                    {props.place.name}
                </Button>
            </CardActions>
            <CardContent>
            <Grid container spacing={2}>
                {Object.keys(props.place.rates).map((currency, index) => (
                    <Grid
                        container
                        key={index}
                        justify="center"
                        spacing={2}>
                        <Grid item xs>
                            <Paper className="rate-row">{props.place.rates[currency].bid}</Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className="rate-row">{currency}</Paper>
                        </Grid>
                        <Grid item xs>
                            <Paper className="rate-row">{props.place.rates[currency].ask}</Paper>
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            </CardContent>
        </Card>
    );
};

export default Popup;