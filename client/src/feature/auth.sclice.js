import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    user: null,
    profile: null,
    userId:null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setUserId: (state, action) => {
            state.userId = action.payload
        },
        logout: (state) => {
            state.user = null;
            state.profile = null;
        }
    }
});

export const { setUser, setProfile, setUserId } = userSlice.actions;

export default userSlice.reducer;