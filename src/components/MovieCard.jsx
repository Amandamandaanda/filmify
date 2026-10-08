import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addItem } from "../store/cartSlice";

function MovieCard({ movie }) {
    const dispatch = useDispatch();

    return(
        <div className="movie-card">
            <Link to={`/movie/${movie.id}`}>
            <div className="movie-card-photo">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
            </div>
            </Link>
        <div className="movie-info">
            <h2>{movie.title}</h2>
            <p>{movie.release_date?.slice(0, 4)}</p>
            <p>{movie.vote_average.toFixed(1)}</p>
            <p className="price">129 kr</p>
            <button onClick={() => dispatch(addItem(movie))}>Lägg i kundvagn</button>
        </div>
        </div>
    );
}

export default MovieCard;