import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { RootStackParamList } from "../types";

export default function HomeScreen({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "Home">) {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title="Tasks" onPress={() => navigation.navigate("Tasks")} />
      </View>
      <View style={styles.button}>
        <Button title="List" onPress={() => navigation.navigate("Listado")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  button: { marginVertical: 8 },
});
