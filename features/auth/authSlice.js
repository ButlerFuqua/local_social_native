import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userToken: null,
    isLoggedOut: true,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserToken: (state, action) => {
            console.log('action.payload', action.payload)
            state.userToken = action.payload
            state.isLoggedOut = false
        },
        logoutUser: (state) => {
            state.userToken = null
            state.isLoggedOut = true
        }
    },
})

// Action creators are generated for each case reducer function
export const {
    setUserToken,
    logoutUser,
} = authSlice.actions

export default authSlice.reducer