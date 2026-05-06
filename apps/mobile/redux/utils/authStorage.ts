// // import { SIGNIN_RESPONSE } from "@repo/types"

// // export const setStorage = (data: SIGNIN_RESPONSE) => {
// //     if (typeof window === "undefined") {
// //         return
// //     }
// //     localStorage.setItem("ADMIN", JSON.stringify(data.result))
// // }

// // export const getStorage = () => {
// //     if (typeof window === "undefined") {
// //         return 
// //     }
// //     return JSON.parse(localStorage.getItem("ADMIN") || "null")
// // }

// // export const removeStorage = () => {
// //     if (typeof window === "undefined") {
// //         return
// //     }
// //     localStorage.removeItem("ADMIN")
// // }


// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { SIGNIN_RESPONSE } from "@repo/types";

// export const setStorage = async (data: SIGNIN_RESPONSE) => {
//   try {
//     await AsyncStorage.setItem(
//       "ADMIN",
//       JSON.stringify(data.result)
//     );
//   } catch (error) {
//     console.error("Error saving data", error);
//   }
// };

// export const getStorage = async () => {
//   try {
//     const value = await AsyncStorage.getItem("ADMIN");
//     return value ? JSON.parse(value) : null;
//   } catch (error) {
//     console.error("Error fetching data", error);
//     return null;
//   }
// };

// export const removeStorage = async () => {
//   try {
//     await AsyncStorage.removeItem("ADMIN");
//   } catch (error) {
//     console.error("Error removing data", error);
//   }
// };


import AsyncStorage from "@react-native-async-storage/async-storage"
import { SIGNIN_RESPONSE } from "@repo/types"

export const setStorage = async (data: SIGNIN_RESPONSE) => {
    await AsyncStorage.setItem("ADMIN", JSON.stringify(data.result))
}

export const getStorage = async () => {
    const data = await AsyncStorage.getItem("ADMIN")
    return data ? JSON.parse(data) : null
}

export const removeStorage = async () => {
    await AsyncStorage.removeItem("ADMIN")
}
