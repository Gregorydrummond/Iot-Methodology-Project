import React from 'react';
import { useAxiosInterval } from 'use-axios-hooks'

const FetchHR = () => {
    const [state, getHeartRateValue] = useAxiosInterval(
        `https://blynk.cloud/external/api/get?token=-gBY6blwH_I2tJzJ76skJ-_OCcmmtBIe&v5`, 
        200
    );

    const { data, isLoading, error, isCanceled } = state;
    return (
        <div>
            {data ? <p>Heart Rate: {data && JSON.stringify(data.data)}</p> : <p>Heart Rate: Loading heart rate</p>}
        </div>
    );
};

export default FetchHR;