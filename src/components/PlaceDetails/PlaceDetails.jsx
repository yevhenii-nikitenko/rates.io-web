import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const PlaceDetails = (props) => {
    const [expanded, setExpanded] = React.useState(false);

    return (
        <Card
            style={{
                margin: '0px',
                borderRadius: '0px',
                borderBottom: '1px solid #adadad',
                display: 'flex',
                padding: '10px',
                boxShadow: 'none',
            }}
        >
            <CardMedia
                style={{
                    width: '300px',
                    height: '250px',
                }}
                image="https://img.budgettravel.com/_ampArticle/foreign-currency.jpg?mtime=20190709095321"
            />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 'calc(100% - 300px)',
                }}
            >
                <CardContent
                    style={{
                        boxShadow: 'none',
                        padding: '0px 8px',
                        overflowY: 'hidden',
                        height: expanded ? 'auto' : '204px',
                    }}
                >
                    <Typography
                        style={{
                            fontWeight: '500',
                            fontSize: '16px',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                        }}
                    >
                        {props.exchanger.address}
                    </Typography>
                    <Typography
                        style={{
                            fontSize: '12px',
                        }}
                    >
                        {props.exchanger.name}
                    </Typography>
                    <Typography
                        style={{
                            fontSize: '12px',
                            float: 'left',
                        }}
                    >
                        {props.exchanger.phone}
                    </Typography>
                    <Typography
                        style={{
                            fontSize: '12px',
                            float: 'right',
                        }}
                    >
                        updated: {props.exchanger.lastUpdate || '16:50'}
                    </Typography>
                    <Grid container>
                        <Grid
                            container
                            style={{
                                textAlign: 'center',
                                margin: '4px 0px',
                                padding: '4px',
                            }}
                        >
                            <Grid item xs>
                                Bid
                            </Grid>
                            <Grid item xs>
                                currency
                            </Grid>
                            <Grid item xs>
                                Ask
                            </Grid>
                        </Grid>
                        {Object.keys(props.exchanger.rates).map(
                            (currency, index) => (
                                <Grid
                                    container
                                    key={index}
                                    style={{
                                        textAlign: 'center',
                                        border: '1px solid #adadad',
                                        margin: '4px 0px',
                                        padding: '4px',
                                    }}
                                >
                                    <Grid item xs>
                                        {props.exchanger.rates[currency].bid}
                                    </Grid>
                                    <Grid item xs>
                                        {currency}
                                    </Grid>
                                    <Grid item xs>
                                        {props.exchanger.rates[currency].ask}
                                    </Grid>
                                </Grid>
                            ),
                        )}
                    </Grid>
                </CardContent>

                <div>
                    <CardActions>
                        {expanded ? (
                            <Button
                                size="small"
                                style={{
                                    width: '100%',
                                    background: '#282c34',
                                    color: 'white',
                                }}
                                onClick={() => {
                                    setExpanded(false);
                                }}
                            >
                                Less
                            </Button>
                        ) : (
                            <Button
                                size="small"
                                style={{
                                    width: '100%',
                                    background: '#282c34',
                                    color: 'white',
                                }}
                                onClick={() => {
                                    setExpanded(true);
                                }}
                            >
                                More
                            </Button>
                        )}
                    </CardActions>
                </div>
            </div>
        </Card>
    );
};

export default PlaceDetails;
