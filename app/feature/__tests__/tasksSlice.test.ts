import tasksReducer, { addTask } from "../tasksSlice";

describe("tasksSlice", () => {
  it("agrega un task correctamente", () => {
    const initialState = { items: [] };
    const action = addTask("Nuevo Task");
    const state = tasksReducer(initialState, action);
    expect(state.items.length).toBe(1);
    expect(state.items[0].description).toBe("Nuevo Task");
  });
});
