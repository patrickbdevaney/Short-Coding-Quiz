var clear = document.querySelector("#clear");
var highScoresList = document.querySelector(".score");

var listscores = function () {
    
    var highScores = localStorage.getItem("topFive");
    if (!highScores) {
        alert("No scores have been made");
    }
    else {
        highScores = JSON.parse(highScores);
        for (var i = 0; i < highScores.length; i++) {
            var highScoresListItem = document.createElement("li");
           
            highScoresListItem.textContent = `${i+1}. ${highScores[i].initials} - ${highScores[i].score}`;
           
            highScoresListItem.className = "score-item";
           
            highScoresList.appendChild(highScoresListItem)
        }
    }
}

var clearScores = function () {
    localStorage.removeItem("topFive");
    highScoresList.innerHTML = "";
}
listscores();
clear.addEventListener("click", clearScores);
