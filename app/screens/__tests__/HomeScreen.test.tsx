import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import HomeScreen from "../HomeScreen";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types";

describe("HomeScreen", () => {
  it("renderiza los botones y llama navigation.navigate", () => {
    // Mock del navigation con tipo mínimo para TypeScript
    const navigateMock = jest.fn();
    const navigation = {
      navigate: navigateMock,
    } as unknown as NativeStackNavigationProp<RootStackParamList, "Home">;
    const route = {} as any;

    const { getByText } = render(
      <HomeScreen navigation={navigation} route={route} />
    );

    const tasksButton = getByText("Tasks");
    const listButton = getByText("List");

    expect(tasksButton).toBeTruthy();
    expect(listButton).toBeTruthy();

    fireEvent.press(tasksButton);
    fireEvent.press(listButton);

    expect(navigateMock).toHaveBeenCalledWith("Tasks");
    expect(navigateMock).toHaveBeenCalledWith("Listado");
  });
});
