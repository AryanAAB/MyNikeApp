import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './NavBar.css';
import logo from './images/logo.png';
import CircleButtonMenu from './CircleButtonMenu';

const NavBar = ({ onSearch, handleCancelClick, searchActive, handleSearchClick, searchInputRef, setCheckedGenderItems}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const popularSearchItems = ["Air Force 1", "Jordan", "Air Max", "Blazer"];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
      setSearchTerm("");
    }
    else if(event.key === 'Escape'){
      handleCancelClick();
      setSearchTerm("");
    }
  };

  return (
    <>
      {!searchActive && (
        <div className="navbar">
          <div className="navbar-left">
            <img src={logo} alt="Logo" className="logo clickable" onClick={() => {onSearch("")}}/>
          </div>
          <div className="navbar-center">
            <h3 onClick={() => {setCheckedGenderItems({men: true,women: false,unisex: false,kids:false});}}>Men</h3>
            <h3 onClick={() => {setCheckedGenderItems({men: false,women: true,unisex: false,kids:false});}}>Women</h3>
            <h3 onClick={() => {setCheckedGenderItems({men: false,women: false,unisex: true,kids:false});}}>Unisex</h3>
            <h3 onClick={() => {setCheckedGenderItems({men: false,women: false,unisex: false,kids:true});}}>Kids</h3>
            <h3 onClick={() => {onSearch("Jordan"); setSearchTerm("");}}>Jordan</h3>
          </div>
          <div className="navbar-right">
            <div className="search-container">
              <FaSearch className="search-icon" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search by product name..."
                value={searchTerm}
                onKeyDown={handleKeyPress}
                onChange={handleSearchChange}
                onClick={handleSearchClick}
                className="search-bar"
                autoComplete="off"
              />
            </div>
          </div>
          <div>
            <CircleButtonMenu />
          </div>
        </div>
      )}
      {searchActive && (
        <div className="search-overlay">
          <div className="search-overlay-header">
          <img src={logo} alt="Logo" className="logo"/>
            <div className="search-bar">
              <input
                ref={searchInputRef}
                type="text"
                id="search"
                value={searchTerm}
                onKeyDown={handleKeyPress}
                onChange={handleSearchChange}
                placeholder="Enter product name..."
                autoComplete="off"
              />
            </div>
            <button className="cancel-button" onClick={ () => {handleCancelClick(); setSearchTerm("");}}>Cancel</button>
          </div>
          <div className="popular-searches">
            <h2 style={{ textAlign: 'center' }}>Popular Searches</h2>
            <ul style={{ textAlign: 'center'}}>
              {popularSearchItems.map(item => (
                <li key={item} onClick={() => {onSearch(item);}} style={{fontSize:"20px"}}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;
