import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useGetContactsQuery } from "../../redux/apis/admin.api";

const Contact = () => {
  const { data, isLoading, error } =
    useGetContactsQuery();

  if (isLoading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>Unable to fetch contacts</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>
        Contact Messages
      </Text>

      {data?.result?.map((item: any, index: number) => (
        <View
          key={item._id?.toString() || index.toString()}
          style={styles.card}
        >
          <View style={styles.row}>
            <Text style={styles.label}>
              ID:
            </Text>

            <Text style={styles.value}>
              {item._id}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Name:
            </Text>

            <Text style={styles.value}>
              {item.name}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Email:
            </Text>

            <Text style={styles.value}>
              {item.email}
            </Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>
              Subject:
            </Text>

            <Text style={styles.value}>
              {item.subject}
            </Text>
          </View>

          <View style={styles.messageBox}>
            <Text style={styles.label}>
              Message:
            </Text>

            <Text style={styles.message}>
              {item.message}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Contact;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
    paddingTop: 50,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 4,
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  label: {
    fontWeight: "700",
    fontSize: 15,
    width: 80,
    color: "#111",
  },

  value: {
    flex: 1,
    fontSize: 15,
    color: "#555",
  },

  messageBox: {
    marginTop: 10,
  },

  message: {
    marginTop: 6,
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
    paddingBottom: 50,
  },
});