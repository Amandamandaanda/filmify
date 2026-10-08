import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MovieDetails.css";
import { addItem } from "../store/cartSlice";
import { useDispatch } from "react-redux";

function MovieDetails({movies}) {
    const {id} = useParams();
    const dispatch = useDispatch();

    const movie = movies.find((movie) => movie.id.toString() === id);

    if (!movie) {
        return <p>Loading...</p>
    }

    return(
        <main className ="movie-details">
            <img className="movie-picture" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} />
            <h1>{movie.title}</h1>
            <p>Betyg: {movie.vote_average.toFixed(1)}</p>
            <p>Utgivningsdatum: {movie.release_date}</p>
            <p>{movie.overview}</p>
            <h2>129 kr</h2>
            <div className="buttons">
                 <button onClick={() => dispatch(addItem(movie))}>Lägg i kundvagn</button>
                <Link to="/">
                <button>Tillbaka till filmer</button>
                
                </Link>
            </div>

        </main>
    );
}


export default MovieDetails;