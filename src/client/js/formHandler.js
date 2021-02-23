function handleSubmit(event) {
    event.preventDefault()

    console.log("clicked")

    const msg = document.querySelector("#name").value;
   
    
    postData('/data', {message: msg});

    // // check what text was put into the form field
    // let formText = document.getElementById('name').value
    // checkForName(formText)

    // console.log("::: Form Submitted :::")
    // fetch('http://localhost:8080/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })
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
    try{
        const newData = await res.json();
        return newData;
    } catch(error){
        console.log("error", error);    
    }
}

export { handleSubmit }
