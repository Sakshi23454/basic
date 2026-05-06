// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import { NavigationContainer } from '@react-navigation/native'
// import Home from './screens/Home'
// import About from './screens/About'
// import Skills from './screens/Skills'
// import Projects from './screens/Projects'
// import Experience from './screens/Experience'
// import Contact from './screens/Contact'
// import { Provider } from 'react-redux'
// import reduxStore from './../web/redux/store'
// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { loadAdmin } from "./redux/thunks/authThunk";



// const App = () => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(loadAdmin());
//   }, []);



//   const Stack = createNativeStackNavigator()
//   return <Provider store={reduxStore}>
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen name='home' component={Home} />
//         <Stack.Screen name='about' component={About} />
//         <Stack.Screen name='skills' component={Skills} />
//         <Stack.Screen name='projects' component={Projects} />
//         <Stack.Screen name='experience' component={Experience} />
//         <Stack.Screen name='contact' component={Contact} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   </Provider>
// }

// export default App

// const styles = StyleSheet.create({})


// // zod hookform stack


import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";

import reduxStore from "./../web/redux/store";

// 👇 IMPORTANT: import AppDispatch type
// import type { AppDispatch } from "./../web/redux/store";
import type { AppDispatch } from "./redux/store";

import Home from "./screens/Home";
import About from "./screens/About";
import Skills from "./screens/Skills";
import Projects from "./screens/Projects";
import Experience from "./screens/Experience";
import Contact from "./screens/Contact";

import { loadAdmin } from "./redux/thunks/auththunk";

const Stack = createNativeStackNavigator();


// ✅ Component where Redux hooks are used
const MainApp = () => {
  // ✅ FIX: typed dispatch
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadAdmin()); // ✅ no error now
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="about" component={About} />
        <Stack.Screen name="skills" component={Skills} />
        <Stack.Screen name="projects" component={Projects} />
        <Stack.Screen name="experience" component={Experience} />
        <Stack.Screen name="contact" component={Contact} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


// ✅ Root component
const App = () => {
  return (
    <Provider store={reduxStore}>
      <MainApp />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});