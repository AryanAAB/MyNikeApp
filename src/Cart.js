import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import nikeData from './nike.json';
import Product from './Product';
import {useSelector } from 'react-redux';
import NormalNavBar from './NormalNavBar';

const Cart = () => {

  const [products, setProducts] = useState([]);                             //stores all the products
  const [error, setError] = useState(null);                                 //if any error occurs
  const currUser = useSelector((state) => state.user.currentUser["cart"]);  //gets the products in the cart

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

  //gets the products that are added to cart
  const cartProducts = products.filter(product => currUser.includes(product.articleNo));

  return (
    <div className="grid-container">
      <header className="grid-header">
          <NormalNavBar inCart="true"/>
      </header>
        <main className="grid-main">
          {cartProducts.length === 0 ? (
            <div style={{
              marginTop: '50px', 
              fontSize: '24px', 
              color: '#888' 
            }}>
              Your cart is empty
            </div>
          ) : (
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {cartProducts.map(product => (
                <Product key={product.articleNo} product={product} />
              ))}
            </div>
          )}
        </main>
    </div>
  );
};

export default Cart;
