import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";

import { createServer } from "miragejs";
import { useQuery } from "react-query";
import axios from "axios";

createServer({
  routes() {
    this.routes = 1000;
    this.get(
      "/api/users",
      () => [
        { id: "1", key: "1", name: "PB" },
        { id: "2", key: "2", name: "Pranav" },
        { id: "3", key: "3", name: "Kumar" },
      ],
      { timing: 750 }
    );
  },
});

const getUsersApi = async () => {
  const data = await axios.get("/api/users");
  return data?.data || ["No Users"];
};

export default function App() {
  const { data, isFetching, status, isLoading } = useQuery(
    "getUsers",
    getUsersApi
  );

  if (status === "loading" || isFetching || isLoading) {
    return (
      <View
        style={{
          padding: 50,
          paddingLeft: 150,
        }}
      >
        <Text>Loading....</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    height: "80%",
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-end",
  },
});
