
async function handleErrors(response) {
    const respObj = await response.json;

}

export const request = async (url, data = {}) => {
    return await fetch(url, {
        method: 'GET',
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin':'*',
          }
      }).then(response => {
          return response;
      });
}