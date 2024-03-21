'use client'
import IToken from "@/interfaces/IToken";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IToken = {
  accessToken: '',
  refreshToken: ''
}

const authSlice = createSlice({
  name: 'auth-slice',
  initialState,
  reducers: {
    setToken(state, action: PayloadAction<IToken>) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
    }
  }
})

export const {setToken} = authSlice.actions
export default authSlice.reducer