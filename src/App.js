import React,{useEffect,useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Recipe from './Recipe';

const App = () => {
  const App_ID="327b2de4";
  const APP_KEY="459209c925aec1de6f1cce9724b1fbb0";

  //const examplereq="";

  const [recipes,setRecipes]=useState([]);
  const [search,setSearch]=useState("");
  const [query,setQuery]=useState('chicken');

  useEffect( ()=>{
    getRecipies();
  },[query]);

  const getRecipies = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_ID}&app_key=${APP_KEY}`);
    const data =await response.json();
    setRecipes(data.hits);
    console.log(data.hits);

  }

  const updatesearch = e =>{
    setSearch(e.target.value);
   
  }

  const getsSearch = e => {

    e.preventDefault();
    setQuery(search);
    setSearch('')
  }


  return (
    <div className="App">
     <form onSubmit={getsSearch} className="search-form">
     <input 
      className="search-bar" 
      type="text" value={search} 
      onChange={updatesearch}
     />
     <button className="search-button" type="submit">Search</button>
     </form> 
     <div className="recipes">
     {recipes.map(recipe =>(
       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label} 
       calories={recipe.recipe.calories}
       image={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}
       />
     ))}
     </div>
    </div>
  );
}

export default App;
