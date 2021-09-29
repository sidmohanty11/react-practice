import './PointsItem.css';

function PointsItem(props) {
    //const [title,setTitle] = useState(props.title);
    return (
        <div className="points-item">
            <div className="points-date">{ props.date.toDateString() }</div>
            <div className="points-item__description"><h2>{props.title}</h2></div>
            <div className="points-item__price">{ props.points }</div>
        </div>
    );
}

export default PointsItem;