
import { AsyncStorage } from "react-native";

export const onLogin = (accessToken) => AsyncStorage.setItem(accessToken, accessToken);

export const onLogout = () => AsyncStorage.removeItem(accessToken);

export const saveSession = ({access_token, expires_in}) => {    
    let expiresAt = JSON.stringify((expires_in * 1000) + new Date().getTime());
    AsyncStorage.setItem('access_token', access_token);
    AsyncStorage.setItem('expires_in', expiresAt);
}


export const saveUserID = (userId) => {
    AsyncStorage.setItem('user_id', userId);
}

export const getUserID = () => {
    return AsyncStorage.getItem('user_id');
}

export const getAccessToken = () => {
    return AsyncStorage.getItem('access_token');
}

export const Logout = () => {
    // Clear access token and ID token from local storage
    AsyncStorage.removeItem('access_token');
    AsyncStorage.removeItem('expires_in');
    // navigate to the home route
}

export const isLoggedin = () => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem('expires_in')
            .then(data => {                
                if (data) {
                    resolve(new Date().getTime() < data);
                } else {
                    resolve(false);
                }
            })
            .catch(reject);
    });
};