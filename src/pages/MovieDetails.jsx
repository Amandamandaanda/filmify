import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./MovieDetails.css";
import { addItem, removeItem } from "../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function MovieDetails({movies}) {

    const {id} = useParams();
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const movie = movies.find((movie) => movie.id.toString() === id);
    const cartItem = cartItems.find((item) => item.id === movie.id);
    
    const [trailer, setTrailer] = useState("");
    const [trailerError, setTrailerError] = useState(null);
    const [trailerLoading, setTrailerLoading] = useState(true);

    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    useEffect(() => {
        if (!movie) return;

        const loadTrailer = async () => {
            try{
                const searchQuery = encodeURIComponent(
                    `${movie.title} official trailer`
                );

                const response = await fetch(
                    `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=1&q=${searchQuery}&key=${apiKey}`


                );
                if (!response.ok) {
                    throw new Error (`Error: ${response.status}`);
                }
                const data = await response.json();
                console.log(data)

                const videoId = data.items?.[0]?.id?.videoId;
                
                if (!videoId) {
                    throw new Error("Kunde inte hitta trailer");
                }
                setTrailer(videoId)
   
            } catch (err) {
                setTrailerError(err.message);
            } finally {
                setTrailerLoading(false);
            }

            };
            setTrailerLoading(true);
            setTrailerError(null);
            setTrailer("");

            loadTrailer();
        }, 
        [movie?.id]);
    

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
                    <section className="trailer-section">
                        <h2>Trailer</h2>
                        {trailerLoading && (
                            <p className="trailer-loading">Hämtar trailer...</p>
                        )}
                        {trailerError && (
                            <p className="trailer-error">{trailerError}</p>
                        )}
                        {trailer && (
                            <div className="trailer-container">
                                <iframe
                                src={`https://www.youtube.com/embed/${trailer}`}
                                title={`${movie.title} trailer`}
                                allowFullScreen
                                />
                            </div>
                        )}
                    </section>
                    <Link to="/">
                    <button>Tillbaka till filmer</button>
                     </Link>
        </main>
    );
}

export default MovieDetails;