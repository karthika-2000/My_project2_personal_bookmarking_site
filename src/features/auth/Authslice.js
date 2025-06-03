import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : JSON.parse(localStorage.getItem("loggedInUser")) || null
}

const AuthSlice = createSlice({
    name : 'auth',
    initialState,
    reducers :{
        signup : (state, action) =>{
            const users = JSON.parse(localStorage.getItem('users')) || [];

            const exist = users.some((u)=>u.email === action.payload.email)

            if(exist){
                return;
            }
            users.push(action.payload);
            localStorage.setItem('users' , JSON.stringify(users));
            state.success = true;
        },

        login :(state, action)=>{
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const user = users.find(
                (u)=> u.email === action.payload.email && u.password === action.payload.password
            );

            if(user){
                localStorage.setItem('loggedInUser', JSON.stringify(user));
                state.user = user;
            }else{
                alert("Invalid email or password")
            }
        },

        logout : (state)=>{
          localStorage.removeItem('loggedInUser');
          state.user = null;
        }
    }
});

export const {signup , login, logout} = AuthSlice.actions;
export default AuthSlice.reducer;