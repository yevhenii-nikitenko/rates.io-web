import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import { operations } from '../../constants';

const SearchForm = () => {
    const [operation, setOperation] = React.useState(operations.SELL);
    const [currency, setCurrency] = React.useState('');
    const [distance, setDistance] = React.useState(-1);
    const [currencies, setCurrencies] = React.useState([
        'usd',
        'eur',
        'tl',
        'plz',
        'cad',
        'rub',
    ]);

    const handleFind = () => {
        console.log('currency', currency);
        console.log('distance', distance);
        console.log('operation', operation);
    };

    return (
        <Grid container>
            <Grid item xs={3} style={{ padding: 10 }}>
                <Typography display="inline">
                                        Buy
                </Typography>
                <Switch
                    checked={operation === operations.SELL}
                    color="default"
                    onChange={() => {
                        setOperation((operation === operations.SELL) ? operations.BUY : operations.SELL);
                    }}
                />
                <Typography display="inline">
                                        Sell
                </Typography>
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
                        onChange={(event) =>
                            setCurrency(event.target.value)
                        }
                        label="Currency"
                    >
                        {currencies.map((name, index) => (
                            <MenuItem
                                key={index}
                                value={name}
                            >
                                {name}
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
                        onChange={(event) =>
                            setDistance(event.target.value)
                        }
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
