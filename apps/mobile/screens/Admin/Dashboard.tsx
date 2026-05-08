import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { EvilIcons } from '@expo/vector-icons'
import AboutAdmin from './About'
import Home from './AdminHome'
import Entypo from '@expo/vector-icons/Entypo';
import AddSkill from './Skills'
import Feather from '@expo/vector-icons/Feather';
import Project from './Projects'
import AntDesign from '@expo/vector-icons/AntDesign';
import Experience from './Experience'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Contact from './Contact'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Education from './Education'
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Statistics from './Statistics'

const AdminDashboard = () => {
  const Tab = createBottomTabNavigator()

  return (
    <Tab.Navigator>
      <Tab.Screen name='adminhome' options={{ headerShown: false, tabBarIcon: () => <Entypo name="home" size={24} color="black" /> }} component={Home} />
      <Tab.Screen name='about' options={{ headerShown: false, tabBarIcon: () => <EvilIcons name="user" size={24} color="black" /> }} component={AboutAdmin} />
      <Tab.Screen name='skills' options={{ headerShown: false, tabBarIcon: () => <Feather name="code" size={24} color="black" /> }} component={AddSkill} />
      <Tab.Screen name='projects' options={{ headerShown: false, tabBarIcon: () => <AntDesign name="project" size={24} color="black" /> }} component={Project} />
      <Tab.Screen name='experience' options={{ headerShown: false, tabBarIcon: () => <MaterialIcons name="work" size={24} color="black" /> }} component={Experience} />
      <Tab.Screen name='contact' options={{ headerShown: false, tabBarIcon: () =><FontAwesome6 name="contact-card" size={24} color="black" /> }} component={Contact} />
      <Tab.Screen name='education' options={{ headerShown: false, tabBarIcon: () =><SimpleLineIcons name="graduation" size={24} color="black" /> }} component={Education} />
      <Tab.Screen name='statistics' options={{ headerShown: false, tabBarIcon: () =><MaterialCommunityIcons name="google-analytics" size={24} color="black" /> }} component={Statistics} />
    </Tab.Navigator>
  )
}

export default AdminDashboard

const styles = StyleSheet.create({})