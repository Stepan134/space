import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      console.log('state.user', state.user);
    },
  },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer