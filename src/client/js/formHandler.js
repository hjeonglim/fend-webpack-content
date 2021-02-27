function handleSubmit(event) {
    event.preventDefault()
    
    // // check what text was put into the form field
    const formText = document.querySelector("#name").value;
    Client.checkForName(formText)
    
   postData('/data', {message: formText})
   .then(function(res) {
        document.querySelector("#confidence").innerHTML = `Confidence: ${res.confidence}`;
        document.querySelector("#subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
        document.querySelector("#agreement").innerHTML = `Agreement: ${res.agreement}`;
        document.querySelector("#irony").innerHTML = `Irony: ${res.irony}`;
        document.querySelector("#score_tag").innerHTML = `Score Tag: ${res.score_tag}`;
   })
}

async function postData(url, data) {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await res.json();
        console.log(newData)
        return newData;
    } catch(error){
        console.log('error', error);
    }
}

function onBlur() {    
}

export { handleSubmit }
