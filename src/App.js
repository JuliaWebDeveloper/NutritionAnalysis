import { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';

function App() {
  const[mySearch, setMySearch] = useState(); //состояние поиска для input, изначально пустое
  const[myАnalysis, setMyAnalysis] = useState(); // состояние: анализ продукта, изначально пусто
  const[wordSubmitted, setWordSubmitted]=useState("1 apple")//состояние: значение выбранного слова-изначально пустое
  const [isLoaded, setIsLoaded] = useState(false);// состояние загрузки

//доступ к api
const MY_ID = "dc43f5c9";
const MY_KEY = "41004f36187693a52846881269bea7f0";

const myProductSearch = (e) => {
  //console.log(e.target.value);
  setMySearch(e.target.value); //запускается функция, которая отражает в инпуте того, что пишет пользователь
}

const search = (e) => {
  e.preventDefault();//не обновляем страницу
  setWordSubmitted(mySearch);//запускается функция обновления слова, по которому в дальнейшем будет запрос api
}

const ingr = wordSubmitted.split(/[,.;]/); //преобразование строки в массив

//запрос в api
useEffect(() => {
  setIsLoaded(true);
  fetch(`https://api.edamam.com/api/nutrition-details?app_id=${MY_ID}&app_key=${MY_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
       title: "",
       ingr: ingr 
       })
   })
   
    .then(function(response) {
      if(response.ok) {
        setIsLoaded(false);
        return response.json()
      }
      else {
        setIsLoaded(false);
        alert('ingredients entered incorrectly');
      }
    })
    .then((result) => {
       //console.log(result);
       setMyAnalysis(result);
    })
   
  },[wordSubmitted])// как только меняется запрашиваемое слово, запускается новый запрос api

  
return (
  <div className="container">
    <div className="container gray">
        <h1>Nutrition Analysis</h1>
        {isLoaded &&
        <div className="lds-spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        }
    </div>
    <h2>{wordSubmitted}</h2> 
    <form onSubmit={search}>
      <input placeholder='1 apple...' onChange={myProductSearch} value={mySearch} name="food"></input>
    </form>
    <button onClick={search}>More details</button>
    {myАnalysis &&
      Object.values(myАnalysis.totalNutrients).map(({label, quantity, unit}, index) => 
        <Table key={index}
          label={label}
          quantity={quantity}
          unit={unit}
        />
    )}
  </div>
)
}
export default App;
