const skill_woodWorking = {
    expEarned: 20,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.15,
    level: 1,
}

const skill_fishing = {
    expEarned: 10,
    expTotal: 0,
    expToNext: 100,
    expCoefficient: 1.22,
    level: 1,
}

setInterval(function gameLoop() {
    woodWorking();
    fishing();
}, 1000);

function woodWorking() {
    skill_woodWorking.expTotal = skill_woodWorking.expTotal + skill_woodWorking.expEarned;
    if (skill_woodWorking.expTotal >= skill_woodWorking.expToNext) {
        skill_woodWorking.level = skill_woodWorking.level + 1;
        skill_woodWorking.expTotal = skill_woodWorking.expTotal - skill_woodWorking.expToNext;
        skill_woodWorking.expToNext = skill_woodWorking.expToNext * skill_woodWorking.expCoefficient;
        document.getElementById("woodWorkingLevel").innerHTML = 'Level ' + skill_woodWorking.level;
        document.getElementById("woodWorkingProgress").style.width = skill_woodWorking.expTotal / skill_woodWorking.expToNext * 100 + '%';
    } else {
    document.getElementById("woodWorkingProgress").style.width = skill_woodWorking.expTotal / skill_woodWorking.expToNext * 100 + '%';
    }

    document.getElementById("woodWorkingCurrentExp").innerHTML = timeRemaining(skill_woodWorking.expToNext, skill_woodWorking.expTotal, skill_woodWorking.expEarned);
    // console.log(skill_woodWorking);
}

function fishing () {
    if (skill_woodWorking.level < 2){
        return;
    }

    skill_fishing.expTotal = skill_fishing.expTotal + skill_fishing.expEarned;
    if (skill_fishing.expTotal > skill_fishing.expToNext) {
        skill_fishing.level = skill_fishing.level + 1;
        skill_fishing.expTotal = skill_fishing.expTotal - skill_fishing.expToNext;
        skill_fishing.expToNext = skill_fishing.expToNext * skill_fishing.expCoefficient;
        document.getElementById("fishingLevel").innerHTML = 'Level ' + skill_fishing.level;
        document.getElementById("fishingProgress").style.width = skill_fishing.expTotal / skill_fishing.expToNext * 100 + '%';
    } else {
    document.getElementById("fishingProgress").style.width = skill_fishing.expTotal / skill_fishing.expToNext * 100 + '%';
    }

    document.getElementById("fishingCurrentExp").innerHTML = '(' + Math.round(skill_fishing.expTotal) + '/' + Math.round(skill_fishing.expToNext) + ')';
    // console.log(skill_fishing);
}

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