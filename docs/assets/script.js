

function button(){
    document.getElementById("buttonAppear").innerHTML = '<button onclick="secondFunction()"></button>';
}

var questions = [
{ q: "Which of the following represents the OR operator?",
options: ["&&", "||", "!", "==="
 ], answer: "2"
}, {
    q: "What do we use to define all elements in javascript, especially strings, numbers, arrays?",
   options: ["variable", "function", "equation", "document"
 ], answer: "1"
},
{
    q: 'Which is a correct example of a for loop that repeats a function?',
    options: [
        'for [i=0; i>5; i+1] loop',
        'for (i++; i=1; i<5)',
        'for (i = 0; i < 5; i++)',
        'None of the above'
    ],
    answer: "3"
}, 
 {
    q: "In event propagation, which of the following handles events from inner html elements to outer?",
    options: [
        "deduction",
        "induction",
        "capturing",
        "bubbling"
    ],
    answer: "4"
}
];


var timer = document.querySelector("#countdown");

var startbutton= document.querySelector("#begin");

var div = document.querySelector(".container");

var number = 0;

var remainingseconds = 60;

var studentdata = {
    score: 0
};


var display = function () {


    var countdown = setInterval(function () {

if (remainingseconds > 0) {
    div.innerHTML = "";            
    div.classList.remove("center");
    timer.innerHTML = remainingseconds; 

    if (number < questions.length) {
        // create and display new question
        
        var question = document.createElement("h1");
        
        question.textContent = questions[number].q;
        
        div.appendChild(question);
        // makes answers appear
        
        var list = document.createElement("ul");
        
          // retrieve the array of choices associated with the question
        var optionsa = questions[number].options;    
        
        // loop through the array of choices
        for (var i = 0; i < optionsa.length; i++) {    
            var optionslist = document.createElement("li");
            optionslist.textContent = `${i+1}. ${optionsa[i]}`;
            optionslist.className = "options";
            optionslist.setAttribute("data-choice-nb", i+1);
            list.appendChild(optionslist);
            
        }
//subtracts time
        div.appendChild(list);
        remainingseconds--;                                        
    }
    // otherwise stop the timer and display the final score
    else {
        clearInterval(countdown);        
        timer.innerHTML = remainingseconds;
        studentdata.score = remainingseconds       
        displayScore();                   
    }
}

// stops the quiz and displays the score
else { 
    div.innerHTML = "";         
    clearInterval(countdown);         
    timer.innerHTML = remainingseconds;       
    displayScore();                    
}
}, 1000);
}


var optionbutton = function (event) {
// determines the number of the answer chosen and checks if it is correct
if (event.target.matches(".options")) {
var optionsNb = event.target.getAttribute("data-choice-nb");

prove(optionsNb);
}
}

var prove = function (userAnswer) {

    var feedback = document.createElement("p");

    if (userAnswer === questions[number].answer) {

        feedback.innerHTML = '<div class="feedback"><hr>You Are Correct!</div>';
}
else {

    feedback.innerHTML = '<div class="feedback"><hr>Incorrect</div>';

    remainingseconds -= 5;
}
div.appendChild(feedback);
//moves to the next array containing the questions and options
number++; 

setTimeout(display, 1000);
}
//shows score and indicates the player finished
var displayScore = function () {

var message = document.createElement("h1");

message.textContent = "Finished";

div.appendChild(message);

// create and display final score
var result = document.createElement("p");
result.textContent = `Your final score is ${studentdata.score}.`;
div.appendChild(result);


var form = document.createElement("form");

var initials = document.createElement("div");

initials.className = "form-item";

initials.innerHTML = 'Enter initials: <input type="text" name="initials" class="text-input"/>';

form.appendChild(initials);

var submit = document.createElement("div");

submit.className = "form-item";

submit.innerHTML = '<button class="btn" id="save-score" type="submit">Submit</button>';

form.appendChild(submit);

div.appendChild(form);

submit.addEventListener("click", submitInitials);
}

var submitInitials = function () {
event.preventDefault();
var initialsInput = document.querySelector("input[name='initials']").value;

if (!initialsInput) {
alert("Please enter your initials first.");
return false;
}
studentdata.initials = initialsInput;
recordscore();
var button = document.querySelector('#save-score');
button.disabled = false;
}

var recordscore = function () {
// retrieve from local
var savedhighscores = localStorage.getItem("topFive");
if (!savedhighscores) 
{
var user = [];

user.push(studentdata);

localStorage.setItem("topFive", JSON.stringify(user));

alert('You are now on the high score list. Click "view high scores" to see your score.');
}

else {

    savehighscores = JSON.parse(savedhighscores);

if (savedhighscores.length < 5) {
    savedhighscores.push(studentdata);
    alert('You are now on the high score list. Click "view high scores" to see your score.');
}

else {
    savedhighscores = scorecompare(savedhighscores);
}
savedhighscores.sort(compare);
localStorage.setItem("topFive", JSON.stringify(savedhighscores));
}
}

var scorecompare = function (topFive) {

    topFive.sort(compare);

    if (topFive[4].score < studentdata.score) {

        alert('You have achieved one of the high scores! You can check high scores by clicking "View High Scores".');

        topFive.pop();

        topFive.push(studentdata);
}
else {

    alert("You have not made one of the top scores");
}
return topFive;
}

// function to sort the array of top five users in descending order

var compare = function (student1, student2) {

    var score1 = student1.score;

    var score2 = student2.score;

    var compare = 0;

    if (score1 > score2) {
compare = -1;
}

else if (score1 < score2) {

    compare = 1;
}
return comparison;
}

startbutton.addEventListener("click", display);
div.addEventListener("click", optionbutton);
