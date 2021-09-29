import { useState } from 'react';
import PointsItem from './PointsItem';
import './NewPointsItem.css';
import PointsFilter from './PointsFilter';
import PointChart from './PointChart';

function NewPointsItem(props) {
    const [year, setYear] = useState('2021');
    const Year = (selectedYear) => {
        setYear(selectedYear);
    };

    const filterByYear = props.points.filter(p => {
        return p.date.getFullYear().toString() === year;
    })
    return (
        <div className="points-holder">
            <PointsFilter selected={year} onYearChange={Year} />
            <PointChart points={filterByYear}/>
            {/* {filterByYear.length === 0 && <p>...</p>} it will return the second part */}
            {filterByYear.length === 0 ? (<p>No Points saved.</p>) : filterByYear.map((p, i) => (<PointsItem
                key={i}
                title={p.title}
                points={p.points}
                date={p.date}
            />))}
        </div>//not a great idea to use index, use unique ids instead.
    );
}

export default NewPointsItem;