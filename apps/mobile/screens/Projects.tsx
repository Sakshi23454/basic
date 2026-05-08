// import React from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   TouchableOpacity,
//   Linking,
//   Dimensions,
// } from "react-native";
// import { useGetProjectsQuery } from "../redux/apis/user.api"; // adjust path
// import UserFooter from "../UserFooter";

// const { width } = Dimensions.get("window");
// const CARD_WIDTH = width / 2 - 24;

// const Projects = () => {
//   const { data } = useGetProjectsQuery();

//   const openLink = (url: string) => {
//     if (url) Linking.openURL(url);
//   };

//   const renderItem = ({ item }: any) => {
//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: item.image }} style={styles.image} />

//         <View style={styles.body}>
//           <Text style={styles.title}>{item.title}</Text>

//           <View>
//             <Text style={{ textAlign: "justify" }}>
//               Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, odit distinctio dolor facere veritatis sunt accusantium. Veniam, laborum explicabo enim odit beatae voluptatum sunt, possimus, hic ea vitae error illum.
//             </Text>
//           </View>

//           <View style={styles.skillsContainer}>
//             {item.skills?.map((skill: string, index: number) => (
//               <View  key={`${skill}-${index}`}  style={styles.badge}>
//                 <Text style={styles.badgeText}>{skill}</Text>
//               </View>
//             ))}
//           </View>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity
//               style={[styles.button, { backgroundColor: "#000" }]}
//               onPress={() => openLink(item.githublink)}
//             >
//               <Text style={styles.buttonText}>GitHub</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.button, { backgroundColor: "#28a745" }]}
//               onPress={() => openLink(item.livelink)}
//             >
//               <Text style={styles.buttonText}>Live</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View >
//     );
//   };

//   return (
//     <View style={styles.container}>

//       <Text style={styles.heading}>My Projects</Text>

//       <FlatList
//         data={data?.result || []}
//         keyExtractor={(item: any, index) =>
//           `${item._id || item.title}-${index}`
//         }
//         renderItem={renderItem}
//         numColumns={2}
//         columnWrapperStyle={styles.row}
//         showsVerticalScrollIndicator={false}
//         ListFooterComponent={() => (
//           <View style={{ marginTop: 30 }}>
//             <UserFooter />
//           </View>
//         )} />
//     </View>
//   );
// };

// export default Projects;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 10,
//     paddingHorizontal: 12,
//     backgroundColor: "#f8f9fa",
//   },

//   heading: {
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 16,
//   },

//   row: {
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },

//   card: {
//     width: CARD_WIDTH,
//     backgroundColor: "#fff",
//     borderRadius: 12,
//     overflow: "hidden",
//     elevation: 3,
//   },

//   image: {
//     width: "100%",
//     height: 120,
//     resizeMode: "cover",
//   },

//   body: {
//     padding: 10,
//     flex: 1,
//   },

//   title: {
//     fontSize: 14,
//     fontWeight: "700",
//     marginBottom: 6,
//   },

//   description: {
//     fontSize: 12,
//     color: "#6c757d",
//     textAlign: "justify",
//     marginBottom: 8,
//   },

//   skillsContainer: {
//     paddingTop: 20,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     marginBottom: 10,
//     gap: 4,
//   },

//   badge: {
//     backgroundColor: "#6c757d",
//     paddingHorizontal: 6,
//     paddingVertical: 3,
//     borderRadius: 6,
//     marginRight: 4,
//     marginBottom: 4,
//   },

//   badgeText: {
//     fontSize: 10,
//     color: "#fff",
//   },

//   buttonRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: "auto",
//   },

//   button: {
//     flex: 1,
//     paddingVertical: 6,
//     borderRadius: 6,
//     marginHorizontal: 2,
//     alignItems: "center",
//   },

//   buttonText: {
//     color: "#fff",
//     fontSize: 12,
//     fontWeight: "600",
//   },
// });