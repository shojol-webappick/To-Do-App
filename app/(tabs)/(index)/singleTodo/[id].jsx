import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { deleteTodo, getSingleTodo } from "../../../../utils/DBOperations";

const SingleTodo = () => {
  const [singleTodo, setSingleTodo] = useState();
  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    const fetchTodo = async () => {
      const fetchedTodo = await getSingleTodo(id);
      setSingleTodo(fetchedTodo);
    };

    fetchTodo();
  }, [id]);
  if (!singleTodo) {
    return <Text style={styles.errorText}>No To-Do Found.....</Text>;
  }

  const { title, description, priority, status, createdDate, updatedDate, createdTime, updatedTime } = singleTodo;

  const priorityStyles = {
    first: styles.firstPriority,
    second: styles.secondPriority,
    third: styles.thirdPriority,
  };

  const statusStyles = {
    todo: styles.todoStatus,
    "in-progress": styles.inProgressStatus,
    done: styles.doneStatus,
  };
  const handleActions = (status, id) => {
    if (status === "done") {
      deleteTodo(id);
      alert("Todo deleted successfully");
    } else {
      router.push(`/addTodo/${id}`);
    }
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Todo Details</Text>

      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>{description}</Text>

      <View style={[styles.priorityContainer, priorityStyles[priority]]}>
        <Text style={styles.priorityText}>Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}</Text>
      </View>

      <View style={[styles.statusContainer, statusStyles[status]]}>
        <Text style={styles.statusText}>{status.charAt(0).toUpperCase() + status.slice(1)}</Text>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          Created: {createdDate} at {createdTime}
        </Text>
        <Text style={styles.dateText}>
          Updated: {updatedDate} at {updatedTime}
        </Text>
      </View>

      <TouchableOpacity
        style={status == "done" ? styles.deleteButton : styles.button}
        onPress={() => handleActions(status, id)}>
        {status == "done" ? (
          <Text style={styles.buttonText}>Delete Todo</Text>
        ) : (
          <Text style={styles.buttonText}>Edit Todo</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f9fc",
    padding: 20,
    justifyContent: "flex-start",
  },
  errorText: {
    textAlign: "center",
    fontSize: 18,
    color: "red",
    marginTop: 50,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2d3748",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  description: {
    fontSize: 16,
    color: "#4a5568",
    marginBottom: 20,
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  priorityContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  priorityText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  firstPriority: {
    backgroundColor: "#F38588",
  },
  secondPriority: {
    backgroundColor: "#FFD580",
  },
  thirdPriority: {
    backgroundColor: "#9CCC65",
  },
  statusContainer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  todoStatus: {
    backgroundColor: "#F38588",
  },
  inProgressStatus: {
    backgroundColor: "#FFD580",
  },
  doneStatus: {
    backgroundColor: "#9CCC65",
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#3b82f6",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  deleteButton: {
    backgroundColor: "#f71919",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SingleTodo;
