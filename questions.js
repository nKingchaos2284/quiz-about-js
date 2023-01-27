//global variable definitions
var headerEl = document.querySelector('.header'); //sets var for header
var startBtnEl = document.querySelector('#startBtn'); //sets var for start button
var mainHead = document.querySelector('#main-head'); //sets var for main h1 element
var mainP = document.querySelector('#main-p'); //sets var for main paragraph element
var timerEl = document.querySelector('#timer'); //set var for timer element
var pageContentEl = document.querySelector('.page-content');
var highScoreBtnEl = document.querySelector('.view-high-score');
var questionCount = 0; //counts numbers of questions asked
var questionNum = {}; //empty object to pass questions through

//timer
var timeLeft = 0; //set timer to 60
timerEl.textContent = 'Time: ' + timeLeft;

//var for verifying answers
var correctAns = document.createElement('div');
correctAns.className = 'user-answer'
correctAns.textContent = 'Previous Question: CORRECT!'
var incorrectAns = document.createElement('div');
incorrectAns.className = 'user-answer'
incorrectAns.textContent = 'Previous Question: WRONG!'

//create question objects
var questionList = [
    { question: 'Which of the given options is an incorrect variable name?:', answerOne: 'javascript', answerTwo: '_javascript', answerThree: '$javascript', answerFour: '-javascript', solution: 'question-btn-four' },
    { question: 'Which method will you use to round the number 24.76 to the nearest integer?:', answerOne: 'round(24.76);', answerTwo: 'rnd(24.76);', answerThree: 'Math.round(24.76);', answerFour: 'Math.rnd(24.76);', solution: 'question-btn-three' },
    { question: 'Which of the following is an event listener in JavaScript?:', answerOne: 'blur', answerTwo: 'onclick', answerThree: 'Click', answerFour: 'click', solution: 'question-btn-four' },
    { question: 'What is the syntax of a “for” statement in JavaScript?:', answerOne: 'for(condition; initialization; increment)', answerTwo: 'for(initialization, condition, increment)', answerThree: 'for(increment; condition; initialization)', answerFour: 'for(initialization; condition; increment)', solution: 'question-btn-four' },
    { question: 'Determine the result of: String(“Hello”) === “Hello”;', answerOne: 'true', answerTwo: 'false', answerThree: 'SyntaxError', answerFour: 'ReferenceError', solution: 'question-btn-one' },
    { question: 'Which of the following print content on the browser window?:', answerOne: 'write(“print content”);', answerTwo: 'document.write(print content);', answerThree: 'response.write(“print content”);', answerFour: 'document.write(“print content”);', solution: 'question-btn-four' }
];

//create question HTML elements
var questionHead = document.createElement('h1'); //create h1 element
questionHead.className = 'question-head';
var questionDiv = document.createElement('ol'); //create ordered list element
questionDiv.className = 'question-list'
var questionBtnOne = document.createElement('button'); //create button element
questionBtnOne.className = 'question-btn-one'
questionBtnOne.id = 'question-btns'
var questionBtnTwo = document.createElement('button'); //create button element
questionBtnTwo.className = 'question-btn-two'
questionBtnTwo.id = 'question-btns'
var questionBtnThree = document.createElement('button'); //create button element
questionBtnThree.className = 'question-btn-three'
questionBtnThree.id = 'question-btns'
var questionBtnFour = document.createElement('button'); //create button element
questionBtnFour.className = 'question-btn-four'
questionBtnFour.id = 'question-btns'

//create high score input element
var scoreForm = document.createElement('form');

//create high score initial input
var userScore = document.createElement('input');
userScore.className = 'user-score';
userScore.type = 'text';
userScore.placeholder = 'Enter Handle';
scoreForm.appendChild(userScore);

//create high score submit button
var scoreBtn = document.createElement('button');
scoreBtn.className = 'submit-btn'
scoreBtn.type = 'submit'
scoreBtn.textContent = 'Submit High Score'
scoreForm.appendChild(scoreBtn);

//create go back/restart quiz button
var goBackBtn = document.createElement('button'); //create Go Back button
goBackBtn.className = ('go-back')
goBackBtn.textContent = 'Go Back'

//create clear high scores button
var clearScoreBtn = document.createElement('button'); //create clear high score button
clearScoreBtn.className = 'clear-score'
clearScoreBtn.textContent = 'Clear High Scores'

var startGame = function () {
    timeLeft = 60; //set timer to initial value
    mainHead.remove(); //removes initial main heading
    mainP.remove(); //removes initial main paragraph
    startBtnEl.remove(); //removes start button

    timeInt = setInterval(function () { //declare global variable for timer
        if (timeLeft > 0) {
            timerEl.textContent = 'Time: ' + timeLeft; //write timeLeft to the timer element
            timeLeft--; //decrement timer every interval
        } else {
            timerEl.textContent = ''; //remove timer from screen
            clearInterval(timeInt); //clear timer
            stopGame();
        }
    }, 1000);

    createQuestion();
}

var createQuestion = function () { //generates a question from the list
    questionHead.textContent = questionList[questionCount].question;
    pageContentEl.appendChild(questionHead); //add h1 to page (question)

    questionDiv.textContent = '';
    pageContentEl.appendChild(questionDiv); //add ol to page (container)

    questionBtnOne.textContent = questionList[questionCount].answerOne;
    questionDiv.appendChild(questionBtnOne); //add button to ol (option 1)

    questionBtnTwo.textContent = questionList[questionCount].answerTwo;
    questionDiv.appendChild(questionBtnTwo); //add button to ol (option 2)

    questionBtnThree.textContent = questionList[questionCount].answerThree;
    questionDiv.appendChild(questionBtnThree); //add button to ol (option 3)

    questionBtnFour.textContent = questionList[questionCount].answerFour;
    questionDiv.appendChild(questionBtnFour); //add button to ol (option 4)

    //add click listeners
    var questionOneBtnEl = document.querySelector('.question-btn-one');
    questionOneBtnEl.addEventListener('click', newQuestion);
    var questionTwoBtnEl = document.querySelector('.question-btn-two');
    questionTwoBtnEl.addEventListener('click', newQuestion);
    var questionThreeBtnEl = document.querySelector('.question-btn-three');
    questionThreeBtnEl.addEventListener('click', newQuestion);
    var questionFourBtnEl = document.querySelector('.question-btn-four');
    questionFourBtnEl.addEventListener('click', newQuestion);
}

var newQuestion = function (event) {
    correctAns.remove();
    incorrectAns.remove();

    var btnPressed = event.target; //define btnPressed as whichever button was clicked
    if (btnPressed.className === questionList[questionCount].solution && questionCount < questionList.length - 1) { //check if the button is the same as the solution   
        questionCount++;
        createQuestion();
        pageContentEl.appendChild(correctAns);
    } else if (btnPressed.className != questionList[questionCount].solution && questionCount < questionList.length - 1) {
        timeLeft -= 10;
        questionCount++;
        createQuestion();
        pageContentEl.appendChild(incorrectAns);
    } else if (btnPressed.className === questionList[questionCount].solution) { //check if it is the last question
        stopGame();
        pageContentEl.appendChild(correctAns);
        return;
    } else {
        timeLeft -= 10;
        stopGame();
        pageContentEl.appendChild(incorrectAns);
        return;
    }
}

function stopGame() { //once the timer hits zero or all questions have been answered, run this function
    clearInterval(timeInt); //stop time
    if (timeLeft >= 0) { //make sure time does not go negative
        timerEl.textContent = 'Time: ' + timeLeft;
    } else {
        timeLeft = 0;
        timerEl.textContent = 'Time: ' + timeLeft;
    }
    questionHead.textContent = 'All Done!';
    questionDiv.textContent = 'Your final score is ' + timeLeft;
    questionDiv.appendChild(scoreForm);
    document.addEventListener('submit', function (event) {
        event.preventDefault();
        localStorage.setItem(userScore.value, timeLeft);
        highScore();
    });
}

var highScore = function () {
    try {
        clearInterval(timeInt);
    } catch { }
    headerEl.remove(); //removes top header
    mainHead.remove(); //removes initial main heading
    mainP.remove(); //removes initial main paragraph
    startBtnEl.remove(); //removes start button
    correctAns.remove();
    incorrectAns.remove();

    pageContentEl.appendChild(questionHead);
    pageContentEl.appendChild(questionDiv);

    questionHead.textContent = 'High Scores'
    questionDiv.textContent = ''
    var highScoreList = [];
    for (let i = 0; i < localStorage.length; i++) { //loop through high scores
        highScoreList.push(localStorage.getItem(localStorage.key(i)) + ' - ' + localStorage.key(i)); //get high score key and value
        highScoreList.sort().reverse(); //sort high scores with highest on top
    }
    for (let i = 0; i < highScoreList.length; i++) { //loop to add highs scores to screen
        var highScoreListItem = document.createElement('li') //turn high score into list item
        highScoreListItem.className = 'score-list'
        highScoreListItem.textContent = highScoreList[i]; //add content to list item
        questionDiv.append(highScoreListItem); //add list items to ol
    }

    pageContentEl.appendChild(goBackBtn);
    pageContentEl.appendChild(clearScoreBtn);

    goBackBtn.addEventListener('click', goBack);
    clearScoreBtn.addEventListener('click', clearScore);
}

var goBack = function () {
    window.location.reload();
}

var clearScore = function () {
    localStorage.clear();
    alert('The high scores have been cleared');
    window.location.reload();
}

startBtnEl.addEventListener('click', startGame); //listens for click on start button, then calls function
highScoreBtnEl.addEventListener('click', highScore)

