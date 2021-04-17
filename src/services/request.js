
async function handleErrors(response) {
    const respObj = await response.json;

}

export const request = async (url, data = {}) => {
    // try {
    //     console.log("request url ", url)
    //     console.log("request data ", data)
    //     const response = await fetch(url, data)
    // } catch(err) {
    //     return {error: err}
    // }

    //TODO

    return fetch(url, data);
}