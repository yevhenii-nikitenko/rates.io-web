import React from 'react';
import PropTypes from 'prop-types';
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
        <Card
            className="exchanger-card"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <CardActions>
                <Button
                    fullWidth
                    onClick={() => dispatch(selectExchange(props.place))}
                >
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
                            spacing={2}
                        >
                            <Grid item xs>
                                <Paper className="rate-row">
                                    {props.place.rates[currency].bid}
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className="rate-row">
                                    {props.place.rates[currency].count === 1
                                        ? ''
                                        : props.place.rates[currency].count +
                                          ' '}
                                    {currency}
                                </Paper>
                            </Grid>
                            <Grid item xs>
                                <Paper className="rate-row">
                                    {props.place.rates[currency].ask}
                                </Paper>
                            </Grid>
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    );
};

Popup.propTypes = {
    // TODO
    // rename to exchanger
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

export default Popup;
