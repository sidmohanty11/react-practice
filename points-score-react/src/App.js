import {useState} from 'react';
import './App.css';
import NewPointsItem from './components/NewPointsItem';
import NewPointForm from './components/NewPointForm';

function App() {
  const points = [
    {
      points: 10,
      title: 'Nice',
      date: new Date(2021, 3, 22)
    },
    {
      points: 7,
      title: 'Ok',
      date: new Date(2021, 4, 12)
    },
    {
      points: 8,
      title: 'Above average',
      date: new Date(2021, 5, 20)
    },
    {
      points: 5,
      title: 'Bad',
      date: new Date(2021, 8, 10)
    },
  ];
  const [data, setPoints] = useState(points);

  // const savePointsData = (data) => {
  //   const pointsData = {
  //     ...data
  //   };
  //   points.push(pointsData);
  // };

  const addPointsData = p => {
    setPoints(prevData => {
      return [p, ...prevData]
    });
  };

  return (
    <div className="App">
      <NewPointForm onSavePointsData={addPointsData}/>
      <NewPointsItem points={data}/>
    </div>
  );
}

export default App;
