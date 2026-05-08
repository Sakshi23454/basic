// import {
//   StyleSheet,
//   Text,
//   View,
//   Image,
//   TouchableOpacity,
//   Linking,
//   ScrollView,
// } from "react-native";
// import React from "react";
// import { useNavigation } from "@react-navigation/native";

// import {
//   useGetProfileQuery,
//   useGetProjectsQuery,
//   useGetSkillsQuery,
//   useViewStatsQuery,
// } from "../redux/apis/user.api";
// import { AppNavigation } from "../types/navigation";
// import UserFooter from "../UserFooter";

// const Home = () => {
//   const { data } = useGetProfileQuery();
//   const { data: statData } = useViewStatsQuery();
//   const { data: projectData } = useGetProjectsQuery();
//   const { data: skillData } = useGetSkillsQuery();

//   const { navigate } = useNavigation<AppNavigation>();

//   const profile = data?.result;

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//       {/* home section */}
//       <View style={styles.container}>
//         <View style={styles.left}>
//           <Text style={styles.heading}>Hi, I'm</Text>
//           <Text style={styles.name}>
//             {String(profile?.name || "Your Name")}
//           </Text>
//           <Text style={styles.bio}>
//             {String(profile?.bio || "Passionate Web Developer")}
//           </Text>
//           <Text style={styles.description}>
//             A MERN Stack Developer focused on building fast, scalable, and
//             responsive web applications with modern technologies.
//           </Text>
//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={styles.outlineDarkBtn}
//               onPress={() => navigate("contact")}
//             >
//               <Text style={styles.darkText}>Let's Connect</Text>
//             </TouchableOpacity>

//             {data?.result?.resume && (
//               <TouchableOpacity
//                 style={styles.outlinePrimaryBtn}
//                 onPress={() => Linking.openURL(data?.result?.resume as string)}
//               >
//                 <Text style={styles.primaryText}>
//                   Download Resume
//                 </Text>
//               </TouchableOpacity>
//             )}
//           </View>
//         </View>
//         <View style={styles.right}>
//           <Image
//             source={{
//               uri:
//                 profile?.profilePic ||
//                 "https://via.placeholder.com/250",
//             }}
//             style={styles.image}
//             resizeMode="cover"
//           />
//         </View>
//       </View>

//       {/*  about section*/}
//       <View style={styles.section2}>
//         <TouchableOpacity
//           style={styles.aboutBtn}
//           onPress={() => navigate("about")}
//         >
//           <Text style={styles.aboutBtnText}>Know More About Me</Text>
//         </TouchableOpacity>
//         <View style={styles.statsGrid}>
//           <View style={styles.card}>
//             <Text style={styles.cardValue}>
//               {statData?.result?.experience || "1+"}
//             </Text>
//             <Text style={styles.cardLabel}>Experience</Text>
//           </View>
//           <View style={styles.card}>
//             <Text style={styles.cardValue}>
//               {statData?.result?.projects || "4+"}
//             </Text>
//             <Text style={styles.cardLabel}>Projects</Text>
//           </View>
//           <View style={styles.card}>
//             <Text style={styles.cardValue}>
//               {statData?.result?.technologies || "12+"}
//             </Text>
//             <Text style={styles.cardLabel}>Technologies</Text>
//           </View>
//           <View style={styles.card}>
//             <Text style={styles.cardValue}>
//               {statData?.result?.clients || "1+"}
//             </Text>
//             <Text style={styles.cardLabel}>Clients</Text>
//           </View>
//         </View>
//       </View>

//       {/* projects section */}
//       <View style={styles.section3}>
//         <View style={styles.projectHeader}>
//           <Text style={styles.projectTitle}>Projects</Text>
//           <Text style={styles.projectSubtitle}>
//             Some of the projects I have worked on
//           </Text>
//         </View>
//         <View style={styles.projectGrid}>
//           {projectData?.result?.slice(0, 2).map((item: any) => (
//             <View key={`${item._id}-${item.title}`} style={styles.projectCard}>
//               <Image
//                 source={{ uri: item.image }}
//                 style={styles.projectImage}
//               />
//               <View style={styles.projectBody}>
//                 <Text style={styles.projectCardTitle}>
//                   {item.title}
//                 </Text>
//                 <Text style={styles.projectDesc} numberOfLines={3}>
//                   {item.description}
//                 </Text>
//               </View>
//             </View>
//           ))}
//         </View>
//         <TouchableOpacity
//           style={styles.viewAllBtn}
//           onPress={() => navigate("projects")}
//         >
//           <Text style={styles.viewAllText}>View All Projects</Text>
//         </TouchableOpacity>

//       </View>

//       {/* skills section */}
//       <View style={styles.section4}>
//         <View style={styles.skillHeader}>
//           <Text style={styles.skillTitle}>Skills</Text>
//         </View>
//         <View style={styles.skillGrid}>
//           {skillData?.result?.slice(0, 4).map((item: any, index: number) => (
//             <View key={`${item._id}-${index}`} style={styles.skillCard}>

//               <Image
//                 source={{ uri: item.icon }}
//                 style={styles.skillIcon}
//                 resizeMode="contain"
//               />
//               <Text style={styles.skillName}>
//                 {item.name}
//               </Text>
//             </View>
//           ))}
//         </View>
//         <TouchableOpacity
//           style={styles.skillBtn}
//           onPress={() => navigate("skills")}
//         >
//           <Text style={styles.skillBtnText}>View All Skills</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.experience}>
//         <TouchableOpacity
//           style={styles.contactBtn}
//           onPress={() => navigate("experience")}
//         >
//           <Text style={styles.contactBtnText}>View Experience</Text>
//         </TouchableOpacity>
//       </View>


//       {/* contact section */}
//       <View style={styles.section5}>
//         <Text style={styles.contactText}>
//           I'm always open to new opportunities, collaborations, or freelance projects.
//           If you’d like to work together, feel free to reach out.
//         </Text>
//         <TouchableOpacity
//           style={styles.contactBtn}
//           onPress={() => navigate("contact")}
//         >
//           <Text style={styles.contactBtnText}>Get In Touch</Text>
//         </TouchableOpacity>
//       </View>
//       <UserFooter />
//     </ScrollView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   // home section
//   container: {
//     alignItems: "center",
//     justifyContent: "center",
//     padding: 20,
//     paddingTop: 60,
//     backgroundColor: "#fff",
//   },

//   left: {
//     width: "100%",
//     alignItems: "flex-start",
//   },

//   heading: {
//     fontSize: 24,
//     fontWeight: "600",
//     color: "#000",
//   },

//   name: {
//     fontSize: 34,
//     fontWeight: "bold",
//     color: "#007bff",
//     marginVertical: 6,
//   },

//   bio: {
//     fontSize: 18,
//     color: "gray",
//     marginTop: 10,
//     textAlign: "center",
//   },

//   description: {
//     fontSize: 15,
//     color: "gray",
//     marginTop: 10,
//     lineHeight: 22,
//     alignItems: "flex-start",
//     textAlign: "justify",
//   },

//   buttonRow: {
//     flexDirection: "row",
//     gap: 12,
//     marginTop: 25,
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },

//   outlineDarkBtn: {
//     borderWidth: 1,
//     borderColor: "#000",
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 8,
//   },

//   darkText: {
//     color: "#000",
//     fontWeight: "500",
//   },

//   outlinePrimaryBtn: {
//     borderWidth: 1,
//     borderColor: "#007bff",
//     paddingVertical: 10,
//     paddingHorizontal: 18,
//     borderRadius: 8,
//   },

//   primaryText: {
//     color: "#007bff",
//     fontWeight: "500",
//   },

//   right: {
//     marginTop: 30,
//     alignItems: "center",
//   },

//   image: {
//     width: 250,
//     height: 250,
//     borderRadius: 125,
//     borderWidth: 8,
//     borderColor: "#cfe8ff",
//   },

//   // about section
//   section2: {
//     paddingRight: 50,
//     paddingLeft: 50,
//     marginTop: 40,
//   },
//   aboutBtn: {
//     backgroundColor: "#4da6ff",
//     borderRadius: 10,
//     alignItems: "center",
//     marginBottom: 30,
//     paddingVertical: 10,
//     paddingHorizontal: 16,
//     alignSelf: "flex-start",
//   },
//   aboutBtnText: {
//     color: "#fff",
//     fontSize: 14,
//   },
//   statsGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   card: {
//     width: "48%",
//     backgroundColor: "#fff",
//     paddingVertical: 18,
//     borderRadius: 15,
//     alignItems: "center",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 4,
//   },

//   cardValue: {
//     fontSize: 20,
//     fontWeight: "bold",
//     color: "#007bff",
//   },

//   cardLabel: {
//     fontSize: 12,
//     color: "#6c757d",
//     marginTop: 5,
//   },

//   // projects section
//   section3: {
//     paddingHorizontal: 20,
//     marginTop: 40,
//     backgroundColor: "#fff",
//     paddingBottom: 50,
//     paddingTop: 50,
//   },

//   projectHeader: {
//     alignItems: "center",
//     marginBottom: 25,
//   },

//   projectTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#000",
//   },

//   projectSubtitle: {
//     fontSize: 13,
//     color: "#6c757d",
//     marginTop: 5,
//     textAlign: "center",
//     paddingBottom: 30,
//   },

//   projectGrid: {
//     gap: 15,
//   },

//   projectCard: {
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     overflow: "hidden",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     elevation: 3,
//     height: 400,
//   },

//   projectImage: {
//     width: "100%",
//     height: 280,
//   },

//   projectBody: {
//     padding: 12,
//   },

//   projectCardTitle: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#000",
//   },

//   projectDesc: {
//     fontSize: 12,
//     color: "#6c757d",
//     marginTop: 5,
//     textAlign: "justify",
//     lineHeight: 18,
//   },

//   viewAllBtn: {
//     borderWidth: 1,
//     borderColor: "#007bff",
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     alignSelf: "center",
//   },

//   viewAllText: {
//     color: "#007bff",
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   // skills section
//   section4: {
//     paddingVertical: 40,
//     paddingHorizontal: 20,
//     marginTop: 0,
//   },

//   skillHeader: {
//     alignItems: "center",
//     marginBottom: 40,
//   },

//   skillTitle: {
//     fontSize: 22,
//     fontWeight: "bold",
//     color: "#000",
//   },

//   skillGrid: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//   },

//   skillCard: {
//     width: "47%",
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     alignItems: "center",
//     marginBottom: 15,
//     shadowColor: "#000",
//     shadowOpacity: 0.08,
//     shadowRadius: 6,
//     elevation: 3,
//     paddingVertical: 12,
//   },

//   skillIcon: {
//     width: 50,
//     height: 40,
//     marginBottom: 10,
//   },

//   skillName: {
//     fontSize: 11,
//     fontWeight: "500",
//     color: "#000",
//   },

//   skillBtn: {
//     borderWidth: 1,
//     borderColor: "#007bff",
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignSelf: "center",
//     marginTop: 15,
//   },

//   skillBtnText: {
//     color: "#007bff",
//     fontSize: 14,
//     fontWeight: "500",
//   },


//   // contact section
//   section5: {
//     backgroundColor: "#fff",
//     paddingVertical: 60,
//     paddingHorizontal: 20,
//     alignItems: "center",
//   },

//   contactText: {
//     fontSize: 16,
//     color: "#6c757d",
//     textAlign: "justify",
//     maxWidth: 600,
//     lineHeight: 26,
//     marginBottom: 30,
//     width: "100%",
//   },

//   contactBtn: {
//     borderWidth: 1,
//     borderColor: "#007bff",
//     paddingVertical: 6,
//     paddingHorizontal: 16,
//     borderRadius: 8,
//     alignSelf: "center",
//   },

//   contactBtnText: {
//     color: "#007bff",
//     fontSize: 14,
//     fontWeight: "500",
//   },

//   experience: {
//     backgroundColor: "#fff",
//     paddingTop: 50,
//   }
// });
