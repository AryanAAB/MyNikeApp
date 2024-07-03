import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './UserAuthentication/components/Login';
import SignUp from './UserAuthentication/components/SignUp';
import Cart from './Cart';
import ProductList from './ProductList';
import Favorite from './Favorites';
import Profile from './Profile';

const App = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {currentUser ? (
            <Route path="/products" element={<ProductList />} />
          ) : (
            <Route path="/products" element={<Navigate to="/login" />} />
        )}
        {currentUser ? (
            <Route path="/" element={<ProductList />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
        )}
        {currentUser ? (
            <Route path="/cart" element={<Cart />} />
          ) : (
            <Route path="/cart" element={<Navigate to="/login" />} />
        )}
        {currentUser ? (
            <Route path="/favorites" element={<Favorite />} />
          ) : (
            <Route path="/favorites" element={<Navigate to="/login" />} />
        )}
        {currentUser ? (
            <Route path="/profile" element={<Profile />} />
          ) : (
            <Route path="/profile" element={<Navigate to="/login" />} />
        )}
        </Routes>
      </Router>
  );
};

export default App;
