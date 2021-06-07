import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import { operations } from '../../constants';

const AvarageRate = (props) => {
    return (
        <Card
            style={{
                background: '#282c34',
                color: 'white',
                margin: 10,
                textAlign: 'center',
            }}
        >
            <CardContent>
                <Typography>
                    Середня ціна{' '}
                    {props.operation === operations.BUY ? 'покупки' : 'продажу'}{' '}
                    {props.currency?.code} рівна {props.avarage} у цьому місцi
                </Typography>
            </CardContent>
        </Card>
    );
};

AvarageRate.propTypes = {
    operation: PropTypes.string.isRequired,
    currency: PropTypes.shape({
        code: PropTypes.string,
        name: PropTypes.string.isRequired,
        symbol: PropTypes.string,
    }),
    avarage: PropTypes.number,
};

export default AvarageRate;
