import { useSearchParams } from "expo-router/build/hooks";
import React from "react";
import { Text, View } from "react-native";

const SingleTodo = () => {
  const params = useSearchParams();
  console.log(params);
  return (
    <View>
      <Text>singleTodo </Text>
    </View>
  );
};

export default SingleTodo;
