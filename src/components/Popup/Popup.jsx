import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
      width: 200,
      position: 'absolute',
    },
  });

const Popup = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                    <CardActionArea>
                        <Typography variant="h5" component="h2">
                            {props.place.name}
                        </Typography>
                    </CardActionArea>
            </CardContent>
            <CardContent>
            <Grid container spacing={2}>
                {Object.keys(props.place.rates).map((currency, index) => (
                    <Grid container key={index} justify="center" spacing={2}>
                        <Grid item xs>
                            {props.place.rates[currency].bid}
                        </Grid>
                        <Grid item xs>
                            {currency}
                        </Grid>
                        <Grid item xs>
                            {props.place.rates[currency].ask}
                        </Grid>
                    </Grid>
                ))}
            </Grid>
            </CardContent>
        </Card>
    );
};

export default Popup;