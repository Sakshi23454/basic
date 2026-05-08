import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useDispatch } from "react-redux";
import reduxStore from "./redux/store";
import type { AppDispatch } from "./redux/store";
// import Home from "./screens/Home";
// import About from "./screens/About";
// import Skills from "./screens/Skills";
// import Projects from "./screens/Projects";
// import Experience from "./screens/Experience";
// import Contact from "./screens/Contact";
import { loadAdmin } from "./redux/thunks/auththunk";
import Login from "./screens/Login/Login";
import Dashboard from "./screens/Admin/Dashboard";
import AdminDashboard from "./screens/Admin/Dashboard";

const Stack = createNativeStackNavigator();

const MainApp = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadAdmin()); 
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen options={{ headerShown: false }} name="home" component={Home} />
        <Stack.Screen options={{ headerShown: false }} name="about" component={About} />
        <Stack.Screen name="skills" component={Skills} />
        <Stack.Screen name="projects" component={Projects} />
        <Stack.Screen name="experience" component={Experience} />
        <Stack.Screen name="contact" component={Contact} /> */}
        <Stack.Screen options={{ headerShown: false }} name="login" component={Login} />
        <Stack.Screen options={{ headerShown: false }} name="dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={reduxStore}>
      <MainApp />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});