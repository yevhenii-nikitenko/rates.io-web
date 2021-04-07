import React from 'react';
import './App.css';
import Map from '../Map/Map.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { RiExchangeDollarLine } from 'react-icons/ri';
import LocationPicker from '../LocationPicker/LocationPicker';
import Typography from '@material-ui/core/Typography';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useSelector } from 'react-redux';
import PlaceDetails from '../PlaceDetails/PlaceDetails';

const App = () => {
    const selectedExchanger = useSelector((state) => state.exchanges.selected);

    const [operation, setOperation] = React.useState(false);
    const [currency, setCurrency] = React.useState('');
    const [currencies, setCurrencies] = React.useState([
        'usd',
        'eur',
        'tl',
        'plz',
        'cad',
        'rub',
    ]);

    return (
        <div className="app-root">
            <Grid container>
                <Grid item xs={6}>
                    <AppBar position="sticky" className="app-bar">
                        <Toolbar>
                            <Grid container>
                                <Grid item xs={6} style={{ padding: 5 }}>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        edge="start"
                                    >
                                        <RiExchangeDollarLine
                                            size="1.2em"
                                            color="white"
                                        />
                                    </IconButton>
                                </Grid>
                                <Grid item xs={6} style={{ padding: 5 }}>
                                    <LocationPicker />
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                    {selectedExchanger ? (
                        <Grid container>
                            <Grid item xs={12}>
                                <PlaceDetails exchanger={selectedExchanger} />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container>
                            <Grid item xs={6} style={{ padding: 10 }}>
                                <Typography display="inline">Buy</Typography>
                                <Switch
                                    checked={operation}
                                    color="default"
                                    onChange={() => setOperation(!operation)}
                                />
                                <Typography display="inline">Sell</Typography>
                            </Grid>
                            <Grid item xs={6} style={{ padding: 10 }}>
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
                                            <MenuItem key={index} value={name}>
                                                {name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
                <Grid item xs={6}>
                    <Map />
                </Grid>
            </Grid>
        </div>
    );
};

export default App;
