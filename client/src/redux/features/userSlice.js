import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  userAutherized:false
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    saveUser: (state,action) => {
      state.user=action.payload;
      state.userAutherized=true
    },
    clearUser: (state) => {
      state.user=null;
      state.userAutherized=false
    },

  },
})

// Action creators are generated for each case reducer function
export const { saveUser,clearUser } = userSlice.actions

export default userSlice.reducer