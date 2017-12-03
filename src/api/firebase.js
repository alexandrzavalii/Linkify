
import firebase from 'react-native-firebase';
import { arrayUnique, shuffleArray, prepareUserData } from './data-services';
import { saveUserToStorage, getUserID } from './async_storage';

const db = firebase.firestore();
const usersRef = db.collection('users');
const tinderRef = db.collection('tinder');

// const [user, account] = await Promise.all([
//     fetch('/users'),
//     fetch('/account')
// ])

export const saveUserDataToFirebase = async (userDataFromLinkedin) => {
    const preparedUserData = await prepareUserData(userDataFromLinkedin);
    usersRef.doc(preparedUserData.id).update(preparedUserData);
    return saveUserToStorage(preparedUserData)
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

        if (toSwipeWith) {
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

        if (toSwipeWith) {
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

            if (user.value && !user.swiped) {
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


export const getCards = (numberOfCards = 10) => {
    return new Promise(async (resolve, reject) => {
        try {
            const currentUserId = await getUserID();
            const [toSwipeWith, rest] = await Promise.all([
                tinderRef.doc(currentUserId).collection('allusers')
                .where('toSwipeWith', '==', true)
                .where('matched', '==', false)
                .limit(4)
                .get(),
                tinderRef.doc(currentUserId).collection('allusers')
                .where('toSwipeWith', '==', false)
                .where('matched', '==', false)
                .limit(numberOfCards)
                .get()
            ])
            const toSwipeWithUsers = parseQuery(toSwipeWith);
            const allUsers = parseQuery(rest);

            const concatUsers = arrayUnique(toSwipeWithUsers.concat(allUsers));
            await shuffleArray(concatUsers);
            const users = await getUsers(concatUsers);
            const filledUsers = Object.keys(users).map(function (key) { return users[key]; });
            resolve(filledUsers)
        } catch (e) {
            reject(e)
        }
    })
}

const parseQuery = (querySnapshot) => {
    if (querySnapshot.size > 0) {
        const docs = querySnapshot.docs;
        const users = [];
        for (let index in docs) {
            const newUser = docs[index].data();
            newUser.key = docs[index].id;
            users.push(newUser);
        }
        return users
    } else {
        return [];
    }
}

const getUsers = async (concatUsers = []) => {
    let users = {};
    try {
        users = (await Promise.all(concatUsers.map(user => usersRef.doc(user.key).get())))
            .filter(doc => doc.exists)
            .map(doc => ({ [doc.id]: doc.data() }))
            .reduce((acc, val) => ({ ...acc, ...val }), {});

    } catch (error) {
        console.log(`received an error in getUsers method in module \`db/users\`:`, error);
        return {};
    }

    return users;
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