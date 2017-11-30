import mockData from './data/MOCK_DATA.json';


export function getMatches(numberOfMatches = 10) {
    return new Promise((resolve, reject) => {
        try {
            if(!numberOfMatches) resolve();
            const totalNumberOfPeople = mockData.length;
            const people = [];
            for (let i = 0; i < numberOfMatches; i++) {
                const randomIndex = Math.floor(Math.random() * totalNumberOfPeople);
                people.push(prepareData(mockData[randomIndex], i));
            }
            resolve(people);
        } catch (e) {
            reject(e);
        }
    });
}

const prepareData = (userData, index) => {
    if (userData) {
        return {
            index, 
            key: userData.id.$oid,
            clientID: userData.id.$oid || 'no_id',
            familyName: userData.last_name || '',
            givenName: userData.first_name || '',
            headline: userData.headline || '',
            numConnections: userData.numConections || '',
            picture: userData.picture || '',
            publicProfileUrl: userData.publicProfileUrl || 'google.com',
            industry: userData.industry || '',
            summary: userData.summary || 'No summary'
        }
    } else {
        return;
    }
}