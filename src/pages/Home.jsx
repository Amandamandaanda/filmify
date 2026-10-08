
import { useState } from "react";
import MovieCard from "../components/MovieCard";
import '../index.css';


function Home({ movies, loading, error }) {
  const [selectedYear, setSelectedYear] = useState("Alla");

  const years = [
    ...new Set(movies.map((movie) => movie.release_date.slice(0, 4))
  ),
  ].sort();

  const filtredMovies = selectedYear === "Alla" ? movies : movies.filter((movie) => movie.release_date.slice(0, 4) === selectedYear)

  return (
    <main>
      <h1>Filmer</h1>

      <label> Filtrera efter år: 
        <select value={selectedYear} onChange={(event) => setSelectedYear(event.target.value)}> 
          <option value="Alla">Alla år</option> 
          {years.map((year) => ( <option key={year} value={year}> {year} </option> ))} 
         </select> 
      </label>
      {loading && <p>Laddar filmer...</p>}
      {error && <p>Kunde inte hämta filmer</p>}
      {!loading && !error && (
      <div className="movie-grid">
        {filtredMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
      )}
    </main>
  );
}

export default Home;