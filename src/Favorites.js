import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import nikeData from './nike.json';
import Product from './Product';
import {useSelector } from 'react-redux';
import NormalNavBar from './NormalNavBar';

const Favorite = () => {

  const [products, setProducts] = useState([]);                                 //stores all the products
  const [error, setError] = useState(null);                                     //if any error occurs
  const currUser = useSelector((state) => state.user.currentUser["favorites"]); //stores the favorites of the current user

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsWithIds = nikeData.map(response => ({
          ...response,
          id: uuidv4()
        }));

        const products = [...productsWithIds];

        setProducts(products);
      } catch (err) {
        setError('Error fetching data');
        console.error('Error fetching data:', err);
      }
    };
    
    fetchProducts();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  //gets the products that are added to favorites
  const favoriteProducts = products.filter(product => currUser.includes(product.articleNo));

  return (
    <div className="grid-container">
        <header className="grid-header">
            <NormalNavBar inFavorite="true"/>
        </header>
        <main className="grid-main">
            {favoriteProducts.length === 0 ? (
            <div style={{
              marginTop: '50px', 
              fontSize: '24px', 
              color: '#888' 
            }}>
              Nothing in Favorites
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {favoriteProducts.map(product => (
                <Product key={product.articleNo} product={product} />
              ))}
            </div>
          )}
        </main>
    </div>
  );
};

export default Favorite;
