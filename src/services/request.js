
/**
 * An async fetch with error catch
 * @param url
 * @param data
 * @returns {Promise.<*>}
 */
export const request = async (url, data = {}) => {
    try {
        const response = await fetch(url, data)
        return await response.json();
    } catch (err) {
        return { error: err };
    }
};


export const requestPost = async (url, data = {}) => {
    try {
        console.log("request ", url, data)
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