// import React from "react";
// import { View, Text, FlatList, Image, StyleSheet } from "react-native";
// import { useGetSkillsQuery } from "../redux/apis/user.api";
// import UserFooter from "../UserFooter";

// const Skills = () => {
//   const { data } = useGetSkillsQuery();

//   const renderItem = ({ item }: any) => {
//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: item.icon }} style={styles.icon} />
//         <Text style={styles.name}>{item.name}</Text>
//       </View>
//     );
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>My Skills</Text>

//       <FlatList
//         data={data?.result || []}
//         keyExtractor={(item: any, index) =>
//           `${item._id || item.name}-${index}`
//         }
//         renderItem={renderItem}
//         numColumns={3}
//         contentContainerStyle={styles.list}
//         columnWrapperStyle={styles.row}
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

// export default Skills;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 10,
//     backgroundColor: "#f8f9fa",
//     paddingHorizontal: 16,
//     borderRadius: 12,
//   },
//   title: {
//     textAlign: "center",
//     fontSize: 22,
//     fontWeight: "600",
//     marginVertical: 16,
//   },
//   list: {
//     paddingBottom: 20,
//   },
//   row: {
//     justifyContent: "space-between",
//     marginBottom: 12,
//   },
//   card: {
//     flex: 1,
//     backgroundColor: "#fff",
//     margin: 6,
//     padding: 12,
//     alignItems: "center",
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//   },
//   icon: {
//     width: 40,
//     height: 40,
//     resizeMode: "contain",
//   },
//   name: {
//     marginTop: 8,
//     fontSize: 12,
//     textAlign: "center",
//   },
// });