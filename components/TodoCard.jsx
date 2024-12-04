import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

const TodoCard = ({ title, description, priority, status,id }) => {
const route = useRouter()
  return (
    <Pressable onPress={
 () => route.push({
        name: "/singleTodo",
        params: { id }
      })
    }>
       <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      <View style={styles.metaContainer}>
        <Text style={styles.priority}>
          Priority: <Text style={{ fontWeight: "bold" }}>{priority}</Text>
        </Text>
        <Text
          style={[
            styles.status,
            status === "todo"
              ? styles.todo
              : status === "in-progress"
              ? styles.inProgress
              : styles.done,
          ]}
        >
          {status}
        </Text>
      </View>
    </View>
   </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#B0DCD4",
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F38588",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#333",
    marginBottom: 10,
  },
  metaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priority: {
    fontSize: 14,
    color: "#F38588",
  },
  status: {
    fontSize: 14,
    textTransform: "capitalize",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
  },
  todo: {
    backgroundColor: "#F38588",
    color: "#fff",
  },
  inProgress: {
    backgroundColor: "#FFD580",
    color: "#fff",
  },
  done: {
    backgroundColor: "#9CCC65",
    color: "#fff",
  },
});

export default TodoCard;
