// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   StyleSheet,
//   TouchableOpacity,
//   ScrollView,
//   ActivityIndicator,
// } from "react-native";

// import { useForm, Controller } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useAddcontactFormMutation } from "../redux/apis/user.api";

// import { Ionicons } from "@expo/vector-icons";
// import UserFooter from "../UserFooter";

// const contactSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   email: z.string().email("Invalid email"),
//   subject: z.string().min(1, "Subject is required"),
//   message: z.string().min(1, "Message is required"),
// });

// type CONTACT_FORM_REQUEST = z.infer<typeof contactSchema>;

// const Contact = () => {
//   const [addForm, { isLoading }] = useAddcontactFormMutation();

//   const [focused, setFocused] = useState<string | null>(null);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<CONTACT_FORM_REQUEST>({
//     defaultValues: {
//       name: "",
//       email: "",
//       subject: "",
//       message: "",
//     },
//     resolver: zodResolver(contactSchema),
//   });

//   const onSubmit = async (data: CONTACT_FORM_REQUEST) => {
//     try {
//       await addForm(data).unwrap();
//       alert("Message sent successfully");
//       reset();
//     } catch (err) {
//       alert("Unable to send message");
//     }
//   };

//   const getBorder = (field: string) => ({
//     borderColor: focused === field ? "#0d6efd" : "#ddd",
//     borderWidth: 1.5,
//   });

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <Text style={styles.title}>Contact Me</Text>
//       <Controller
//         control={control}
//         name="name"
//         render={({ field: { onChange, value } }) => (
//           <>
//             <TextInput
//               placeholder="Your Name"
//               style={[styles.input, getBorder("name"), errors.name && styles.errorInput]}
//               value={value}
//               onChangeText={onChange}
//               onFocus={() => setFocused("name")}
//               onBlur={() => setFocused(null)}
//             />
//             {errors.name && (
//               <Text style={styles.errorText}>{errors.name.message}</Text>
//             )}
//           </>
//         )}
//       />

//       <Controller
//         control={control}
//         name="email"
//         render={({ field: { onChange, value } }) => (
//           <>
//             <TextInput
//               placeholder="Your Email"
//               style={[styles.input, getBorder("email"), errors.email && styles.errorInput]}
//               value={value}
//               onChangeText={onChange}
//               onFocus={() => setFocused("email")}
//               onBlur={() => setFocused(null)}
//               keyboardType="email-address"
//             />
//             {errors.email && (
//               <Text style={styles.errorText}>{errors.email.message}</Text>
//             )}
//           </>
//         )}
//       />

//       <Controller
//         control={control}
//         name="subject"
//         render={({ field: { onChange, value } }) => (
//           <>
//             <TextInput
//               placeholder="Subject"
//               style={[styles.input, getBorder("subject"), errors.subject && styles.errorInput]}
//               value={value}
//               onChangeText={onChange}
//               onFocus={() => setFocused("subject")}
//               onBlur={() => setFocused(null)}
//             />
//             {errors.subject && (
//               <Text style={styles.errorText}>{errors.subject.message}</Text>
//             )}
//           </>
//         )}
//       />

//       <Controller
//         control={control}
//         name="message"
//         render={({ field: { onChange, value } }) => (
//           <>
//             <TextInput
//               placeholder="Your Message"
//               style={[
//                 styles.input,
//                 styles.textArea,
//                 getBorder("message"),
//                 errors.message && styles.errorInput,
//               ]}
//               value={value}
//               onChangeText={onChange}
//               multiline
//               numberOfLines={4}
//               onFocus={() => setFocused("message")}
//               onBlur={() => setFocused(null)}
//             />
//             {errors.message && (
//               <Text style={styles.errorText}>{errors.message.message}</Text>
//             )}
//           </>
//         )}
//       />

//       <TouchableOpacity
//         style={styles.button}
//         onPress={handleSubmit(onSubmit)}
//         disabled={isLoading}
//       >
//         {isLoading ? (
//           <ActivityIndicator color="#fff" />
//         ) : (
//           <View style={styles.buttonRow}>
//             <Ionicons
//               name="send"
//               size={18}
//               color="#fff"
//               style={{ marginRight: 8 }}
//             />
//             <Text style={styles.buttonText}>Send Message</Text>
//           </View>
//         )}
//       </TouchableOpacity>
//       <View style={{ marginTop: 60 }}>
//         <UserFooter />
//       </View>    </ScrollView>
//   );
// };

// export default Contact;

// const styles = StyleSheet.create({
//   container: {
//     padding: 16,
//     paddingTop: 10,
//     backgroundColor: "#f8f9fa",
//   },

//   title: {
//     fontSize: 22,
//     fontWeight: "700",
//     textAlign: "center",
//     marginBottom: 20,
//   },

//   input: {
//     backgroundColor: "#fff",
//     padding: 12,
//     borderRadius: 8,
//     marginBottom: 8,
//   },

//   textArea: {
//     height: 100,
//     textAlignVertical: "top",
//   },

//   errorInput: {
//     borderColor: "red",
//   },

//   errorText: {
//     color: "red",
//     marginBottom: 8,
//     fontSize: 12,
//   },

//   button: {
//     backgroundColor: "#0d6efd",
//     padding: 14,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 10,
//   },

//   buttonRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     // gap: 8,
//   },

//   buttonText: {
//     color: "#fff",
//     fontWeight: "600",
//   },
// });