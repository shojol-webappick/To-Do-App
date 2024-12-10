import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createTable, insertTodo, updateTodo } from "../utils/DBOperations";
import PriorityField from "./PriorityField";

const TodoForm = ({ todo = {} }) => {
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [status, setStatus] = useState("todo");
  const [title, setTitle] = useState("");
  const [id, setId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (todo?.title) {
      setTitle(todo.title);
      setDescription(todo.description);
      setPriority(todo.priority);
      setStatus(todo.status);
      setId(todo.id);
    }
  }, [todo]);

  useEffect(() => {
    createTable();
  }, []);

  const handleSubmit = async () => {
    if (!title || !description || !priority) {
      alert("Please fill in all the fields!");
      return;
    }

    const currentDate = new Date();

    if (id) {
      const updatedData = {
        title,
        description,
        priority,
        status,
        updatedDate: currentDate.toLocaleDateString(),
        updatedTime: currentDate.toLocaleTimeString(),
      };
      await updateTodo(id, updatedData);
      alert("Todo updated successfully!");
    } else {
      const createdDate = currentDate.toLocaleDateString();
      const createdTime = currentDate.toLocaleTimeString();
      const newTodo = {
        title,
        description,
        priority,
        status: "todo",
        createdDate,
        updatedDate: createdDate,
        createdTime,
        updatedTime: createdTime,
      };
      await insertTodo(newTodo);
      alert("Todo added successfully!");
    }

    setTitle("");
    setDescription("");
    setPriority("");
    setStatus("todo");
    setId(null);

    router.push("/");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>{id ? "Edit Todo" : "Add New Todo"}</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} placeholder="Enter Todo title" value={title} onChangeText={setTitle} />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter Todo description"
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Priority</Text>
        <PriorityField priority={priority} setPriority={setPriority} />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>{id ? "Update Todo" : "Add Todo"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
    backgroundColor: "#F4F7FC",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#4A4A4A",
    textAlign: "center",
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    height: 45,
    paddingHorizontal: 10,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    fontSize: 16,
    color: "#333",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#F38588",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default TodoForm;
