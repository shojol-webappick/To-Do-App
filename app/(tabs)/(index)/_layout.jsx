import { Stack } from "expo-router";
import React from "react";

const HomeLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="singleTodo/[id]"
        options={{
          headerTitle: "Details",
        }}
      />
    </Stack>
  );
};

export default HomeLayout;
