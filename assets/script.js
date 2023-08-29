
//create references to to the HTML elements
var startButton = document.getElementById("start-btn");
var timerDisplay = document.getElementById("timerDisplay");
var questionElement = document.getElementById("question");
var choicesElement = document.getElementById("choices");
var submitButton = document.getElementById("submit");
var startSection = document.getElementById("start");
var quizSection = document.getElementById("quiz");
var resultSection = document.getElementById("result");

//define variables and objects for questions


//array of objects

var questions = [
    {
        question: "question 1",
        choices:["words", "words", "words", "words"],
        correctAsnwer: 0
    },

    {
        question: "question 2",
        choices:["words", "words", "words", "words"],
        correctAsnwer: 3
    },

    // {
    //     thirdQuestion: 
    //     choices:["words", "words", "words", "words"],
    //     correctAsnwer:
    // },

    // {
    //     fourthQuestion: 
    //     choices:["words", "words", "words", "words"],
    //     correctAsnwer:
    // },

    // {
    //     fifthQuestion: 
    //     choices:["words", "words", "words", "words"],
    //     correctAsnwer:
    // },
];


var currentQuestionIndex = 0;
var currentQ;

// START SECTION
var timeScore = 100;

var timeInterval;

//start timer/quiz
function startQuiz() {

startSection.classList.add("hide");
quizSection.classList.remove("hide");

    timeInterval = setInterval(function () {
      timeScore--; timerDisplay.textContent = timeScore + " seconds remaining";
  
      if (timeScore === 0 ) {
        timerDisplay.textContent = timeScore
        gameOver();
        // displayMessage();
      }
  
    },1000);

    displayQuestion();
  }
//create a function that says times up
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





// //create a function to start the quiz
// function startQuiz() {
//     displayQuestion();

// }


//create a function to display the current question and choices

function displayQuestion() {
    currentQ = questions[currentQuestionIndex];
    questionElement.textContent = currentQ.question;

choicesElement.textContent = " ";
 for (let i = 0; i < currentQ.choices.length; i++) {
    const choice = currentQ.choices[i];
    var li = document.createElement("li");
    li.setAttribute("id",i);
    li.textContent=choice;
    li.addEventListener("click", answerSel);
    choicesElement.append(li);
 }
}

function answerSel(event) {
    var userChoice = event.target.id;
    console.log(userChoice);
    //check if answer is correct -- > check user choice with correct (if statement)
    if (userChoice != currentQ.correctAsnwer){
        timeScore -= 15
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
}

//add event listener for start button
startButton.addEventListener("click", startQuiz);


//store score in local storage and present it back into another form -->
//scores:
//initials:
//key value --> high scores --> array of objects that look the same in their key structure
//loop for rendering each high score


//separate pages for quiz and high scores