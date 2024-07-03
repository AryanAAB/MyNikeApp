import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteCart, addFavorite, deleteFavorite } from './UserAuthentication/userSlice';

const Product = ({ product }) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.user.currentUser["favorites"]);
    const cart = useSelector((state) => state.user.currentUser["cart"]);

    let isFavorite = favorites.includes(product.articleNo);
    let isInCart = cart.includes(product.articleNo);

    const toggleFavorite = () => {
        if (isFavorite) {
            dispatch(deleteFavorite(product.articleNo));
        } else {
            dispatch(addFavorite(product.articleNo));
        }
        isFavorite = !isFavorite;
    }

    const toggleCart = () => {
        if (isInCart) {
            dispatch(deleteCart(product.articleNo));
        } else {
            dispatch(addToCart(product.articleNo));
        }
        isInCart = !isInCart;
    }

    const displayCurrency = (currencyCode, amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currencyCode,
        }).format(amount);
    };

    return (
        <div key={product.id} style={{ border: '1px solid #ccc', padding: '16px', margin: '16px', width: '300px' }}>
            <img src={product.imageUrl} alt={product.productName} style={{ width: '100%' }} />
            <a href={product.url} target="_blank" rel="noopener noreferrer" className="custom-link">
                <h2>{product.productName}</h2>
            </a>
            <p>{product.category} - {product.subCategory}</p>
            <p>{product.division}</p>
            <div>
                {product.salePrice ? (
                    <div>
                        <span style={{ color: 'green', fontSize: "20px" }}>
                            {displayCurrency(product.currency, product.salePrice)}
                        </span>
                        <span style={{ textDecoration: 'line-through', color: 'red', marginLeft: '10px', fontSize: "20px" }}>
                            {displayCurrency(product.currency, product.listPrice)}
                        </span>
                        <span style={{ color: 'orange', marginLeft: '10px', fontSize: "20px" }}>
                            {(100 - product.salePrice / product.listPrice * 100).toFixed(0) + "% off"}
                        </span>
                    </div>
                ) : (
                    <div>
                        <span style={{ fontSize: "20px" }}>
                            {displayCurrency(product.currency, product.listPrice)}
                        </span>
                    </div>
                )}
            </div>
            <div className="product-actions">
                <button className="cart-btn" onClick={toggleCart}>
                    {isInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                <span className={`favorites-icon ${isFavorite ? 'active' : ''}`} onClick={toggleFavorite}>
                    {isFavorite ? '♥' : '♡'}
                </span>
            </div>
        </div>
    );
}

export default Product;
