import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";

interface Element {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
}

export default function ListScreen() {
  const [data, setData] = useState<Element[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://6172cfe5110a740017222e2b.mockapi.io/elements"
        );
        if (!res.ok) throw new Error("Error en la petición");
        const json: Element[] = await res.json();
        setData(json);
      } catch (err: any) {
        setError(err.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 12 }}>Cargando…</Text>
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text>Ocurrió un error: {error}</Text>
      </View>
    );

  return (
    <FlatList
      accessibilityLabel="listado-list"
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.row}>
          <Text style={styles.name}>{item.name}</Text>
          {item.avatar && (
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
          )}
        </View>
      )}
      ItemSeparatorComponent={() => <View style={styles.sep} />}
      ListEmptyComponent={<Text>No hay elementos</Text>}
      contentContainerStyle={data.length === 0 ? styles.center : undefined}
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  name: { fontSize: 16 },
  sep: { height: StyleSheet.hairlineWidth, backgroundColor: "#ddd" },
  avatar: { width: 40, height: 40, borderRadius: 20, marginLeft: 8 },
});
