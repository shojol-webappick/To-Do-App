import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { createTable, insertTodo } from "../utils/DBOperations";
import PriorityField from "./PriorityField";

const TodoForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  const router = useRouter();

  useEffect(() => {
    createTable();
  }, []);

  const handleSubmit = () => {
    if (!title || !description || !priority) {
      alert("Please fill in all the fields!");
      return;
    }

    const currentDate = new Date();
    const createdDate = currentDate.toLocaleDateString();
    const createdTime = currentDate.toLocaleTimeString();
    const updatedDate = currentDate.toLocaleDateString();
    const updatedTime = currentDate.toLocaleTimeString();

    const newTodo = {
      id: toString(Math.floor(Math.random() * 1000) + 1),
      title,
      description,
      priority,
      status: "in-progress",
      createdDate,
      updatedDate,
      createdTime,
      updatedTime,
    };

    insertTodo(newTodo);
    alert("Todo added successfully!");
    setTitle("");
    setDescription("");
    setPriority("");
    router.push("/allTodos");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Add New Todo</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          keyboardType="default"
          style={styles.input}
          placeholder="Enter Todo title"
          value={title}
          onChangeText={setTitle}
        />
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
        <Text style={styles.submitButtonText}>Add Todo</Text>
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
