import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface LikesArray {
  value: string[];
}

const initialState: LikesArray = {
  value: [],
};

export const reviewHelpfulSlice = createSlice({
  name: "reviewHelpful",
  initialState,
  reducers: {
    addLike: (state: LikesArray, action) => {
      state.value = [...state.value, action.payload];
    },
    removeLike: (state: LikesArray, action) => {
      const updatedArray = state.value.filter((id) => {
        return id !== action.payload;
      });

      state.value = updatedArray;
    },
  },
});

export const { addLike, removeLike } = reviewHelpfulSlice.actions;

export const reviewHelpful = (state: RootState) => state.reviewHelpful.value;

export default reviewHelpfulSlice.reducer;
