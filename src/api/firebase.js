
import firebase from 'react-native-firebase';
import { saveUserID, getUserID } from '../auth';

const db = firebase.firestore();
const usersRef = db.collection('users');
const tinderRef = db.collection('tinder');

export const updateUser = (userData) => {
    saveUserID(userData.id);
    return usersRef.doc(userData.id).set({...userData});
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
        handleSwipe(currentUserId, matchId, value);
    })
}

const update_inside_allusers = (currentUserId, cardID, updateNewCard) => {
    firebase.database()
    .ref(`tinder/${currentUserId}/allusers/${cardID}`)
    .update(updateNewCard)
}


export const cardSwipedLeft = (cardID, toSwipeWith) => {
    getUserID().then(async currentUserId => {
        updateLastSwipedTimestamp(currentUserId);
        const updateNewCard = {};
        updateNewCard.waitFrom = false; // waiting from cardID
        updateNewCard.value = true; // already swiped
        updateNewCard.swiped = false; //swiped left

        let waitFrom = false;

        if(toSwipeWith) {
            //remove from toSwipeWith from currentUserId

        } 

        update_inside_allusers(currentUserId, cardID, updateNewCard); 
    })        
}
export const cardSwipedRight = (cardID, toSwipeWith) => {
    getUserID().then(async currentUserId => {
        updateLastSwipedTimestamp(currentUserId);

        const updateNewCard = {};
        updateNewCard.value = true; // already swiped
        updateNewCard.swiped = true; //swiped right
        updateNewCard.waitFrom = false; // waiting from cardID (default)        

        if(toSwipeWith) {
            //1.remove from toSwipeWith because I already showd popup
            // firebase.database()
            // .ref(`tinder/${currentUserId}/toSwipeWith/${cardID}`)
            // .remove()
            //2. add to [matched] with {id, notified: true}
            updateNewCard.matched = true;
            updateNewCard.notified = true;
            updateNewCard.timestamp = new Date();

        } else {
            //check if clientID has skipped me already inside allusers
            const snapshot = await firebase.database()
            .ref(`tinder/${cardID}/allusers/${currentUserId}`)
            .once('value');
            const user = snapshot.val();

            if(user.value && !user.swiped) {
                //cardID has skipped currentUser
            } else {
                // cardID has not yet swiped this user
                // update toSwipeWith of the cardID inside allusers
                updateNewCard.waitFrom = true;
                console.log("UPDATE TOSWIPEWITH", cardID);
                firebase.database()
                .ref(`tinder/${cardID}/allusers/${currentUserId}/toSwipeWith`)
                .set(true);
            }
        }

        update_inside_allusers(currentUserId, cardID, updateNewCard)
        
    })
}

const handleSwipe = (currentUserId, matchId, value) => {
    firebase.database()
        .ref(`tinder/${currentUserId}`).once("value", snapshot => {
            if (snapshot.val()) {
                const tinderObject = snapshot.val();
                const card = {
                    value,
                    timestamp: Date.now(),
                    id: matchId
                }

                tinderObject.toswipe[matchId] = card;

                if (value) {
                    if (!tinderObject.waitToMatchFrom) tinderObject.waitToMatchFrom = {};
                    tinderObject.waitToMatchFrom[matchId] = card;
                } else {
                    if (!tinderObject.skipped) tinderObject.skipped = {};
                    tinderObject.skipped[matchId] = card;
                }

                firebase.database().ref(`tinder/${currentUserId}`).update(tinderObject);
            }
        })
}

const getCards_toSwipeWith = async (currentUserId) => {

    const firestore = tinderRef.doc(currentUserId).collection('allusers')
    .where('value', '==', true)
    .where('matched', '==', true)
    .get().then(querySnapshot => {
        if (querySnapshot.size > 0) {
            // Contents of first document
            console.log("FIRESTORE",querySnapshot.docs);
          } else {
            console.log("No such document!");
          }
    })
    .catch(err => {
        console.log('Error getting document', err);
    });
    

    const snapshot = await firebase.database().ref(`tinder/${currentUserId}/allusers`)
    .orderByChild('toSwipeWith')
    .equalTo(true)
    .limitToFirst(4)    
    .once('value');

    const users = snapshot.val();    
    const toSwipeWithUsers = [];
    for (let key in users) {
        const newUser = Object.assign({}, { key, toSwipeWith: true });
        toSwipeWithUsers.push(newUser);
    }
    return toSwipeWithUsers;
}

const getCards_allUsers = async (currentUserId, numberOfRestUsers) => {
    const snapshot = await firebase.database().ref(`tinder/${currentUserId}/allusers`)
        .orderByChild('toSwipeWith')
        .equalTo(false)
        .limitToFirst(numberOfRestUsers)
        .once('value');

    const users = snapshot.val();
    const allUsers = [];
    for (let key in users) {
        if(!users[key].matched) {
            console.log('USERS NOT MATCHED',users[key]);
            
        const newUser = Object.assign({}, { key });
        allUsers.push(newUser);
        }
    }
    return allUsers;
}

function arrayUnique(array) {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i].key === a[j].key)
                a.splice(j--, 1);
        }
    }

    return a;
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const getCards = (numberOfCards = 10) => {
    return new Promise((resolve, reject) => {
        try {
            getUserID().then(async currentUserId => {
                const toSwipeWithUsers = await getCards_toSwipeWith(currentUserId);
                const numberOfRestUsers = numberOfCards - toSwipeWithUsers.length;
                const allUsers = await getCards_allUsers(currentUserId, numberOfRestUsers);
                const concatUsers = arrayUnique(toSwipeWithUsers.concat(allUsers));
                await shuffleArray(concatUsers);
                const filledUsers = [];
                for (let index in concatUsers) {
                    const user = Object.assign({}, concatUsers[index]);
                    const snapshot = await firebase.database().ref(`users/${user.key}`).once('value');
                    filledUsers.push(Object.assign(user, snapshot.val()));
                }
                resolve(filledUsers)
            })
        } catch (e) {
            reject(e)
        }
    })
}



const getUserInfoByID = (userId) => {
    return firebase.database().ref(`users/${userId}`)
        .on('value', snapshot => {
            console.log("user", snapshot.val());
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
                            nextSwipe.setDate(nextSwipe.getDate() + 1);

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
        .on("value", snapshot => {
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