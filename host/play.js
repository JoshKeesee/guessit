var time = document.getElementsByClassName("timer");
var timings = gup("time");
var i = 0;
var x = 0;  
var scores = [];
var players = [];
var data = [];
var myInterval = setInterval(Timeout, 1000);  
function Timeout() {  
    if (document.querySelector(".timer").innerHTML != "0:00") {
        if ((timings * 60 - x) % 60 >= 10) {  
            time[0].innerHTML = parseInt(`${(timings * 60 - x) / 60}`) + ":" + `${(timings * 60 - x) % 60}`;  
        } else {  
            time[0].innerHTML = parseInt(`${(timings * 60 - x) / 60}`) + ":0" + `${(timings * 60 - x) % 60}`;  
        }  
        x++;
    }
}
function checkIfDone() {
    if (document.querySelector(".timer").innerHTML === "0:00") {
        setTimeout(end, 1000);
    } else {
        setTimeout(checkIfDone, 0);
    }
}
function end() {
    window.location.href = "/guessit/host/final";
}
function gup (name) {
    name = RegExp ('[?&]' + name.replace (/([[\]])/, '\\$1') + '=([^&#]*)');
    return (window.location.href.match (name) || ['', ''])[1];
}
function refreshData() {
    setInterval(function() {
        data = [];
        players = JSON.parse(localStorage.getItem("players"));
        for (i = 0; i < players.length; i++) {
            scores.push(localStorage.getItem(players[i]));
        }
        for (let x = 0; x < players.length; x++) {
            data.push({name: "", score: ""});
            data[x].name = players[x];
            data[x].score = scores[x];
        }
        data = data.sort(function(a,b) { return b.score - a.score });
        showLeaderboard();
    }, 1000);
}
function showLeaderboard() {
    for (i = 0; i < document.querySelectorAll(".player").length - 1; i++) {
        document.querySelectorAll(".player")[i].remove();
    }
    for (i = 0; i < data.length; i++) {
        var div = document.createElement("div");
        div.className = "player";
        div.innerHTML = "<span class='circle'>" + (i + 1) + "</span>" + data[i].name + " " + data[i].score;
        document.querySelector(".sidebar").appendChild(div);
    }
}