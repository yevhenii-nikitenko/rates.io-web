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

import { operations, ANY_CURRENCY, sortBy as SORT_BY } from '../../constants';
import { setSearchParams } from '../../store/actions';

const CurrencyForm = (props) => {
    const dispatch = useDispatch();
    const [operation, setOperation] = React.useState(operations.BUY);
    const [currency, setCurrency] = React.useState(ANY_CURRENCY);
    const [distance, setDistance] = React.useState(-1);
    const [sortBy, setSortBy] = React.useState(SORT_BY.NO_SORT);
    const [openNow, setOpenNow] = React.useState(false);

    const handleFind = () => {
        dispatch(
            setSearchParams({
                currency,
                distance,
                operation,
                sortBy,
                openNow,
            }),
        );
    };

    return (
        <Grid container style={{ background: 'white' }}>
            <Grid item xs={4} style={{ padding: 10 }}>
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
                xs={5}
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
                <FormControl
                    variant="outlined"
                    style={{
                        width: '100%',
                    }}
                >
                    <InputLabel>Відстань</InputLabel>
                    <Select
                        value={distance}
                        onChange={(event) => setDistance(event.target.value)}
                        label="Distance"
                    >
                        <MenuItem value={-1}>Не важливо</MenuItem>
                        <MenuItem value={0.2}>200 м</MenuItem>
                        <MenuItem value={0.5}>500 м</MenuItem>
                        <MenuItem value={1}>1 км</MenuItem>
                        <MenuItem value={2}>2 км</MenuItem>
                        <MenuItem value={4}>4 км</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid container style={{ background: 'white' }}>
                <Grid item xs={4} style={{ padding: 10 }}>
                    <FormControl
                        variant="outlined"
                        style={{
                            width: '100%',
                        }}
                    >
                        <InputLabel>Сортувати</InputLabel>
                        <Select
                            value={sortBy}
                            onChange={(event) => {
                                setSortBy(event.target.value);
                            }}
                            label="Сортувати"
                        >
                            <MenuItem value={SORT_BY.NO_SORT}>
                                Не сортувати
                            </MenuItem>
                            <MenuItem
                                disabled={currency === ANY_CURRENCY}
                                value={SORT_BY.PRICE_ASC}
                            >
                                Ціна зростає
                            </MenuItem>
                            <MenuItem
                                disabled={currency === ANY_CURRENCY}
                                value={SORT_BY.PRICE_DESC}
                            >
                                Ціна спадає
                            </MenuItem>
                            <MenuItem value={SORT_BY.DISTANCE_ASC}>
                                Відстань зростає
                            </MenuItem>
                            <MenuItem value={SORT_BY.DISTANCE_DESC}>
                                Відстань спадає
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid
                    item
                    xs={4}
                    style={{
                        padding: 10,
                        color: '#282c34',
                        justifyContent: 'center',
                        display: 'inline-flex',
                    }}
                >
                    <Switch
                        checked={openNow}
                        color="default"
                        onChange={() => {
                            setOpenNow(!openNow);
                        }}
                    />
                    <Typography
                        style={{
                            alignItems: 'center',
                            display: 'inline-flex',
                            opacity: openNow ? 1 : 0.5,
                        }}
                    >
                        Зараз відкрито
                    </Typography>
                </Grid>
                <Grid item xs={4} style={{ padding: 10 }}>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{
                            width: '100%',
                            background: '#282c34',
                        }}
                        onClick={handleFind}
                    >
                        Знайти
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CurrencyForm;
