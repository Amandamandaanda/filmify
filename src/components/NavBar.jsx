import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import '../NavBar.css';

function NavBar() {
    const cartItems = useSelector((state) => state.cart.cartItems)

    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
    return(
        <nav className="navbar">
            <Link to="/" className="logo">Filmify</Link>
            <Link to ="/cart" className="cart-link">Kundvagn ({totalItems})</Link>
        </nav>
    )
}

export default NavBar;