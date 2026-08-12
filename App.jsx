import { useEffect, useState } from "react";

function App() {
  const [meals, setMeals] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [mealDetails, setMealDetails] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        setLoading(true);
        setError("");

        const url =
          category === "All"
            ? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
            : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to fetch meals");
        }

        const data = await response.json();

        if (!data.meals) {
          throw new Error("No meals found");
        }

        setMeals(data.meals);
      } catch (error) {
        setError(error.message);
        setMeals([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, [search, category]);

  const handleMealClick = async (mealId) => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch meal details");
      }

      const data = await response.json();

      setMealDetails(data.meals[0]);
    } catch (error) {
      console.log(error.message);
    }
  };

  const filteredMeals = meals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Failed to fetch meals: {error}</h2>;
  }

  return (
    <div>
      <h1>Meal App</h1>

      <input
        type="text"
        placeholder="Search meal..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All</option>
        <option value="Beef">Beef</option>
        <option value="Chicken">Chicken</option>
        <option value="Dessert">Dessert</option>
        <option value="Pasta">Pasta</option>
        <option value="Seafood">Seafood</option>
      </select>

      {mealDetails && (
        <div>
          <h2>Meal Details</h2>

          <img
            src={mealDetails.strMealThumb}
            alt={mealDetails.strMeal}
            width="300"
          />

          <h2>{mealDetails.strMeal}</h2>

          <p>Category: {mealDetails.strCategory}</p>
          <p>Area: {mealDetails.strArea}</p>
          <p>Instructions: {mealDetails.strInstructions}</p>
        </div>
      )}

      {filteredMeals.length === 0 ? (
        <p>No meals found</p>
      ) : (
        filteredMeals.map((meal) => (
          <div
            key={meal.idMeal}
            onClick={() => {
              setSelectedMeal(meal);
              handleMealClick(meal.idMeal);
            }}
          >
            <img
              src={meal.strMealThumb}
              alt={meal.strMeal}
              width="200"
            />

            <h2>{meal.strMeal}</h2>

            <p>Category: {meal.strCategory}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default App;

/*
import { useEffect, useState } from 'react'

function App(){
  const [meals, setMeals]= useState([]);
  const [search, setSearch]= useState("");
  const [loading, setLoading]= useState(true);
  const [error, setError]= useState("");
  const [category, setCategory]= useState("All");
  const [selectedMeal, setSelectedMeal]= useState(null);
  const [mealDetails, setMealDetails] = useState(null);

  const handleMealClick = async (mealId) => {
  try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch meal details");
      }

      const data = await response.json();
      setMealDetails(data.meals[0]);
    } catch (error) {
      console.log(error.message);
    }
  };
   useEffect(()=> {
      fetch(category==="All"? `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`
         : `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`
      )
      .then((response)=> {
         if(!response.ok){
           throw new Error("Failed to fetch");
         }

         return response.json();
      }).then((data)=>{
        if(!data.meals) throw new Error("NO meal found");
        setMeals(data.meals);
        setLoading(false);
       }
      ).catch((error)=>{
        setError(error.message);
        setLoading(false);
      })
   }, [search, category]);

   if(loading){
     return <h2>Loading...</h2>;
   }
   if(error){
     return <h2>Failed to fetch meals:{error} </h2>;
   }

   const filteredMeals= meals.filter((ml)=> ml.strMeal.toLowerCase().includes(search.toLowerCase()) );

   return (
      <div>
        <h1>Meal App</h1>
        <input type="text" placeholder="search meal..." value={search}
           onChange={(e)=> setSearch(e.target.value)}
        />

        {selectedMeal && (
          <div>
            <h2>Selected Meal</h2>
            <p>{selectedMeal.strMeal}</p>
          </div>
        )}

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="All">All</option>
          <option value="Beef">Beef</option>
          <option value="Chicken">Chicken</option>
          <option value="Dessert">Dessert</option>
          <option value="Pasta">Pasta</option>
          <option value="Seafood">Seafood</option>
        </select>
        <button>Search</button>

        {filteredMeals.length===0? (
          <p>No meals found</p>
        ): (filteredMeals.map((ml)=> (
           <div key={ml.idMeal} onClick={()=> setSelectedMeal(ml)} >
             <img src={ml.strMealThumb} alt={ml.strMeal} width="200" />
             <h2>{ml.strMeal} </h2>
             <p>Category: {ml.strCategory} </p>
           </div>
           ))
        )}
      </div>
      
   );
}

export default App;
*/













// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
