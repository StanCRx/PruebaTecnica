import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../app/types";
import HomeScreen from "./screens/HomeScreen";
import TasksScreen from "./screens/TaskScreen";
import ListadoScreen from "./screens/ListScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const Stack = createNativeStackNavigator<RootStackParamList>();

const SafeScreen: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <SafeAreaView style={{ flex: 1 }}>{children}</SafeAreaView>;
};

export const AppNavigator = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ title: "Inicio" }}>
          {(props) => (
            <SafeScreen>
              <HomeScreen {...props} />
            </SafeScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="Tasks" options={{ title: "Tasks" }}>
          {() => (
            <SafeScreen>
              <TasksScreen />
            </SafeScreen>
          )}
        </Stack.Screen>
        <Stack.Screen name="Listado" options={{ title: "Listado Remoto" }}>
          {() => (
            <SafeScreen>
              <ListadoScreen />
            </SafeScreen>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaProvider>
);
