import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CurrencyForm from '../CurrencyForm/CurrencyForm';

const PlaceDetails = (props) => {
    const [expanded, setExpanded] = React.useState(props.expanded);

    return (
        <Card
            style={{
                margin: '0px',
                borderRadius: '0px',
                borderBottom: '1px solid #adadad',
                padding: '10px',
                boxShadow: 'none',
            }}
        >
            <div style={{
                display: 'flex',
            }}>
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
                            height: expanded ? 'auto' : '202px',
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
                            {expanded ? null : (
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
            </div>
            {expanded ? 
                <div>
                    <CardActions>
                        <CurrencyForm mode={'CALC'} />
                    </CardActions>
                    <Button
                        size="small"
                        style={{
                            width: 'calc(100% - 310px)',
                            background: '#282c34',
                            float: 'right',
                            color: 'white',
                        }}
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >Less</Button>
                </div>
                :
                null}
        </Card>
    );
};

export default PlaceDetails;
