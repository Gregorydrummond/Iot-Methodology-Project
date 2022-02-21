import React from 'react';
import { useAxiosInterval } from 'use-axios-hooks'

const FetchLED = () => {
    const [state, getHeartRateValue] = useAxiosInterval(
        `https://blynk.cloud/external/api/get?token=-gBY6blwH_I2tJzJ76skJ-_OCcmmtBIe&v0`, 
        200
    );

    const { data, isLoading, error, isCanceled } = state;
    return (
        <div>
            {(data && data.data == 1) ? <p>LED: On</p> : <p>LED: Off</p>}
        </div>
    );
};

export default FetchLED;