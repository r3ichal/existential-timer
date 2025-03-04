import { createAction } from "@reduxjs/toolkit";
import { SET_TIMER, DECREASE_TIMER, RESET_TIMER } from "@store/types";

const setTimer = createAction(SET_TIMER);
const decreaseTimer = createAction(DECREASE_TIMER);
const resetTimer = createAction(RESET_TIMER);

export { setTimer, decreaseTimer, resetTimer };