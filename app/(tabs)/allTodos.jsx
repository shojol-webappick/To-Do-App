import { useFocusEffect } from "expo-router";
import React, { useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import TodoCard from "../../components/TodoCard";
import { getAllTodos } from "../../utils/DBOperations";

const allList = () => {
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      fetchAndSortTodos();
    }, [])
  );

  const fetchAndSortTodos = async () => {
    const allTodos = await getAllTodos();
    const sortedList = [...allTodos].sort((a, b) => {
      const statusOrder = { "in-progress": 1, todo: 2, done: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
    setList(sortedList);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading Todos...</Text>
      </View>
    );
  }
  if (list) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#fff", height: "100%", width: "100%" }}>
          <Text style={styles.header}>Today's Work</Text>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={list}
            renderItem={({ item }) => (
              <TodoCard
                id={item.id}
                title={item.title}
                description={item.description}
                priority={item.priority}
                status={item.status}
                createdDate={item.createdDate}
              />
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
};

export default allList;

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    color: "#F38588",
  },
});
