
import firebase from 'react-native-firebase';
import { saveUserID, getUserID } from '../auth';

export const updateUser = (userData) => {
    saveUserID(userData.id);
    return firebase.database()
        .ref(`users/${userData.id}`)
        .update({
            ...userData
        });
}


export const getLinkedinCredentials = () => {
    return new Promise((resolve, reject) => {
        try {
            firebase.database().ref('linkedin').on("value", (snapshot) => {
                resolve(snapshot.val())
            })
        } catch (e) {
            reject(e)
        }
    })
}

export const saveSwipedCard = (matchId, value) => {

    getUserID().then(currentUserId => {
        updateLastSwipedTimestamp(currentUserId);

        firebase.database()
            .ref(`users/${currentUserId}/swiped/${matchId}`)
            .set({ value: value, timestamp: Date.now() })
    })
}


export const getDateToNextBatch = () => {
    return new Promise((resolve, reject) => {
        try {
            getUserID().then(currentUserId => {
                firebase.database().ref(`users/${currentUserId}/lastSwipe`)
                    .on("value", (snapshot) => {
                        if (snapshot.val()) {
                            let nextSwipe = new Date(snapshot.val());
                            nextSwipe.setDate(nextSwipe.getDate()+1);

                            const now = new Date();
                            const diff = new Date(nextSwipe - now);
                            
                            resolve(diff);
                        } else {
                            reject();
                        }
                    })
            })
        } catch (e) {
            reject(e);
        }
    })
}

const updateLastSwipedTimestamp = (currentUserId) => {
    firebase.database().ref(`users/${currentUserId}/lastSwipe`)
        .on("value", (snapshot) => {
            if (snapshot.val()) {
                const lastSwipe = new Date(snapshot.val()).getTime()
                const thisSwipe = new Date().getTime();

                const difInSeconds = (thisSwipe - lastSwipe) / 1000;
                const difInMinutes = difInSeconds / 60;
                const difInHours = difInMinutes / 60;
                const oneDay = 1;

                if (difInHours > oneDay) {
                    firebase.database()
                        .ref(`users/${currentUserId}/lastSwipe/`)
                        .set(thisSwipe)
                }
            }
        })

}

export const prepareUserData = (user) => {
    return new Promise((resolve, reject) => {
        if (user) {
            resolve({
                id: user.id,
                lastName: user.lastName || '',
                firstName: user.firstName || '',
                headline: user.headline || '',
                numConnections: user.numConnections || '',
                pictureUrl: user.pictureUrls.values[0] || '',
                publicProfileUrl: user.publicProfileUrl || 'google.com',
                industry: user.industry || '',
                summary: user.summary || 'No summary',
                location: user.location,
                emailAddress: user.emailAddress
            })
        } else {
            reject();
        }
    });


}