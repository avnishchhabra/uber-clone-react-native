import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  timeForTravel: null,
};

const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTimeToTravel: (state, action) => {
      state.timeForTravel = action.payload;
    },
  },
});

// export actions

export const { setOrigin, setDestination, setTimeToTravel } = navSlice.actions;

// exprot selectors

export const selectOrigin = (state) => state.nav.origin;
export const selectDestination = (state) => state.nav.destination;
export const selectTimeForTravel = (state) => state.nav.timeForTravel;
// export slice reducer

export default navSlice.reducer;
