let playerClass = {
    class: 'Peasant',
    firstPromotion: 'Soldier',
    secondPromotion: 'Farmer',
    description1: "You are a worthless peasant.",
    description2: "It's not much of a life, but it's a life.",
    img: 'images/peasant.png',
    level: 1,
    expEarned: 50,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.05,
    promotionLevel: 2,
    goldGained: 1,
    attackGained: 0,
    defenseGained: 0,
    totalGold: 0,
    totalAttack: 0,
    totalDefense: 0
}

const soldierClass = {
    class: 'Soldier',
    firstPromotion: 'Mercenary',
    secondPromotion: 'Knight',
    description1: "You've enlisted in the military.",
    description2: "It means more money, if you can stay alive.",
    img: 'images/soldier.png',
    level: 1,
    expEarned: 50,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.25,
    promotionLevel: 2,
    goldGained: 2,
    attackGained: 1,
    defenseGained: 1
}

const knightClass = {
    class: 'Knight',
    firstPromotion: 'Max',
    secondPromotion: 'Max',
    description1: "You've been knighted.",
    description2: "The king trusts you, which is pretty good.",
    img: 'images/knight.png',
    level: 1,
    expEarned: 50,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.25,
    promotionLevel: 99,
    goldGained: 2,
    attackGained: 1,
    defenseGained: 1
}

const farmerClass = {
    class: 'Farmer',
    firstPromotion: 'Mage',
    secondPromotion: 'Drifter',
    description1: "You've become a farmer.",
    description2: "It's hard work but at least it pays well.",
    img: 'images/farmer.png',
    level: 1,
    expEarned: 50,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.45,
    promotionLevel: 2,
    goldGained: 4,
    attackGained: 0,
    defenseGained: 1
}

// Core initialization
loadGame();
initialize();

// Main game loop
setInterval(function gameLoop() {
    mainGameLoop();
}, 1000);

// Save game loop
var saveGameLoop = window.setInterval(function() {
    localStorage.setItem('idleAdventureSave', JSON.stringify(playerClass));
    console.log('Game saved successfully');
}, 15000)

function loadGame() {
    var saveGame = JSON.parse(localStorage.getItem('idleAdventureSave'))
    if (saveGame !== null) {
        playerClass = saveGame;
    }
}

// Sets all dynamic screen variables to the current contents of playerClass when the game is started or updated
function initialize() {
    document.getElementById("mainClassTitle").innerHTML = playerClass.class;
    document.getElementById("mainClassLevel").innerHTML = 'Level ' + playerClass.level;
    document.getElementById("classPicture").src = playerClass.img;
    document.getElementById("promoteToFirst").innerHTML = playerClass.firstPromotion;
    document.getElementById("promoteToSecond").innerHTML = playerClass.secondPromotion;
    document.getElementById("description1").innerHTML = playerClass.description1;
    document.getElementById("description2").innerHTML = playerClass.description2;
}

function mainGameLoop() {
    // Updating currencies and experience based on selected class
    playerClass.expTotal = playerClass.expTotal + playerClass.expEarned;
    playerClass.totalGold = playerClass.totalGold + playerClass.goldGained;
    playerClass.totalAttack = playerClass.totalAttack + playerClass.attackGained;
    playerClass.totalDefense = playerClass.totalDefense + playerClass.defenseGained;

    // Leveling-up processes
    if (playerClass.expTotal >= playerClass.expToNext) {
        playerClass.level = playerClass.level + 1;
        playerClass.expTotal = playerClass.expTotal - playerClass.expToNext;
        playerClass.expToNext = playerClass.expToNext * playerClass.expCoefficient;
        document.getElementById("mainClassLevel").innerHTML = 'Level ' + playerClass.level;
        document.getElementById("mainClassProgress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    } else {
        document.getElementById("mainClassProgress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    }

    // Enabling promotion classes if requirements are met
    if (playerClass.level >= playerClass.promotionLevel) {
        document.getElementById("promoteToFirst").disabled = false;
        document.getElementById("promoteToSecond").disabled = false;
    }

    // Updating the dynamic variables on the screen
    document.getElementById("gold").innerHTML = playerClass.totalGold;
    document.getElementById("attack").innerHTML = playerClass.totalAttack;
    document.getElementById("defense").innerHTML = playerClass.totalDefense;
    document.getElementById("current-exp").innerHTML = playerClass.expTotal.toFixed();
    document.getElementById("needed-exp").innerHTML = playerClass.expToNext.toFixed();
    document.getElementById("mainClassETA").innerHTML = timeRemaining(playerClass.expToNext, playerClass.expTotal, playerClass.expEarned);
}

// Event handlers for the promotion buttons
document.getElementById('promoteToFirst').onclick = function() { promotion(playerClass.firstPromotion); }
document.getElementById('promoteToSecond').onclick = function() { promotion(playerClass.secondPromotion); }

// Handles reassigning the players class to the selected promotion class
function promotion(promotionClass) {
    if (promotionClass === 'Soldier') {
        var promotionObj = Object.assign(soldierClass, {});
    } else if (promotionClass === 'Farmer') {
        var promotionObj = Object.assign(farmerClass, {});
    } else if (promotionClass === 'Knight') {
        var promotionObj = Object.assign(knightClass, {});
    }

    playerClass.class = promotionClass;
    playerClass.level = promotionObj.level;
    playerClass.expEarned = promotionObj.expEarned;
    playerClass.expToNext = promotionObj.expToNext;
    playerClass.expCoefficient = promotionObj.expCoefficient;
    playerClass.expTotal = promotionObj.expTotal;
    playerClass.promotionLevel = promotionObj.promotionLevel;
    playerClass.img = promotionObj.img;
    playerClass.firstPromotion = promotionObj.firstPromotion;
    playerClass.secondPromotion = promotionObj.secondPromotion;
    playerClass.description1 = promotionObj.description1;
    playerClass.description2 = promotionObj.description2;
    playerClass.goldGained = promotionObj.goldGained;
    playerClass.attackGained = promotionObj.attackGained;
    playerClass.defenseGained = promotionObj.defenseGained;
    document.getElementById("classPicture").src = promotionObj.img;
    document.getElementById("description1").innerHTML = promotionObj.description1;
    document.getElementById("description2").innerHTML = promotionObj.description2;
    document.getElementById("promoteToFirst").innerHTML = promotionObj.firstPromotion;
    document.getElementById("promoteToSecond").innerHTML = promotionObj.secondPromotion;
    document.getElementById("promoteToFirst").disabled = true;
    document.getElementById("promoteToSecond").disabled = true;
    initialize();
}

// Dev Tools
document.getElementById('devLevelUp').onclick = function() { devTools('levelUp'); }
document.getElementById('devAttackUp').onclick = function() { devTools('attackUp'); }
document.getElementById('devDefenseUp').onclick = function() { devTools('defenseUp'); }
document.getElementById('devDeleteSave').onclick = function() { devTools('deleteSave'); }

function devTools (command) {
    if (command === 'levelUp') {
        playerClass.level = 100;
    } else if (command === 'attackUp') {
        playerClass.totalAttack = 100000;
    } else if (command === 'defenseUp') {
        playerClass.totalDefense = 100000;
    } else if (command === 'deleteSave') {
        localStorage.removeItem('idleAdventureSave');
    }
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