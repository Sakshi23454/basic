// import React from "react";
// import { View, Text, FlatList, StyleSheet } from "react-native";
// import { useGetExperienceQuery } from "../redux/apis/user.api";
// import UserFooter from "../UserFooter";

// const Experience = () => {
//   const { data } = useGetExperienceQuery();

//   const renderItem = ({ item }: any) => {
//     return (
//       <View style={styles.card}>
//         <View style={styles.header}>
//           <View style={styles.left}>
//             <Text style={styles.role}>{item.role}</Text>

//             <Text style={styles.company}>
//               {item.company}
//             </Text>
//           </View>

//           <View style={styles.badge}>
//             <Text style={styles.badgeText}>{item.duration}</Text>
//           </View>
//         </View>

//         <Text style={styles.description}>{item.description}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Work Experience</Text>

//       <FlatList
//         data={data?.result || []}
//         keyExtractor={(item: any, index) =>
//           `${item._id || item.company}-${index}`
//         }
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//         ListFooterComponent={() => (
//           <View style={{ marginTop: 30 }}>
//             <UserFooter />
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// export default Experience;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//     paddingHorizontal: 16,
//     backgroundColor: "#f8f9fa",
//   },

//   title: {
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "700",
//     marginBottom: 20,
//   },

//   card: {
//     backgroundColor: "#fff",
//     padding: 16,
//     borderRadius: 12,
//     marginBottom: 14,

//     // shadow
//     elevation: 3,
//   },

//   header: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//   },

//   left: {
//     flex: 1,
//     paddingRight: 10,
//   },

//   role: {
//     fontSize: 16,
//     fontWeight: "700",
//     marginBottom: 4,
//   },

//   company: {
//     fontSize: 13,
//     color: "#0d6efd",
//   },

//   badge: {
//     borderWidth: 1,
//     borderColor: "#ddd",
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 8,
//     backgroundColor: "#f8f9fa",
//   },

//   badgeText: {
//     fontSize: 12,
//     color: "#333",
//   },

//   description: {
//     marginTop: 10,
//     fontSize: 13,
//     color: "#6c757d",
//     lineHeight: 18,
//     textAlign: "justify",
//   },
// });