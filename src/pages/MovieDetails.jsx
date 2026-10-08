import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MovieDetails.css";
import { addItem, removeItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function MovieDetails({movies}) {
    const {id} = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const movie = movies.find((movie) => movie.id.toString() === id);
    const cartItem = cartItems.find((item) => item.id === movie.id);
    

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
            <h2>129 kr</h2>{cartItem ? (
                            <div className="quantity">
                                <button onClick={() => dispatch(removeItem(movie.id))}>–</button>
                                <span>{cartItem.quantity}</span>
                                <button onClick={() => dispatch(addItem(movie))}>+</button>
                            </div>
            
                        ) : (
                            <div className="buttons">
                        <button onClick={() => dispatch(addItem(movie))}>Lägg i kundvagn</button>
                        
            </div>
            )}
                <Link to="/">
                <button>Tillbaka till filmer</button>
                
                </Link>
            
            

        </main>
    );
}


export default MovieDetails;