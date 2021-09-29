import React from 'react'
import Chart from './Chart'

function PointChart(props) {
    const chartData = [
        {
            label: 'Jan',
            value: 0
        }, {
            label: 'Feb',
            value: 0
        }, {
            label: 'Mar',
            value: 0
        }, {
            label: 'Apr',
            value: 0
        }, {
            label: 'May',
            value: 0
        }, {
            label: 'Jun',
            value: 0
        }, {
            label: 'Jul',
            value: 0
        }, {
            label: 'Aug',
            value: 0
        }, {
            label: 'Sep',
            value: 0
        }, {
            label: 'Oct',
            value: 0
        }, {
            label: 'Nov',
            value: 0
        }, {
            label: 'Dec',
            value: 0
        },
    ];

    for (let p of props.points) {
        const monthVar = p.date.getMonth();
        chartData[monthVar].value += p.points;
    }

    return (
        <Chart dataPoints={chartData} />
    );
};

export default PointChart;
