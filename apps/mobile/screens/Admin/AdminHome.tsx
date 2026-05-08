import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { AppNavigation } from "../../types/navigation";

const Home = () => {
  const { navigate } = useNavigation<AppNavigation>();

  return (
    <View style={styles.container}>
            <View style={styles.topBar}>
        <Button
          mode="contained-tonal"
          onPress={() => navigate("login")}
        >
          Logout
        </Button>
      </View>

      <View style={styles.content}>
        <Text style={styles.heading}>
          Welcome to Admin Dashboard
        </Text>
      </View>

    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },

  topBar: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },

  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#0d6efd",
    textAlign: "center",
  },
});