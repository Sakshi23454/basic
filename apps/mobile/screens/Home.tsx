import {
  StyleSheet, Text, View, Image,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
// import { AppNavigation } from '../types/Navigation'
import { Button } from 'react-native-paper'
import { AppNavigation } from '@repo/types'
import { useGetProfileQuery, useGetProjectsQuery, useGetSkillsQuery, useViewStatsQuery } from '../redux/apis/user.api'

const Home = () => {
  const { data } = useGetProfileQuery()
  const { data: statData } = useViewStatsQuery()
  const { data: projectData } = useGetProjectsQuery()
  const { data: skillData } = useGetSkillsQuery()

  const { navigate } = useNavigation<AppNavigation>()

  return <>
    <View>
      {/* <Text>Home</Text> */}
      {/* <Button mode='contained' onPress={() => navigate("about")}>About</Button> */}

      {/* hero section */}
      <View style={styles.container}>

        {/* Left Content */}
        <View style={styles.left}>
          <Text style={styles.heading}>Hi, I'm</Text>

          <Text style={styles.name}>
            {data?.result?.name}
          </Text>

          <Text style={styles.bio}>
            {data?.result?.bio ||
              "MERN Stack Developer crafting beautiful web experiences"}
          </Text>

          <Text style={styles.description}>
            A MERN Stack Developer focused on building fast, scalable, and responsive web applications with modern technologies.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.outlineDarkBtn}
              onPress={() => navigation.navigate("Contact")}
            >
              <Text style={styles.darkText}>Let's Connect</Text>
            </TouchableOpacity>

            {data?.result?.resume && (
              <TouchableOpacity
                style={styles.outlinePrimaryBtn}
                onPress={() => Linking.openURL(data?.result?.resume as string)}
              >
                <Text style={styles.primaryText}>Download Resume</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Right Image */}
        <View style={styles.right}>
          {data?.result?.ProfilePic && (
            <Image
              source={{ uri: data.result.ProfilePic }}
              style={styles.image}
            />
          )}
        </View>
      </View>
    </View>
  </>
}
export default Home

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },

  left: {
    width: "100%",
    alignItems: "center",
  },

  heading: {
    fontSize: 22,
    fontWeight: "600",
  },

  name: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#007bff",
    marginVertical: 5,
  },

  bio: {
    color: "gray",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
    maxWidth: 300,
  },

  description: {
    color: "gray",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    paddingHorizontal: 10,
  },

  buttonRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  outlineDarkBtn: {
    borderWidth: 1,
    borderColor: "#000",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },

  darkText: {
    color: "#000",
  },

  outlinePrimaryBtn: {
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
  },

  primaryText: {
    color: "#007bff",
  },

  right: {
    marginTop: 20,
    alignItems: "center",
  },

  image: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 10,
    borderColor: "#cfe8ff",
  },
});