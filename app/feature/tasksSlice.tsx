import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TasksState {
  items: { id: string; description: string }[];
}

const initialState: TasksState = { items: [] };

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now().toString(),
        description: action.payload,
      });
    },
  },
});

export const { addTask } = tasksSlice.actions;
export default tasksSlice.reducer;
