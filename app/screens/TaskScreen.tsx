import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Modal,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { addTask } from "../feature/tasksSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";

export default function TaskScreen() {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.items);

  const [modalVisible, setModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  const onAdd = () => {
    const trimmed = description.trim();
    if (!trimmed) {
      Alert.alert("Validación", "La descripción no puede estar vacía");
      return;
    }
    dispatch(addTask(trimmed));
    setDescription("");
    setModalVisible(false);
  };

  const renderItem = ({
    item,
  }: {
    item: { id: string; description: string };
  }) => (
    <View style={styles.item}>
      <Text>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No hay tasks aún</Text>}
      />

      <View style={styles.footer}>
        <Button
          title="Agregar nuevo task"
          onPress={() => setModalVisible(true)}
        />
      </View>

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        statusBarTranslucent
      >
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
            setModalVisible(false);
          }}
        >
          <View style={styles.modalBackdrop}>
            <TouchableWithoutFeedback>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Nuevo Task</Text>
                <TextInput
                  accessibilityLabel="task-input"
                  placeholder="Descripción"
                  value={description}
                  onChangeText={setDescription}
                  style={styles.input}
                  autoFocus
                />
                <View style={{ height: 8 }} />
                <Button title="Agregar" onPress={onAdd} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  footer: { paddingTop: 8 },
  item: {
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#ccc",
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: "#0006",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  modalCard: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 8, padding: 10 },
});
