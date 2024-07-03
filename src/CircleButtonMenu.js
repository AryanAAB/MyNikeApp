import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './CircleButtonMenu.css';
import { logout } from './UserAuthentication/userSlice';
import { useDispatch } from 'react-redux';

//used for the viewing different user preferences (profile, cart, and favorites)
const CircleButtonMenu = ({ inCart = false, inProfile = false, inFavorite = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleGoToCart = () => {
    navigate('/cart');
    setMenuOpen(false);
  };

  const handleGoToFavorites = () => {
    navigate('/favorites');
    setMenuOpen(false);
  };

  const handleGoToProfile = () => {
    navigate('/profile');
    setMenuOpen(false);
  };

  const handleGoHome = () => {
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <div className="circle-button-menu" ref={menuRef}>
      <div className="circle-button" onClick={toggleMenu}>
        <span>☰</span>
      </div>
      {menuOpen && (
        <div className="menu">
          {inCart ? (
            <div className="menu-item" onClick={handleGoHome}>Go Home</div>
          ) : (
            <div className="menu-item" onClick={handleGoToCart}>Go to Cart</div>
          )}
          {inFavorite ? (
            <div className="menu-item" onClick={handleGoHome}>Go Home</div>
          ) : (
            <div className="menu-item" onClick={handleGoToFavorites}>Go to Favorites</div>
          )}
          {inProfile ? (
            <div className="menu-item" onClick={handleGoHome}>Go Home</div>
          ) : (
            <div className="menu-item" onClick={handleGoToProfile}>Profile</div>
          )}
          <div className="menu-item logout" onClick={() => {dispatch(logout()); navigate("/login");}}>Logout</div>
        </div>
      )}
    </div>
  );
};

export default CircleButtonMenu;
