import { AsyncStorage } from "react-native";

export const saveUserToStorage = (userData) => {
    AsyncStorage.setItem('user_data', JSON.stringify(userData));
   return AsyncStorage.setItem('user_id', userData.id);
}


export const getUserID = () => {
    return AsyncStorage.getItem('user_id');
}

export const getUserData =  async () => {
    return JSON.parse(await AsyncStorage.getItem('user_data'));
}