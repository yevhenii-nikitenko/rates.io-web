import React from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Calculator from '../Calculator/Calculator';
import { RiExchangeDollarLine } from 'react-icons/ri';
import { currencies, ANY_CURRENCY } from '../../constants';

const PlaceDetails = (props) => {
    const [expanded, setExpanded] = React.useState(props.expanded);

    const getExchangerCurrencies = () => {
        return Object.keys(props.exchanger.rates).map((currency) => {
            return currencies.find((c) => c.code === currency);
        });
    };

    const getRates = () => {
        if (props.currency !== ANY_CURRENCY) {
            return Object.entries(props.exchanger.rates).reduce(
                (acc, element) => {
                    if (element[0] === props.currency.code) {
                        return [element, ...acc];
                    }

                    return [...acc, element];
                },
                [],
            );
        } else {
            return Object.entries(props.exchanger.rates);
        }
    };

    return (
        <Card
            style={{
                margin: '0px',
                borderRadius: '0px',
                borderBottom: '1px solid #adadad',
                padding: '10px',
                boxShadow: 'none',
            }}
            onMouseEnter={props.mouseEnterHandler}
            onMouseLeave={props.mouseLeaveHandler}
        >
            <div
                style={{
                    display: 'flex',
                }}
            >
                {props.image ? (
                    <CardMedia
                        style={{
                            width: '300px',
                            height: '250px',
                        }}
                        image={props.image}
                    />
                ) : (
                    <RiExchangeDollarLine
                        color="'#282c34"
                        style={{
                            fontSize: '140px',
                            marginTop: '60px',
                            width: '300px',
                        }}
                    />
                )}
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
                                    Продаж
                                </Grid>
                                <Grid item xs>
                                    Валюта
                                </Grid>
                                <Grid item xs>
                                    Купівля
                                </Grid>
                            </Grid>

                            {getRates().map((currency, index) => (
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
                                        {currency[1].bid}
                                    </Grid>
                                    <Grid item xs>
                                        {currency[1].count === 1
                                            ? ''
                                            : currency[1].count}{' '}
                                        {currency[0]}
                                    </Grid>
                                    <Grid item xs>
                                        {currency[1].ask}
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                    </CardContent>
                    <CardActions
                        style={{
                            display: 'initial',
                        }}
                    >
                        {expanded ? null : (
                            <Button
                                size="small"
                                style={{
                                    float: 'right',
                                    background: '#282c34',
                                    color: 'white',
                                }}
                                onClick={() => {
                                    setExpanded(true);
                                }}
                            >
                                Більше
                            </Button>
                        )}
                    </CardActions>
                </div>
            </div>
            {expanded ? (
                <div>
                    <CardActions>
                        <Calculator
                            currencies={getExchangerCurrencies()}
                            rates={props.exchanger.rates}
                            operation={props.operation}
                            currency={props.currency}
                        />
                    </CardActions>
                    <Button
                        size="small"
                        style={{
                            margin: '0px 8px',
                            background: '#282c34',
                            float: 'right',
                            color: 'white',
                        }}
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        Сховати
                    </Button>
                </div>
            ) : null}
        </Card>
    );
};

export default PlaceDetails;
