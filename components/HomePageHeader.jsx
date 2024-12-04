import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HomePageHeader = () => {
  return (
    <View style={[styles.container]}>
      <View style={[styles.layerContainer]}>
         <View style={[styles.firstLayer]}>
        <View style={[styles.secondLayer]}>
          <Text style={[styles.innerText]}>
            My TO-DO List
          </Text>
        </View>
      </View>
     </View>
    </View>
  )
}

export default HomePageHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#B0DCD4",
    marginHorizontal: "auto",
    marginVertical: 20,
    borderRadius: 50,
    padding: 10,
    maxWidth: 220,
  },
  layerContainer: {
     height: 180,
    width: 180,
    marginHorizontal: "auto"
  }
  ,
  firstLayer: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    borderRadius: "100%",
    padding: 20,       
  },
  secondLayer: {
    backgroundColor: "#F38588",
    height: "100%",
    width: "100%",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  innerText: {
    fontSize: 28,
    textAlign: "center",
    fontWeight: "bold",
    color: "white"
  },
})