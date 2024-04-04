import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface ITimeState {
  formattedTime: {
    hours: number;
    minutes: number;
    seconds: number;
    hourAngle: number;
    minuteAngle: number;
    secondAngle: number;
  };
  currentTime: Date | number;
}

const initialState: ITimeState = {
  currentTime: new Date(),
  formattedTime: {
    hours: 0,
    minutes: 0,
    seconds: 0,
    hourAngle: 0,
    minuteAngle: 0,
    secondAngle: 0,
  },
};

const timeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    UPDATE_TIME: (state) => {
      const now = new Date();
      state.currentTime = now.getTime();

      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const hourAngle = hours * 30 + minutes * 0.5;
      const minuteAngle = minutes * 6 + seconds * 0.1;
      const secondAngle = seconds * 6;

      state.formattedTime = {
        hours,
        minutes,
        seconds,
        hourAngle,
        minuteAngle,
        secondAngle,
      };
    },
  },
});

export const { UPDATE_TIME } = timeSlice.actions;

export const selectFormattedTime = (state: RootState) =>
  state.time.formattedTime;

export default timeSlice.reducer;
