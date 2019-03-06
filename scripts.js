const player = {
    class: 'Peasant',
    level: 1,
    exp: 0
}
const playerClass = {
    expEarned: 20,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.05,
    promotionLevel: 2
}

const soldierClass = {
    expEarned: 4,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.25,
    promotionLevel: 3
}

let promotionConfirmation = document.getElementById('promotionButton');
promotionConfirmation.onclick = promotion;

initialize();

setInterval(function gameLoop() {
    mainClass();
}, 1000);

function initialize() {
    document.getElementById("mainClassTitle").innerHTML = player.class;
    document.getElementById("mainClassLevel").innerHTML = 'Level ' + player.level;
}

function mainClass() {
    playerClass.expTotal = playerClass.expTotal + playerClass.expEarned;
    if (playerClass.expTotal >= playerClass.expToNext) {
        player.level = player.level + 1;
        playerClass.expTotal = playerClass.expTotal - playerClass.expToNext;
        playerClass.expToNext = playerClass.expToNext * playerClass.expCoefficient;
        document.getElementById("mainClassLevel").innerHTML = 'Level ' + player.level;
        document.getElementById("mainClassProgress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    } else {
        document.getElementById("mainClassProgress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    }

    if (player.level >= playerClass.promotionLevel) {
        document.getElementById("promotionButton").disabled = false;
    }

    document.getElementById("mainClassETA").innerHTML = timeRemaining(playerClass.expToNext, playerClass.expTotal, playerClass.expEarned);
}

function promotion() {
    console.log('yep');
}


// These two functions relate to the time remaining until the next level
function timeRemaining(expToNext, expTotal, expEarned) {    
    let secondsRemaining = expToNext - expTotal;
    secondsRemaining = secondsRemaining / expEarned;
    let totalTimeReamining = convertSeconds(secondsRemaining);
    
    return totalTimeReamining;
}

function convertSeconds(sec) {
    var hrs = Math.floor(sec / 3600);
    var min = Math.floor((sec - (hrs * 3600)) / 60);
    var seconds = sec - (hrs * 3600) - (min * 60);
    seconds = Math.ceil((seconds * 100) / 100);
   
    var result = (min < 10 ? "0" + min : min);
    result += ":" + (seconds < 10 ? "0" + seconds : seconds);
    return result;
 }
 // These two functions relate to the time remaining until the next level