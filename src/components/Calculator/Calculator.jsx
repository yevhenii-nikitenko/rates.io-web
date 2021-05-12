import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { operations, ANY_CURRENCY } from '../../constants';

const Calculator = (props) => {
    const [operation, setOperation] = React.useState(
        props.operation || operations.BUY,
    );
    const [amount, setAmount] = React.useState('');
    const [total, setTotal] = React.useState('');
    const [currency, setCurrency] = React.useState(
        props.currency || ANY_CURRENCY,
    );

    React.useEffect(() => {
        if (!props.operation) return;

        setOperation(props.operation);
    }, [props.operation]);

    React.useEffect(() => {
        if (!props.currency) return;

        setCurrency(props.currency);
    }, [props.currency]);

    // calculation
    React.useEffect(() => {
        if (props.rates && currency !== ANY_CURRENCY && +amount) {
            const { bid, ask, count } = props.rates[currency.code];

            if (operation === operations.BUY) {
                setTotal((+amount * (ask / count)).toFixed(2));
            } else {
                setTotal((+amount * (bid / count)).toFixed(2));
            }
        }

        if (currency === ANY_CURRENCY) {
            setTotal('');
            setAmount('');
        }
    }, [currency, amount, operation]);

    return (
        <Grid container style={{ background: 'white' }}>
            <Grid item xs={3} style={{ padding: 10 }}>
                <FormControl
                    variant="outlined"
                    style={{
                        width: '100%',
                    }}
                >
                    <InputLabel>Валюта</InputLabel>
                    <Select
                        value={currency}
                        onChange={(event) => {
                            setCurrency(event.target.value);
                        }}
                        label="Currency"
                    >
                        <MenuItem value={ANY_CURRENCY}>Any</MenuItem>
                        {props.currencies.map((currency, index) => (
                            <MenuItem key={index} value={currency}>
                                {currency.symbol ? currency.symbol + ' ' : ''}
                                {currency.name} ({currency.code})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid
                item
                xs={3}
                style={{
                    padding: 10,
                    color: '#282c34',
                    justifyContent: 'center',
                    display: 'inline-flex',
                    opacity: currency === ANY_CURRENCY ? 0.5 : 1,
                }}
            >
                <Typography
                    style={{ alignItems: 'center', display: 'inline-flex' }}
                >
                    Продаж
                </Typography>
                <Switch
                    checked={operation === operations.BUY}
                    color="default"
                    disabled={currency === ANY_CURRENCY}
                    onChange={() => {
                        setOperation(
                            operation === operations.SELL
                                ? operations.BUY
                                : operations.SELL,
                        );
                    }}
                />
                <Typography
                    style={{ alignItems: 'center', display: 'inline-flex' }}
                >
                    Купівля
                </Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>
                <FormControl variant="outlined">
                    <TextField
                        label="Кiлькість"
                        type="number"
                        disabled={currency === ANY_CURRENCY}
                        value={amount}
                        onChange={(event) => {
                            setAmount(event.target.value);
                        }}
                        inputProps={{
                            style: {
                                padding: 10,
                            },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>
                <FormControl variant="outlined">
                    <TextField
                        label="Сума"
                        type="number"
                        value={total}
                        disabled
                        onChange={(event) => {
                            setTotal(event.target.value);
                        }}
                        inputProps={{
                            style: {
                                padding: 10,
                            },
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
};

export default Calculator;
