import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';

import { operations, currencies, ANY_CURRENCY} from '../../constants';
import { setSearchParams } from '../../store/actions';

const SearchForm = () => {
    const dispatch = useDispatch();
    const [operation, setOperation] = React.useState(operations.SELL);
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
            <Grid item xs={3} style={{ padding: 10, color: '#282c34' }}>
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
            <Grid item xs={3} style={{ padding: 10 }}>
                <FormControl
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
                </FormControl>
            </Grid>
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
            </Grid>
        </Grid>
    );
};

export default SearchForm;
