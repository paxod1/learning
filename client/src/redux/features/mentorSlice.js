import { createSlice } from "@reduxjs/toolkit";

const initialState = {
       mentor: {},
       userAutherized:false,
};

export const mentorSlice = createSlice({
    name: 'mentor',
    initialState,
    reducers: {
        saveMentor: (state, action) => {
            state.userAutherized=true
            state.mentor = action.payload;
        },
        clearMentor: (state) => {
            state.userAutherized=true
            state.mentor = {};
        },
    },
});

// Action creators are generated for each case reducer function
export const { saveMentor, clearMentor } = mentorSlice.actions;

export default mentorSlice.reducer;