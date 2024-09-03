import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentId: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
  },
});

export const { setStudentId } = studentSlice.actions;

export default studentSlice.reducer;