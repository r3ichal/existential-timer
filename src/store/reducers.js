import { createReducer } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { SET_TIMER, DECREASE_TIMER, RESET_TIMER, SET_TIMER_STYLE } from "@store/types";

const initialState = { timeLeft: 0, endDate:null, style: false };

const timer = createReducer(initialState, {
  [SET_TIMER]: (state, action) => {
    state.endDate = action.payload;
  },
  [DECREASE_TIMER]: (state) => {
    if (state.timeLeft > 0) {
      state.timeLeft -= 1;
    }
  },
  [RESET_TIMER]: (state) => {
    state.timeLeft = 0;
    state.endDate = null;
  },
  [SET_TIMER_STYLE]: (state, action) => {
    state.style = action.payload;
  },
});

export default combineReducers({ timer });