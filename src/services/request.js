
/**
 * An async fetch with error catch
 * @param url
 * @param data
 * @returns {Promise.<*>}
 */

function getToken() {
    return localStorage.getItem('token');
}

export const request = async (url, data = {}) => {
    const token = getToken();
    const headers = {
        "Content-Type": "application/json"
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers : headers,
        })
        return await response.json();
    } catch (err) {
        return { error: err };
    }
};


export const requestPost = async (url, data = {}) => {
    try {
        var headers = {
            "Content-Type": "application/json"
          }
        const response = await fetch(url, {
            method: 'POST',
            headers : headers,
            body: JSON.stringify(data)
        })
       
        return await response.json();
    } catch (err) {
        console.log("error", err);
        return { error: err };
    }
};