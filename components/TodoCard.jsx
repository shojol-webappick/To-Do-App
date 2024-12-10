import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter, useSegments } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { deleteTodo } from "../utils/DBOperations";
import ChangeStatus from "./ChangeStatus";

const TodoCard = ({ title, description, priority, status, id, setIsRefresh, refreshing }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const segments = useSegments();
  const routeName = segments[segments.length - 1];

  useEffect(() => {
    if (routeName !== "(index)") {
      setShowStatus(false);
      setShow(false);
    }
  }, [routeName]);

  useEffect(() => {
    setShow(false);
    setShowStatus(false);
  }, [refreshing]);
  return (
    <Pressable
      style={{ zIndex: 0 }}
      onPress={() => {
        setShow(false);
        setShowStatus(false);
        router.push(`/singleTodo/${id}`);
      }}>
      <View style={styles.card}>
        <View style={[styles.row]}>
          <Text style={styles.title}>{title}</Text>
          <Pressable
            onPress={() => {
              setShow(!show);
              setShowStatus(false);
            }}
            style={
              ([],
              {
                paddingHorizontal: 2,
                justifyContent: "center",
                alignItems: "center",
                zIndex: 15,
              })
            }>
            <MaterialCommunityIcons name="dots-vertical" size={24} color="black" />
            <View>
              {show && (
                <View style={styles.optionsContainer}>
                  <Pressable
                    onPress={() => {
                      router.push(`/addTodo/${id}`);
                    }}>
                    <Text>Edit</Text>
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      const result = deleteTodo(id);
                      if (result) {
                        setShow(false);
                        alert("success");
                        setIsRefresh(!refreshing);
                      }
                    }}>
                    <Text>Delete</Text>
                  </Pressable>
                </View>
              )}
            </View>
          </Pressable>
        </View>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.metaContainer}>
          <Text style={styles.priority}>
            Priority: <Text style={{ fontWeight: "bold" }}>{priority}</Text>
          </Text>
          <ChangeStatus
            setIsRefresh={setIsRefresh}
            refreshing={refreshing}
            id={id}
            setShow={setShow}
            showStatus={showStatus}
            setShowStatus={setShowStatus}
            status={status}
          />
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
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionsContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "white",
    width: 150,
    borderRadius: 10,
    padding: 10,
    gap: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 99999,
  },
});

export default TodoCard;
