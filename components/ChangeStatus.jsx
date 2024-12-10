import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { updateStatus } from "../utils/DBOperations";

const ChangeStatus = ({ status, id, showStatus, setShowStatus, setShow, setIsRefresh, refreshing }) => {
  return (
    <Pressable
      onPress={() => {
        setShow(false);
        setShowStatus(!showStatus);
      }}>
      <Text
        style={[
          styles.status,
          status === "todo" ? styles.todo : status === "in-progress" ? styles.inProgress : styles.done,
        ]}>
        {status}
      </Text>
      <View>
        {showStatus && (
          <View style={styles.optionsContainer}>
            {status === "done" && (
              <>
                <Pressable
                  onPress={() => {
                    setShowStatus(false);
                    updateStatus(id, "todo");
                    setIsRefresh(!refreshing);
                  }}>
                  <Text style={styles.optionText}>Set to Todo</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowStatus(false);
                    updateStatus(id, "in-progress");
                    setIsRefresh(!refreshing);
                  }}>
                  <Text style={styles.optionText}>Set to In Progress</Text>
                </Pressable>
              </>
            )}

            {status === "todo" && (
              <>
                <Pressable
                  onPress={() => {
                    setShowStatus(false);
                    updateStatus(id, "done");
                    setIsRefresh(!refreshing);
                  }}>
                  <Text style={styles.optionText}>Mark as Done</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowStatus(false);
                    updateStatus(id, "in-progress");
                    setIsRefresh(!refreshing);
                  }}>
                  <Text style={styles.optionText}>Start In Progress</Text>
                </Pressable>
              </>
            )}

            {status === "in-progress" && (
              <>
                <Pressable
                  onPress={() => {
                    setShowStatus(false);
                    updateStatus(id, "done");
                    setIsRefresh(!refreshing);
                  }}>
                  <Text style={styles.optionText}>Mark as Done</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setShowStatus(false);
                    updateStatus(id, "todo");
                    setIsRefresh(!refreshing);
                  }}>
                  <Text style={styles.optionText}>Revert to Todo</Text>
                </Pressable>
              </>
            )}
          </View>
        )}
      </View>
    </Pressable>
  );
};

export default ChangeStatus;

const styles = StyleSheet.create({
  status: {
    fontSize: 14,
    textTransform: "capitalize",
    paddingVertical: 2,
    paddingHorizontal: 10,
    borderRadius: 5,
    overflow: "hidden",
    zIndex: 1,
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
  },
});
