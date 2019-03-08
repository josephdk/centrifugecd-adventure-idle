const playerClass = {
    class: 'Peasant',
    level: 1,
    expEarned: 20,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.05,
    promotionLevel: 2
}

const soldierClass = {
    class: 'Soldier',
    level: 1,
    expEarned: 4,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.25,
    promotionLevel: 3
}

document.getElementById('promoteToSoldier').onclick = function() { promotion("Soldier"); }


initialize();

setInterval(function gameLoop() {
    mainClass();
}, 1000);

function initialize() {
    document.getElementById("mainClassTitle").innerHTML = playerClass.class;
    document.getElementById("mainClassLevel").innerHTML = 'Level ' + playerClass.level;
}

function mainClass() {
    playerClass.expTotal = playerClass.expTotal + playerClass.expEarned;
    if (playerClass.expTotal >= playerClass.expToNext) {
        playerClass.level = playerClass.level + 1;
        playerClass.expTotal = playerClass.expTotal - playerClass.expToNext;
        playerClass.expToNext = playerClass.expToNext * playerClass.expCoefficient;
        document.getElementById("mainClassLevel").innerHTML = 'Level ' + playerClass.level;
        document.getElementById("mainClassProgress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    } else {
        document.getElementById("mainClassProgress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    }

    if (playerClass.level >= playerClass.promotionLevel) {
        document.getElementById("promoteToSoldier").disabled = false;
    }

    document.getElementById("mainClassETA").innerHTML = timeRemaining(playerClass.expToNext, playerClass.expTotal, playerClass.expEarned);
}

function promotion(promotionClass) {
    if (promotionClass === 'Soldier') {
        var {className, level, expEarned, expTotal, expToNext, expCoefficient, promotionLevel} = soldierClass;
    }

    playerClass.class = promotionClass;
    playerClass.level = level;
    playerClass.expEarned = expEarned;
    playerClass.expToNext = expToNext;
    playerClass.expCoefficient = expCoefficient;
    playerClass.expTotal = expTotal;
    playerClass.promotionLevel = promotionLevel;

    initialize();
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