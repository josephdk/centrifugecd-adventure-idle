let playerClass = {
    class: 'Peasant',
    firstPromotion: 'Soldier',
    firstShortDescription: 'Militaristic path',
    secondPromotion: 'Farmer',
    secondShortDescription: "Production path",
    description1: "You are a worthless peasant.",
    description2: "It's not much of a life, but it's a life.",
    img: 'images/peasant.png',
    level: 1,
    expEarned: 5,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.25,
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
    shortDescrption: 'Militaristic path',
    level: 1,
    expEarned: 50,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.25,
    promotionLevel: 2,
    goldGained: 2,
    attackGained: 1,
    defenseGained: 0
}

const knightClass = {
    class: 'Knight',
    firstPromotion: 'Max',
    secondPromotion: 'Max',
    description1: "You've been knighted.",
    description2: "The king trusts you, which is pretty good.",
    shortDescrption: 'Militaristic path',
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
    shortDescrption: "Production path",
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

const currencyImages = {
    gold: 'images/gold.png',
    attack: 'images/attack.png',
    defense: 'images/defense.png'
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
    document.getElementById("inventory-gold").innerHTML = playerClass.totalGold;
    document.getElementById("inventory-attack").innerHTML = playerClass.totalAttack;
    document.getElementById("inventory-defense").innerHTML = playerClass.totalDefense;
    document.getElementById("main-class-title").innerHTML = playerClass.class;
    document.getElementById("main-class-level").innerHTML = 'Level ' + playerClass.level;
    document.getElementById("main-class-picture").src = playerClass.img;
    document.getElementById("main-gold-gain").innerHTML = '+' + playerClass.goldGained + ' ';
    document.getElementById("main-attack-gain").innerHTML = ' &nbsp;&nbsp;+' + playerClass.attackGained + ' ';
    document.getElementById("main-defense-gain").innerHTML = ' &nbsp;&nbsp;+' + playerClass.defenseGained + ' ';
    document.getElementById("main-class-description1").innerHTML = playerClass.description1;
    document.getElementById("main-class-description2").innerHTML = playerClass.description2;
    document.getElementById("main-current-exp").innerHTML = playerClass.expTotal.toFixed();
    document.getElementById("main-needed-exp").innerHTML = playerClass.expToNext.toFixed();
    document.getElementById("main-class-progress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    document.getElementById("promo-first").innerHTML = playerClass.firstPromotion;
    document.getElementById("promo-second").innerHTML = playerClass.secondPromotion;
    if (playerClass.level >= playerClass.promotionLevel) {
        document.getElementById("promo-first").disabled = false;
        document.getElementById("promo-second").disabled = false;
    }
    document.getElementById("promo-first-short-desc").innerHTML = playerClass.firstShortDescription;
    document.getElementById("promo-second-short-desc").innerHTML = playerClass.secondShortDescription;
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
        document.getElementById("main-class-level").innerHTML = 'Level ' + playerClass.level;
        document.getElementById("main-class-progress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    } else {
        document.getElementById("main-class-progress").style.width = playerClass.expTotal / playerClass.expToNext * 100 + '%';
    }

    // Enabling promotion classes if requirements are met
    if (playerClass.level >= playerClass.promotionLevel) {
        document.getElementById("promo-first").disabled = false;
        document.getElementById("promo-second").disabled = false;
    }

    // Updating the dynamic variables on the screen
    document.getElementById("inventory-gold").innerHTML = playerClass.totalGold;
    document.getElementById("inventory-attack").innerHTML = playerClass.totalAttack;
    document.getElementById("inventory-defense").innerHTML = playerClass.totalDefense;
    document.getElementById("main-current-exp").innerHTML = playerClass.expTotal.toFixed();
    document.getElementById("main-needed-exp").innerHTML = playerClass.expToNext.toFixed();
    // document.getElementById("mainClassETA").innerHTML = timeRemaining(playerClass.expToNext, playerClass.expTotal, playerClass.expEarned);
}

// Event handlers for the promotion buttons
document.getElementById('promo-first').onclick = function() { promotion(playerClass.firstPromotion); }
document.getElementById('promo-second').onclick = function() { promotion(playerClass.secondPromotion); }

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
    playerClass.shortDescrption = promotionObj.shortDescrption;
    document.getElementById("main-class-picture").src = promotionObj.img;
    document.getElementById("main-class-description1").innerHTML = promotionObj.description1;
    document.getElementById("main-class-description2").innerHTML = promotionObj.description2;
    document.getElementById("main-gold-gain").innerHTML = promotionObj.goldGained + ' ';
    document.getElementById("main-attack-gain").innerHTML = ', ' + promotionObj.attackGained + ' ';
    document.getElementById("main-defense-gain").innerHTML = ', ' + promotionObj.defenseGained + ' ';
    document.getElementById("promo-first").innerHTML = promotionObj.firstPromotion;
    document.getElementById("promo-second").innerHTML = promotionObj.secondPromotion;
    document.getElementById("promo-first-short-desc").innerHTML = promotionObj.firstShortDescription;
    document.getElementById("promo-second-short-desc").innerHTML = promotionObj.secondShortDescription;
    document.getElementById("promo-first").disabled = true;
    document.getElementById("promo-second").disabled = true;
    initialize();
}

function buildPromoCurrencyGains() {
    let firstPromoClass = document.getElementById("promo-first").innerHTML;
    let secondPromoClass = document.getElementById("promo-first").innerHTML;
    
}

// Dev Tools
document.getElementById('dev-level-up').onclick = function() { devTools('levelUp'); }
document.getElementById('dev-attack-up').onclick = function() { devTools('attackUp'); }
document.getElementById('dev-defense-up').onclick = function() { devTools('defenseUp'); }
document.getElementById('dev-delete-save').onclick = function() { devTools('deleteSave'); }

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