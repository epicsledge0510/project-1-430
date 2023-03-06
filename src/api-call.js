//This method loads the exercises from the api to be processed by the server
require('dotenv').config()
const getPost = () => {
    fetch(process.env.MONGODB_URI, {
    method: 'GET',
    credentials: 'same-origin',
    redirect: 'follow',
    agent: null,
    headers: {
        "Content-Type": "text/plain",
        'Authorization': 'Basic ' + btoa('username:password'),
    },
    timeout: 5000
    })
    .then(response => response.json())
    .then(data => console.log(data))
};
//This method takes in a name and exercise and posts it to the api as a submission
const makePost = async (name, exercise) => {
    const data = { 
        name: name,
        exercise: exercise,
    }
    await fetch(process.env.MONGODB_URI, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
};


exports.getPost = getPost;
exports.makePost = makePost;
