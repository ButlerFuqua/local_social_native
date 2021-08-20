import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    username: null,
    email: null,
    token: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserData: (state, action) => {
            const { username, email, token } = action.payload
            state.username = action.payload.username
            state.email = action.payload.email
            state.token = action.payload.token
        },
        decrement: (state) => {
            state.value -= 1
        },
        incrementByAmount: (state, action) => {
            state.value += action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { updateUserData, decrement, incrementByAmount } = userSlice.actions

export default userSlice.reducer