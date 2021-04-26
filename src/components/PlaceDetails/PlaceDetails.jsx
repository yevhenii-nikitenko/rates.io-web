import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const PlaceDetails = (props) => {
    return (
        <Card style={{
            margin: '0px 10px', 
            borderRadius: '0px',
            borderBottom: '1px solid #282c34',
            display: 'flex',
            padding: '5px'
        }}>
            <CardMedia
                image="https://img.budgettravel.com/_ampArticle/foreign-currency.jpg?mtime=20190709095321"
                title="pic"
                style={{
                    width: '35%'
                }}
            />
            <CardContent style={{
                width: '60%'
            }}>
                <Typography style={{
                    fontWeight: '500',
                    fontSize: '16px',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden'
                }}>
                    {props.exchanger.address}
                </Typography>
                <Typography style={{
                    fontSize: '12px'
                }}>
                    {props.exchanger.name}
                </Typography>
                <Typography style={{
                    fontSize: '12px'
                }}>
                    {props.exchanger.phone}
                </Typography>
                <Grid container>
                    <Grid
                        container
                        style={{ textAlign: 'center', margin: '4px 0px', padding: '4px' }}
                    >
                        <Grid item xs>Bid</Grid>
                        <Grid item xs>currency</Grid>
                        <Grid item xs>Ask</Grid>
                    </Grid>
                    {Object.keys(props.exchanger.rates).map(
                        (currency, index) => (
                            <Grid
                                container
                                key={index}
                                style={{ textAlign: 'center', border: '1px solid #282c34', margin: '4px 0px', padding: '4px' }}
                            >
                                <Grid item xs>{props.exchanger.rates[currency].bid}</Grid>
                                <Grid item xs>{currency}</Grid>
                                <Grid item xs>{props.exchanger.rates[currency].ask}</Grid>
                            </Grid>
                        ),
                    )}
                </Grid>
                <Typography>
                    updated: {props.exchanger.lastUpdate || '16:50'}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default PlaceDetails;
