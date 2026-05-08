// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";

// import {
//   useGetEducationQuery,
//   useGetProfileQuery,
// } from "../redux/apis/user.api";
// import UserFooter from "../UserFooter";

// const About = () => {
//   const { data } = useGetProfileQuery();
//   const { data: eduData } = useGetEducationQuery();

//   const [activeTab, setActiveTab] = useState("bio");

//   const profile = data?.result;

//   return (
//     <ScrollView contentContainerStyle={styles.container}>

//       <Text style={styles.title}>About Me</Text>

//       {profile?.profilePic && (
//         <Image
//           source={{ uri: profile.profilePic }}
//           style={styles.image}
//         />
//       )}

//       <View style={styles.tabRow}>
//         <TouchableOpacity
//           style={[styles.tabBtn, activeTab === "bio" && styles.activeTab]}
//           onPress={() => setActiveTab("bio")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "bio" && styles.activeTabText,
//             ]}
//           >
//             Bio
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.tabBtn, activeTab === "education" && styles.activeTab]}
//           onPress={() => setActiveTab("education")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "education" && styles.activeTabText,
//             ]}
//           >
//             Education
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.tabBtn, activeTab === "languages" && styles.activeTab]}
//           onPress={() => setActiveTab("languages")}
//         >
//           <Text
//             style={[
//               styles.tabText,
//               activeTab === "languages" && styles.activeTabText,
//             ]}
//           >
//             Languages
//           </Text>
//         </TouchableOpacity>
//       </View>

//       {activeTab === "bio" && (
//         <View style={styles.content}>
//           <Text style={styles.heading}>Hello There!</Text>

//           <Text style={styles.text}>
//             I'm Sakshi Markal, a MERN Stack Developer passionate about building
//             modern and efficient web applications.
//           </Text>

//           <Text style={styles.text}>
//             My journey in Web Development began during my B.Tech, where I
//             developed a strong interest in technology, web development, and
//             problem solving. This curiosity motivated me to explore modern web
//             technologies and eventually specialize in the MERN Stack (MongoDB,
//             Express.js, React.js, and Node.js).
//           </Text>

//           <Text style={styles.text}>
//             I enjoy building full-stack web applications that are scalable,
//             responsive, and user-friendly. Through continuous learning and
//             hands-on projects, I have developed skills in frontend development,
//             backend API development, database management, and mobile application
//             development. I am passionate about turning ideas into functional digital solutions and continuously improving my development skills.
//           </Text>
//         </View>
//       )}

//       {activeTab === "education" && (
//         <View style={styles.content}>
//           {eduData?.result?.map((item: any, index: number) => (
//             <View key={item?.id ?? index} style={styles.eduCard}>

//               <View style={styles.eduRow}>
//                 <Text style={styles.icon}>🎓</Text>
//                 <Text style={styles.eduTitle}>{item.degree}</Text>
//               </View>

//               <Text style={styles.eduCollege}>{item.college}</Text>
//               <Text style={styles.eduYear}>{item.year}</Text>
//             </View>
//           ))}
//         </View>
//       )}

//       {activeTab === "languages" && (
//         <View style={styles.content}>
//           <View style={styles.badgeRow}>
//             {["English", "Hindi", "Marathi"].map((lang, index) => (
//               <View key={index} style={styles.badge}>
//                 <Text style={styles.badgeText}>{lang}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//       )}
//       <View style={{ marginTop: 40}}>
//         <UserFooter/>
//       </View>
//     </ScrollView>
//   );
// };

// export default About;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 50,
//     padding: 20,
//     backgroundColor: "#f8f9fa",
//   },

//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   image: {
//     width: "100%",
//     height: 300,
//     borderRadius: 12,
//     marginBottom: 20,
//   },

//   tabRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginBottom: 20,
//   },

//   tabBtn: {
//     paddingVertical: 8,
//     paddingHorizontal: 14,
//     borderRadius: 10,
//     backgroundColor: "#e9ecef",
//   },

//   activeTab: {
//     backgroundColor: "#007bff",
//   },

//   tabText: {
//     fontSize: 13,
//     color: "#000",
//   },

//   activeTabText: {
//     color: "#fff",
//     fontWeight: "500",
//   },

//   content: {
//     marginTop: 10,
//   },

//   heading: {
//     fontSize: 18,
//     fontWeight: "600",
//     marginBottom: 10,
//   },

//   text: {
//     fontSize: 14,
//     color: "#555",
//     marginBottom: 10,
//     lineHeight: 22,
//     textAlign: "left", // justify removed (RN limitation)
//   },

//   eduCard: {
//     backgroundColor: "#fff",
//     padding: 15,
//     borderRadius: 10,
//     marginBottom: 12,

//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 5,
//     elevation: 3,
//   },

//   eduRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 5,
//   },

//   icon: {
//     fontSize: 16,
//     marginRight: 6,
//   },

//   eduTitle: {
//     fontSize: 15,
//     fontWeight: "600",
//   },

//   eduCollege: {
//     fontSize: 13,
//     color: "#666",
//     marginTop: 2,
//   },

//   eduYear: {
//     fontSize: 12,
//     color: "#999",
//     marginTop: 2,
//   },

//   badgeRow: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     gap: 10,
//   },

//   badge: {
//     backgroundColor: "#6c757d",
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//   },

//   badgeText: {
//     color: "#fff",
//     fontSize: 12,
//   },
// });