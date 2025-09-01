import { render, fireEvent } from "@testing-library/react-native";
import TasksScreen from "../TaskScreen";
import { Provider } from "react-redux";
import { legacy_configureStore as configureStore } from "redux-mock-store";

const mockStore = configureStore([]);
const store = mockStore({ tasks: { items: [] } });

test("abre modal al presionar botón", () => {
  const { getByText } = render(
    <Provider store={store}>
      <TasksScreen />
    </Provider>
  );
  fireEvent.press(getByText("Agregar nuevo task"));
  expect(getByText("Nuevo Task")).toBeTruthy();
});
