import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';

import { operations, currencies, ANY_CURRENCY} from '../../constants';
import { setSearchParams } from '../../store/actions';

const CurrencyForm = (props) => {
    const dispatch = useDispatch();
    const [operation, setOperation] = React.useState(operations.SELL);
    const [amount, setAmount] = React.useState(0);
    const [total, setTotal] = React.useState(0);
    const [currency, setCurrency] = React.useState(ANY_CURRENCY);
    const [distance, setDistance] = React.useState(-1);

    const handleFind = () => {
        dispatch(setSearchParams({
            currency,
            distance,
            operation
        }));
    };

    return (
        <Grid container style={{ background: 'white' }}>
            <Grid 
                item 
                xs={ props.mode === 'SEARCH' ? 4 : 3} 
                style={{ padding: 10, color: '#282c34', textAlign: 'center' }}>
                <Typography display="inline">Buy</Typography>
                <Switch
                    checked={operation === operations.SELL}
                    color="default"
                    onChange={() => {
                        setOperation(
                            operation === operations.SELL
                                ? operations.BUY
                                : operations.SELL,
                        );
                    }}
                />
                <Typography display="inline">Sell</Typography>
            </Grid>
            <Grid item xs={3} style={{ padding: 10 }}>
                <FormControl
                    variant="outlined"
                    style={{
                        width: '100%',
                    }}
                >
                    <InputLabel>Currency</InputLabel>
                    <Select
                        value={currency}
                        onChange={(event) => setCurrency(event.target.value)}
                        label="Currency"
                    >
                        <MenuItem value={ANY_CURRENCY}>Any</MenuItem>
                        {currencies.map((currency, index) => (
                            <MenuItem key={index} value={currency}>
                                {currency.symbol ? currency.symbol + ' ' : ''}{currency.name} ({currency.code})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid 
                item 
                xs={ props.mode === 'SEARCH' ? 2 : 3} 
                style={{ padding: 10 }}>
                {props.mode === 'SEARCH' ? <FormControl
                    variant="outlined"
                    style={{
                        width: '100%',
                    }}
                >
                    <InputLabel>Distance</InputLabel>
                    <Select
                        value={distance}
                        onChange={(event) => setDistance(event.target.value)}
                        label="Currency"
                    >
                        <MenuItem value={-1}>any</MenuItem>
                        <MenuItem value={0.5}>0.5</MenuItem>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                </FormControl> : <FormControl
                    variant="outlined"
                >
                    <TextField
                        label="Amount"
                        type="number"
                        value={amount}
                        onChange={event => {
                            setAmount(event.target.value)
                        }}
                        inputProps={{
                            style: {
                                padding: 10
                            }
                        }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        variant="outlined"
                    />
                </FormControl>}
            </Grid>
            {props.mode === 'SEARCH' ? 
                <Grid item xs={3} style={{ padding: 10 }}>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{
                            width: '100%',
                            background: '#282c34',
                        }}
                        onClick={handleFind}
                    >
                    Find
                    </Button>
                </Grid> : <Grid 
                    item 
                    xs={3}                 
                    style={{ padding: 10 }}>
                    <FormControl
                        variant="outlined"
                    >
                        <TextField
                            label="Total"
                            type="number"
                            value={total}
                            onChange={event => {
                                setTotal(event.target.value)
                            }}
                            inputProps={{
                                style: {
                                    padding: 10
                                }
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="outlined"
                        />
                    </FormControl>
                </Grid>}
        </Grid>
    );
};

export default CurrencyForm;