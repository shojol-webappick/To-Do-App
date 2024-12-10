import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import { getSingleTodo } from "../../../../utils/DBOperations";
import TodoForm from "../../../../components/TodoForm";

const AddTodo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [todo, setTodo] = useState(null);
  const { id } = useLocalSearchParams();
  console.log(id);
  useFocusEffect(
    React.useCallback(() => {
      const fetchTodo = async () => {
        if (id) {
          console.log("Fetching todo with ID:", id);
          const fetchedTodo = await getSingleTodo(id);
          setTodo(fetchedTodo);
        } else {
          setTodo(null);
        }
        setIsLoading(false);
      };

      fetchTodo();
    }, [id])
  );

  return <View>{isLoading ? <Text>Loading...</Text> : <TodoForm todo={todo} />}</View>;
};

export default AddTodo;
