import React from 'react'

import ChartBar from './ChartBar';
import './Chart.css';

function Chart(props) {
    const valArr = props.dataPoints.map(d => d.value);
    const totalMax = Math.max(...valArr);

    return (
        <div className="chart">
            {props.dataPoints.map((dataPoint) => (
                <ChartBar
                    key={dataPoint.label}
                    value={dataPoint.value}
                    maxValue={totalMax}
                    label={dataPoint.label}
                />))}
        </div>
    )
}

export default Chart;
