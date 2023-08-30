
//create references to to the HTML elements
var startButton = document.getElementById("start-btn");
var timerDisplay = document.getElementById("timerDisplay");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var startSection = document.getElementById("start");
var quizSection = document.getElementById("quiz");
var resultSection = document.getElementById("result");
var initials = document.getElementById("initials");
var submitButton = document.getElementById("submit-button");
var inputElement = document.querySelector("#initials");
var score = document.getElementById("score");
var highScoreEl = document.getElementById("high-score-item");
var highScoreOl = document.getElementById("highscore-list");

//define variables and objects for questions

//array of objects

var questions = [
    {
      title: 'Commonly used data types DO NOT include:',
      choices: ['strings', 'booleans', 'alerts', 'numbers'],
      answer: 2,
    },
    {
      title: 'The condition in an if / else statement is enclosed within ____.',
      choices: ['quotes', 'curly brackets', 'parentheses', 'square brackets'],
      answer: 2,
    },
    {
      title: 'Arrays in JavaScript can be used to store ____.',
      choices: [
        'numbers and strings',
        'other arrays',
        'booleans',
        'all of the above',
      ],
      answer: 3,
    },
    {
      title:
        'String values must be enclosed within ____ when being assigned to variables.',
      choices: ['commas', 'curly brackets', 'quotes', 'parentheses'],
      answer: 2,
    },
    {
      title:
        'A very useful tool used during development and debugging for printing content to the debugger is:',
      choices: ['JavaScript', 'terminal / bash', 'for loops', 'console.log'],
      answer: 3,
    },
  ];


var currentQuestionIndex = 0;
var currentQ;

// START SECTION
var timeScore = 100;

var timeInterval;

//start timer/quiz
function startQuiz() {
//hide the start page and show the quiz section
startSection.classList.add("hide");
quizSection.classList.remove("hide");
//use timeInterval to set up timer that decrements by one second with added text of seconds remaining
    timeInterval = setInterval(function () {
      timeScore--; timerDisplay.textContent = timeScore + " seconds remaining";
  //if time is 0 --> call gameOver function
      if (timeScore === 0 ) {
        timerDisplay.textContent = timeScore
        gameOver();
      
      }
  
    },1000);

    displayQuestion();
  }
//create a function that displays time
  function displayMessage () {
    var timeUp = 0
    var timeInt = setInterval(function() {
    if (time < 0) {
     clearInterval(timeInt);
    } else {
        timerDisplay.textContent=time;

    }
})


  }



//QUIZ SECTION

//create a function to display the current question and choices

function displayQuestion() {
    currentQ = questions[currentQuestionIndex];
    questionElement.textContent = currentQ.title;

    //create a loop that iterates through the questions and create a click event that runs the answerSel function
choicesElement.textContent = " ";
 for (let i = 0; i < currentQ.choices.length; i++) {
    const choice = currentQ.choices[i];

    //target li element in css
    var li = document.createElement("li");
    li.classList.add("button");
    li.setAttribute("id",i);
    li.textContent=choice;
    li.addEventListener("click", answerSel);
    choicesElement.append(li);
 }
}

//function for the click event when an answer is chosen
function answerSel(event) {

//how do we capture the actual choice the user selected so then we can check that choice against that question's answer string?
    var userChoice = event.target.id;
    console.log(userChoice);
    //check if answer is correct -- > check user choice with correct (if statement)
    if (userChoice != currentQ.correctAnswer){
        timeScore -= 15;
    };
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length && timeScore > 0) {
        displayQuestion();  
    } else {
        gameOver();
    }
    
}


function gameOver() {
    quizSection.classList.add("hide");
    resultSection.classList.remove("hide"); 
    clearInterval(timeInterval);
    score.textContent = timeScore;
   

}




//store score information in results page and sort them in descending order

function storeScore(event) {
  //prevent default behaviour of form submission
  event.preventDefault();

  //check for input
  if (!inputElement.value) {
    alert("Please enter your initials before pressing submit!");
    return;
  }

    //store score and initials in an object
    var highScoreItem = {
        score: timeScore,
        initials: inputElement.value,
      };

  updateScore(highScoreItem);
  //hide the result, display the highScoreItem
  resultSection.classList.add("hide"); 
highScoreEl.classList.remove("hide");
var highScoreArray = getHighScore();
highScoreArray.sort((b, a) => a.score - b.score); 

highScoreOl.textContent = " ";
for (let i = 0; i < highScoreArray.length; i++) {
    const scoreObj = highScoreArray[i];
    
    var li = document.createElement("li");
    li.textContent= `initials: ${scoreObj.initials} | score:${scoreObj.score}`;
    highScoreOl.append(li);
    
}
};




    function getHighScore() {
        var arr = localStorage.getItem("highScoreArray");
        if (arr) {
            return JSON.parse(arr);
        } else {
            return [];
        }
      
      }

//updates the high scores stored in local storage
function updateScore(highScoreItem) {
    var highScoreArray = getHighScore();
    //append new highscore item to scoreboard array
    highScoreArray.push(highScoreItem);
    localStorage.setItem("highScoreArray", JSON.stringify(highScoreArray));
  };




//add event listener for start button
startButton.addEventListener("click", startQuiz);

//store user initials and score when submit button is clicked
submitButton.addEventListener("click", storeScore);

