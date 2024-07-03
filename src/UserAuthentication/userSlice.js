import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    users: [],                  //stores all the users
    currentUser: null,          //stores the current user information
    currentIndex: -1,           //stores the index of the current user in the users list
    error: null,                //stores any error messages
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUp: (state, action) => {
            const {userName, email, password} = action.payload;
            const userExists = state.users.some(user => user.email === email);
            
            if(email === ""){
                state.currentUser = null;
                state.error = "Invalid email id.";
            }
            else if(userExists) {
                state.currentUser = null;
                state.error = "Email Already in use. Login Instead.";
            }
            else {
                state.users.push({email: email, password: password, userName: userName, favorites: [], cart: []});
                state.currentUser = state.users.find(user => user.email === email);
                state.currentIndex = state.users.indexOf(state.currentUser);
                state.error = null;
            }
        },
        login: (state, action) => {
            const {email, password} = action.payload;
            const user = state.users.find(user => user.email === email);
            
            if(!user){
                state.currentUser = null;
                state.error = "Invalid email id. Sign Up Instead."
            }
            else if(password === user.password) {
                state.currentUser = user;
                state.currentIndex = state.users.indexOf(state.currentUser);
                state.error = null;
            }
            else {
                state.currentUser = null;
                state.error = "Invalid Credentials.";
            }
        },
        reset: (state, action) => {
            state.error = null;
        },
        addFavorite: (state, action) => {
            state.currentUser["favorites"].push(action.payload);
        },
        addToCart: (state, action) => {
            state.currentUser["cart"].push(action.payload);
        },
        deleteFavorite: (state, action) => {
            state.currentUser["favorites"].splice(state.currentUser["favorites"].indexOf(action.payload), 1);
        },
        deleteCart: (state, action) => {
            state.currentUser["cart"].splice(state.currentUser["cart"].indexOf(action.payload), 1);
        },
        setName: (state, action) => {
            state.currentUser["userName"] = action.payload;
        },
        setEmail: (state, action) => {
            state.currentUser["email"] = action.payload;
        },
        setPassword: (state, action) => {
            state.currentUser["password"] = action.payload;
        },
        logout: (state, action) => {
            state.users[state.currentIndex] = state.currentUser;
            state.currentUser = null;
            state.error = null;
        }
    }
});

export const { signUp, login, logout, reset, addFavorite, addToCart, deleteFavorite, deleteCart, setName, setEmail, setPassword } = userSlice.actions;

export default userSlice.reducer;