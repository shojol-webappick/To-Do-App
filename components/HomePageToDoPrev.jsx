import React, { useEffect, useState } from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import todoList from './data';
import TodoCard from './TodoCard';

const HomePageToDoPrev = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const sortedList = [...todoList].sort((a, b) => {
      const statusOrder = { "in-progress": 1, todo: 2, done: 3 };
      return statusOrder[a.status] - statusOrder[b.status];
    });
    setList(sortedList);
  }, []);

  const date = new Date();

  const formattedDate = new Intl.DateTimeFormat("en-CA", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#fff", height: "100%", width: "100%" }}>
        <Text style={[styles.header]}>Today's Work</Text>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={list.filter((item) => item.createdDate === formattedDate)} 
          renderItem={({ item }) => (
            <TodoCard
              id={item.id}
              title={item.title}
              description={item.description}
              priority={item.priority}
              status={item.status}
              createdDate={item.createdDate}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomePageToDoPrev;

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 10,
    color: "#F38588",
  },
});
