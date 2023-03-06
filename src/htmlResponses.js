require('dotenv').config()
const fs = require('fs');
const EventEmitter = require('events');
const emitter = new EventEmitter();
let fullExerciseArr = [];
let exerciseArr = [];
//loads exercises on the refresh of the window
emitter.on(
  'loadExercises',
  function () {
      fetch(process.env.MONGODB_URI)
          .then(response => {
              if (response.ok) {
                  return response.json();
              }
              return response.text().then(text => {
                  throw text;
              });
          })
          .then(json => {
              let i = 0;
              //sorts the exercises into an array to display
              for (let key in json) {
                  console.log(json[key].name)
                  console.log(json[key].exercise)
                  fullExerciseArr.push(` ${json[key].name} suggested the exercise of ${json[key].exercise}`)
              }
              //filters to 5 exercises if needed
              if(fullExerciseArr.length >= 5){
                let max = fullExerciseArr.length-1;
                let responses = [];
                for(let i = 0; i<5; i++){
                  let exerciseNum = Math.floor(Math.random() * max)
                  if(responses.includes(exerciseNum)){
                    i--;
                  }
                  else{
                    responses.push(exerciseNum)
                  }
                }
                for(let i = 0; i<5; i++){
                  exerciseArr.push(fullExerciseArr[responses[i]])
                }
                }
              else{
                exerciseArr = fullExerciseArr
              }
          }
          )
  }
)

emitter.emit('loadExercises');
//writes the clientside web page for the user
const getIndex = (request, response) => {
  response.write(
    `
<html lang="en">
<head>
  <title>Our simple HTTP server</title>

</head>
<body style="
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 20px;
    padding: 20px;
    font-family: Arial, sans-serif;
    background-color: #f2f2f2;
    margin: 0;">
  <section id="top">
    <h3 style="
      font-size: 36px;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20px;
    ">Workout routines</h3>
    <p id = "results" style="
      font-size: 18px;
      color: #666666;
      line-height: 1.5;
      margin-bottom: 30px;
    ">${exerciseArr}</p>
      <form action="" id="exerciseForm" style="background-color: #ffffff;
      border: 1px solid #cccccc;
      padding: 20px;">
        <input type="text" id="nameField" name="username" placeholder="Name" style="
        width: 100%;
        padding: 10px;
        font-size: 16px;
        border: 1px solid #cccccc;
        margin-bottom: 20px;">
        <p>
        <input type="text" id="exerciseField" name="exercise" placeholder="Exercise" style="
          width: 100%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #cccccc;
          margin-bottom: 20px;">
        <p>
        <button type="submit" value="add exercise" style="
          background-color: #333333;
          color: #ffffff;
          padding: 10px 20px;
          font-size: 16px;
          border: none;
          cursor: pointer;
        ">Submit workout</button>
    </form>
  </section>
  <section id="content">
  </section>
</body>

</html>
  `)
  response.end();
};

module.exports.getIndex = getIndex;
