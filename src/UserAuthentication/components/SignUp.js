import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset, signUp } from '../userSlice';
import "./SignUp.css";

const SignUp = () => {
  const [email, setEmail] = useState('');                 //stores the email
  const [password, setPassword] = useState('');           //stores the password
  const [userName, setUserName] = useState('');           //stores the username
  const [loggedIn, setLoggedIn] = useState(false);        //checks if the user pressed the sign up button
  const dispatch = useDispatch();                         //for updating the Redux
  const error = useSelector((state) => state.user.error); //gets any error messages from Redux
  const navigate = useNavigate();                         //for navigating to different pages

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUp({ userName, email, password }));
    setLoggedIn(true);
  };

  useEffect(() => {
    dispatch(reset());
  }, []);

  useEffect(() => {
    if (!error && loggedIn) {
      navigate('/products');
    }
  }, [loggedIn]);

  return (
    <div className="container">
      <div className="screen">
        <div className="screen__content">
          <h1 className="login__header"> Nike Sign Up</h1>
          <form onSubmit={handleSubmit} className="login">
          <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input 
                type="text" 
                className="login__input" 
                placeholder="Username"
                value={userName}
                onChange={(e) => {setUserName(e.target.value); dispatch(reset());}}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-user"></i>
              <input 
                type="email" 
                className="login__input" 
                placeholder="Email" 
                value={email}
                onChange={(e) => {setEmail(e.target.value); dispatch(reset());}}
              />
            </div>
            <div className="login__field">
              <i className="login__icon fas fa-lock"></i>
              <input 
                type="password" 
                className="login__input" 
                placeholder="Password"
                value={password}
                onChange={(e) => {setPassword(e.target.value); dispatch(reset());}}
              />
            </div>
            <button className="button login__submit">
              <span className="button__text">Sign Up</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
            <button className="button login__submit" onClick={() => navigate('/login')}>
              <span className="button__text">Go to Login Page</span>
              <i className="button__icon fas fa-chevron-right"></i>
            </button>
          </form>
          {error && <p className="login__error">{error}</p>}
        </div>
        <div className="screen__background">
          <span className="screen__background__shape screen__background__shape4"></span>
          <span className="screen__background__shape screen__background__shape3"></span>    
          <span className="screen__background__shape screen__background__shape2"></span>
          <span className="screen__background__shape screen__background__shape1"></span>
        </div>    
      </div>
    </div>
  );
};

export default SignUp;
