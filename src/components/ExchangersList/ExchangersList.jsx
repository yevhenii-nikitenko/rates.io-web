import React from 'react';
import ExchangerDetails from '../ExchangerDetails/ExchangerDetails';
import Grid from '@material-ui/core/Grid';
import { useSelector, useDispatch } from 'react-redux';
import filteredExchangers from '../../libs/filteredExchangers';
import AvarageRate from '../AvarageRate/AvarageRate';
import { operations, ANY_CURRENCY } from '../../constants';
import { setOnMouseOver, cleatOnMouseLeave } from '../../store/actions';
import sortComparator from '../../libs/sortComparator';

const ExchangersList = () => {
    const dispatch = useDispatch();
    const { selected, list } = useSelector((state) => state.exchanges);
    const { operation, currency, distance, sortBy, openNow } = useSelector(
        (state) => state.search,
    );
    const mapCenter = useSelector((state) => state.geo.mapCenter);

    const mouseLeaveHandler = () => {
        dispatch(cleatOnMouseLeave());
    };
    const mouseEnterHandler = (exchange) => {
        dispatch(setOnMouseOver(exchange));
    };

    const center =
        mapCenter &&
        new window.google.maps.LatLng(mapCenter.lat, mapCenter.lng);

    const filteredList = filteredExchangers({
        list,
        center,
        distance,
        currency,
    });

    const sorted = !currency.code
        ? filteredList
        : filteredList.sort(
              sortComparator({
                  code: currency.code,
                  sortBy,
                  operation,
                  center,
              }),
          );

    const avarage =
        currency !== ANY_CURRENCY &&
        filteredList.reduce((acc, exchange) => {
            const selectedCurrency = exchange.rates[currency.code];

            if (!selectedCurrency) return acc;

            acc +=
                operation === operations.BUY
                    ? selectedCurrency.ask / selectedCurrency.count
                    : selectedCurrency.bid / selectedCurrency.count;

            return acc;
        }, 0) / filteredList.length;

    const showAvarage =
        avarage &&
        !selected &&
        currency !== ANY_CURRENCY &&
        filteredList.length > 1;

    return (
        <div
            className="app-exchanges-main"
            style={{
                overflowY: 'scroll',
                height: 'calc(100vh - 182px)',
            }}
        >
            {showAvarage ? (
                <AvarageRate
                    operation={operation}
                    currency={currency}
                    avarage={avarage.toFixed(4)}
                />
            ) : null}
            {selected ? (
                <Grid container>
                    <Grid item xs={12}>
                        <ExchangerDetails
                            exchanger={selected}
                            operation={operation}
                            currency={currency}
                            expanded={true}
                        />
                    </Grid>
                </Grid>
            ) : (
                sorted.map((exchange) => {
                    return (
                        <ExchangerDetails
                            key={exchange.id}
                            exchanger={exchange}
                            operation={operation}
                            currency={currency}
                            mouseLeaveHandler={mouseLeaveHandler}
                            mouseEnterHandler={() =>
                                mouseEnterHandler(exchange)
                            }
                        />
                    );
                })
            )}
        </div>
    );
};

export default ExchangersList;
