import React from 'react';

import './PointsFilter.css';

const PointsFilter = (props) => {
    const yearChange = (e) => {
        props.onYearChange(e.target.value);
    };

    return (
        <div className='points-filter'>
            <div className='points-filter__control'>
                <label>Filter by year</label>
                <select value={props.selected} onChange={yearChange}>
                    <option value='2022'>2022</option>
                    <option value='2021'>2021</option>
                    <option value='2020'>2020</option>
                    <option value='2019'>2019</option>
                </select>
            </div>
        </div>
    );
};

export default PointsFilter;