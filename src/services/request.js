
/**
 * An async fetch with error catch
 * @param url
 * @param data
 * @returns {Promise.<*>}
 */
export const request = async (url, data = {}) => {
    try {
        console.log("request ", url)
        const response = await fetch(url, {
            method: 'POST'
        })
        console.log("response: ", response);
        return await response.json();
    } catch (err) {
        console.log("error", err);
        return { error: err };
    }
};