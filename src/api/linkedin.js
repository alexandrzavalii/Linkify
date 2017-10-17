import { getIdToken, getAccessToken } from '../auth';

export function shareComment() {
    return getAccessToken().then(clientToken => {
        fetch(`https://api.linkedin.com/v1/people/~/shares?format=json&test=test HTTP/1.1`, {
            method: 'POST',
            headers: {
                'x-li-format': 'json',
                'Host': 'api.linkedin.com',
                'Content-Length': '356',
                'X-Target-URI': 'https://api.linkedin.com',
                'Connection': 'Keep-Alive',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${clientToken}`
            },
            body: JSON.stringify({
                "comment": "Check out developer.linkedin.com!",
                "content": {
                    "title": "LinkedIn Developers Resources",
                    "description": "Leverage LinkedIn's APIs to maximize engagement",
                    "submitted-url": "https://developer.linkedin.com",
                    "submitted-image-url": "https://example.com/logo.png"
                },
                "visibility": {
                    "code": "anyone"
                }
            })
        }).then((response) => {
            console.log("RESPONSE FROM FETCH: ", response);
        })
    })
}

export function refreshAccessToken(){
    return fetch('https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=7741ft9f7znfqf&redirect_uri=https%3A%2F%2Falexandr.auth0.com%2Flogin%2Fcallback&state=987654321&scope=r_basicprofile', {
        method: 'GET',
    }).then(response=> console.log("RESPONSE", response));
}

export function getUserData() {
    return getAccessToken().then(clientToken => {
        return fetch(`https://api.linkedin.com/v1/people/~:(id,headline,firstName,lastName,publicProfileUrl,location,num-connections,email-address,picture-urls::(original),industry,summary)?format=json`, {
            method: 'GET',
            headers: {
                'Host': 'api.linkedin.com',
                'X-Target-URI': 'https://api.linkedin.com',
                'Connection': 'Keep-Alive',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${clientToken}`
            }
        }).then(response=>response.json())
        .catch(console.log)
    })
}