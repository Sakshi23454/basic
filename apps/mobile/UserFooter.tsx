import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";
import { useGetProfileQuery } from "./redux/apis/user.api";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";

const UserFooter = () => {
  const { data } = useGetProfileQuery();
  const profile = data?.result;

  return (
    <View style={styles.footer}>

      <Text style={styles.name}>  {String(profile?.name || "")}</Text>

      <Text style={styles.desc}>
        Passionate MERN Stack Developer skilled in building scalable,
        responsive, and user-centric web applications.
      </Text>

      <Text style={styles.heading}>Contact Info</Text>

      <View style={styles.row}>
        <MaterialIcons name="email" size={16} color="#000" />
        <Text style={styles.text}>{String(profile?.email || "")}
        </Text>
      </View>

      <View style={styles.row}>
        <Feather name="phone" size={16} color="#000" />
        <Text style={styles.text}>{String(profile?.mobile || "")}
        </Text>
      </View>

      <View style={styles.row}>
        <Ionicons name="location-outline" size={16} color="#000" />
        <Text style={styles.text}>{String(profile?.location || "")}</Text>
      </View>

      <Text style={styles.heading}>Follow Me</Text>

      <View style={styles.iconRow}>
        {!! profile?.github && (
          <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(profile.github as string)}>
            <Feather name="github" size={18} color="#000" />
          </TouchableOpacity>
        )}

        {!! profile?.linkedin && (
          <TouchableOpacity style={styles.socialBtn} onPress={() => Linking.openURL(profile.linkedin as string)}>
            <Ionicons name="logo-linkedin" size={18} color="#000" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.line} />

      <Text style={styles.copy}>
        © {new Date().getFullYear()}  {String(profile?.name || "")}. All rights reserved.
      </Text>

    </View>
  );
};

export default UserFooter;

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#f8f9fa",
    padding: 16,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 50,
  },

  name: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
  },

  desc: {
    fontSize: 12,
    color: "#6c757d",
    textAlign: "justify",
    marginBottom: 12,
    lineHeight: 18,
    paddingLeft: 10,
  },

  heading: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 6,
    paddingLeft: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
    paddingLeft: 10,
  },

  text: {
    fontSize: 12,
    color: "#333",
    marginLeft: 8,
  },

  iconRow: {
    flexDirection: "row",
    marginTop: 6,
    marginBottom: 10,
    paddingLeft: 10,
  },

  socialBtn: {
    marginRight: 16,
  },

  line: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },

  copy: {
    textAlign: "center",
    fontSize: 11,
    color: "#6c757d",
  },
});