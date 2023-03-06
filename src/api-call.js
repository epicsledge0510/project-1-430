//This method loads the exercises from the api to be processed by the server
const getPost = () => {
    fetch(`https://radiant-mesa-08758.herokuapp.com/exercises/`)
        .then(response => response.json())
        .then(data => console.log(data))
};
//This method takes in a name and exercise and posts it to the api as a submission
const makePost = async (name, exercise) => {
    const data = { 
        name: name,
        exercise: exercise,
    }
    await fetch('https://radiant-mesa-08758.herokuapp.com/exercises/', {
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
