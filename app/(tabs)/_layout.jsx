import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#F38588",
        tabBarInactiveTintColor: "#B0DCD4",
      }}>
      <Tabs.Screen
        name="(index)"
        options={{
          headerShown: false,
          tabBarLabel: "Home",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="addTodo/[id]"
        options={{
          tabBarLabel: "Add Todo",
          tabBarIcon: ({ color, size }) => <Ionicons name="add" size={size} color={color} />,
        }}
      /> */}
      <Tabs.Screen
        name="add"
        options={{
          tabBarLabel: "Add Todo",
          tabBarIcon: ({ color, size }) => <Ionicons name="add" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="allTodos"
        options={{
          tabBarLabel: "ALL ToDo",
          tabBarIcon: ({ color, size }) => <Ionicons name="list" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
