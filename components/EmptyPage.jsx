import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const EmptyPage = () => {
  const router = useRouter();
  return (
    <View style={styles.noTodosContainer}>
      <Svg width="100" height="100" viewBox="0 0 24 24" fill="none">
        <Path
          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
          fill="#F38588"
        />
      </Svg>
      <Text style={styles.noTodosText}>No Todos Found for Today!</Text>
      <TouchableOpacity
        onPress={() =>
          router.replace({
            pathname: "add",
          })
        }>
        <Text
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            color: "#F38588",
            borderRadius: 10,
            marginVertical: 5,
          }}>
          Add a new Todo
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default EmptyPage;

const styles = StyleSheet.create({
  noTodosContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  noTodosText: {
    textAlign: "center",
    fontSize: 14,
  },
});
