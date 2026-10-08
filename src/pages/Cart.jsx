import { useDispatch, useSelector } from "react-redux";
import { removeItem, addItem } from "../store/cartSlice";
import '../Cart.css';


function Cart() {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const dispatch = useDispatch();
    const totalPrice = cartItems.reduce(
    (total, movie) => total + 129 * movie.quantity,0);

    return(
        <main className="cart">
        <h1>Din kundvagn</h1>
        {cartItems.length === 0 ? ( 
            <p className="empty-cart">Din kundvagn är tom</p>) : (
            <>
            <div className="cart-items">{cartItems.map((movie) =>(
            <div className="cart-item" key={movie.id}>
                <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title}/>
                <div className="cart-item-info">
                    <h2>{movie.title}</h2>
                    <p>Antal:</p>
                    <div className="quantity">
                    <button onClick={() => dispatch(removeItem(movie.id))}>–</button>
                    <span>{movie.quantity}</span>
                    <button onClick={() => dispatch(addItem(movie))}>+</button>
                </div>
                    <p className="cart-item-price"> {129 * movie.quantity} kr</p>
                
                </div>
            </div>
            ))}
            </div>
            <div className="cart-summary">
                <h2>Totalt</h2>
                <p>{totalPrice} kr</p>
            </div>
            </>
            )} 
        </main>
    )
}

export default Cart;