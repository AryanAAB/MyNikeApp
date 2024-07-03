import React, {useState} from "react";
import { setName, setEmail, setPassword } from './UserAuthentication/userSlice';
import {useSelector, useDispatch} from 'react-redux';
import NormalNavBar from './NormalNavBar';
import './Profile.css';

const Profile = () => {
  
  const currUser = useSelector((state) => state.user.currentUser);
  const [editing, setEditing] = useState(false);
  const [name, setLocalName] = useState(currUser["userName"]);
  const [email, setLocalEmail] = useState(currUser["email"]);
  const [password, setLocalPassword] = useState(currUser["password"]);
  const dispatch = useDispatch();

  const handleSave = () => {
    setEditing(false);
  };

  return (
    <>
        <header className="grid-header">
            <NormalNavBar inProfile="true"/>
        </header>
        <div className="profile-container">
        {editing ? (
            <div className="profile-form">
            <label>
                UserName:
                <input
                type="text"
                value={name}
                onChange={(e) => {dispatch(setName(e.target.value)); setLocalName(e.target.value);}}
                />
            </label>
            <label>
                Email:
                <input
                type="email"
                value={email}
                onChange={(e) => {dispatch(setEmail(e.target.value)); setLocalEmail(e.target.value);}}
                />
            </label>
            <label>
                Password:
                <input
                type="text"
                value={password}
                onChange={(e) => {dispatch(setPassword(e.target.value)); setLocalPassword(e.target.value);}}
                />
            </label>
            <button onClick={handleSave}>Save</button>
            </div>
        ) : (
            <div className="profile-details">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <button onClick={() => setEditing(true)}>Edit Profile</button>
            </div>
        )}
        </div>
    </>
  );
};

export default Profile;
