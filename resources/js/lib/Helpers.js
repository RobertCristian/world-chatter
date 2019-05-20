export async function postData(url = '', data = {}, responseToJSON = false) {
    const api_call = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });

    if (responseToJSON) {
        return await api_call.json();
    } else {
        return await api_call;
    }
}

export async function fetchData(url = '', responseToJSON = false) {
    const api_call = await fetch(url);

    if (responseToJSON) {
        return await api_call.json();
    } else {
        return api_call;
    }
}