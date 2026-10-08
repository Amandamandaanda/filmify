import { useEffect, useState } from 'react';
import { Routes, Route, HashRouter } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import MovieDetails from "./pages/MovieDetails";
import Cart from "./pages/Cart";
import NavBar from './components/NavBar';

function App() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const apiKey = import.meta.env.VITE_TMDB_API_KEY;

useEffect(() => { 
  
  const loadMovies = async () => {
    try {
      
  const response = await fetch (
  `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
    
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);

      setMovies(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  loadMovies();
}, []);

  return (    
    <HashRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home movies={movies} loading={loading} error={error} />} />
         <Route path="/movie/:id" element={<MovieDetails movies={movies} />}/>
         <Route path="/cart" element={<Cart />} />
      </Routes>
    </HashRouter>
  )
}

export default App
