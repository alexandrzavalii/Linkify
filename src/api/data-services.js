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



export const arrayUnique = (array) => {
    var a = array.concat();
    for (var i = 0; i < a.length; ++i) {
        for (var j = i + 1; j < a.length; ++j) {
            if (a[i].key === a[j].key)
                a.splice(j--, 1);
        }
    }

    return a;
}
export const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}