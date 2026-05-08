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