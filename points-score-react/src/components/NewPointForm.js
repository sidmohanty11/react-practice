import React, {useState} from 'react'
import './NewPointForm.css'

function NewPointForm(props) {
    //multiple state approach
    const [showForm, setShowForm] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState('');
    const [enteredDate, setEnteredDate] = useState('');
    const [enteredPoints, setEnteredPoints] = useState('');
    //Only one state approach
    //const [userInput, setUserInput] = useState({
    //const titleHandler = e => {setUserInput({...userInput,enteredTitle:e.target.value})};
    //or better way is -> (one state approach)
    //setUserInput((prevState //will always be latest snapshot of previous state) => {
    //return { ...prevState, enteredTitle: e.target.value }
    //  });
    //because react schedule updates
    //});   

    const titleHandler = (e) => {
        setEnteredTitle(e.target.value);
    };
    const dateHandler = (e) => {
        setEnteredDate(e.target.value);
    };
    const pointsHandler = (e) => {
        setEnteredPoints(e.target.value);
    };
    const formHandler = (e) => {
        setShowForm(true);
    };
    const cancelAddForm = () => {
        setShowForm(false);
    };

    const submitHandler = (e) => {
        e.preventDefault(); //
        
        const pointsData = {
            title: enteredTitle,
            points: enteredPoints,
            date: new Date(enteredDate)
        };

        props.onSavePointsData(pointsData);
        setEnteredTitle('');
        setEnteredPoints('');
        setEnteredDate('');
    };

    return (
        <div className="new-point">
            {!showForm && <button onClick={formHandler}>Add Points</button>}
            {showForm && <form onSubmit={submitHandler}>
                <div className="new-point__controls">
                    <div className="new-point__control">
                        <label>Title</label>
                        <input type="text" value={enteredTitle} onChange={titleHandler}/>
                    </div>
                    <div className="new-point__control">
                        <label>Points</label>
                        <input type="number" min="1" max="10" value={enteredPoints} onChange={pointsHandler}/>
                    </div>
                    <div className="new-point__control">
                        <label>Date</label>
                        <input type="date" min="2019-01-01" max="2022-12-31" value={enteredDate} onChange={dateHandler}/>
                    </div>
                </div>
                <div className="new-point__actions">
                    <button type="button" onClick={cancelAddForm}>Cancel</button>
                    <button type="submit">Add Your Points</button>
                </div>
            </form>}
        </div>
    )
}

export default NewPointForm;