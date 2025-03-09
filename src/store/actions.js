import { createAction } from "@reduxjs/toolkit";
import { SET_TIMER, DECREASE_TIMER, RESET_TIMER, SET_TIMER_STYLE } from "@store/types";

const setTimer = createAction(SET_TIMER);
const decreaseTimer = createAction(DECREASE_TIMER);
const resetTimer = createAction(RESET_TIMER);

const setStyle = createAction(SET_TIMER_STYLE);

export { setTimer, decreaseTimer, resetTimer, setStyle };