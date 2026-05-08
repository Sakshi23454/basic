import React from "react";
import { View, StyleSheet } from "react-native";
import UserFooter from "./UserFooter";

const AppLayout = ({ children }: any) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>{children}</View>
      <UserFooter />
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});