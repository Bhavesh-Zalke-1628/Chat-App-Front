
import { createSlice } from '@reduxjs/toolkit'
import { build } from 'vite'
const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || null
}


const user = createSlice({
    name: 'User',
    initialState,
    reducers: {},
    extraReducers: (builder) => { }
})