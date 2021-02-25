function handleSubmit(event) {
    event.preventDefault()
    
    // // check what text was put into the form field
    const formText = document.querySelector("#name").value;
    Client.checkForName(formText)
    
    postData('/data', {message: formText})
    .then(function(res) {
        document.getElementById('results').innerHTML = res.sentiment;
    })
}

const postData = async (url='', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        console.log('Response received by client: ', newData);
        return newData;
    } catch(error) {
        console.log("error", error);    
    }
}

function onBlur() {    
}

export { handleSubmit }
