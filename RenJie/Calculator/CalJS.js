document.addEventListener("keydown", document.addEventListener("keyup", function (event) {
    if (event.key == 'Enter') { event.preventDefault(); document.getElementById("equal").click(); }
    if (event.key == 0 && event.code != 'Space') { event.preventDefault(); document.getElementById("zero").click(); }
    if (event.key == 1) { event.preventDefault(); document.getElementById("one").click(); }
    if (event.key == 2) { event.preventDefault(); document.getElementById("two").click(); }
    if (event.key == 3) { event.preventDefault(); document.getElementById("three").click(); }
    if (event.key == 4) { event.preventDefault(); document.getElementById("four").click(); }
    if (event.key == 5) { event.preventDefault(); document.getElementById("five").click(); }
    if (event.key == 6) { event.preventDefault(); document.getElementById("six").click(); }
    if (event.key == 7) { event.preventDefault(); document.getElementById("seven").click(); }
    if (event.key == 8) { event.preventDefault(); document.getElementById("eight").click(); }
    if (event.key == 9) { event.preventDefault(); document.getElementById("nine").click(); }
    if (event.key == '+') { event.preventDefault(); document.getElementById("plus").click(); }
    if (event.key == '-') { event.preventDefault(); document.getElementById("minus").click(); }
    if (event.key == '*') { event.preventDefault(); document.getElementById("mutiply").click(); }
    if (event.key == '/') { event.preventDefault(); document.getElementById("divide").click(); }
    if (event.key == 'c' || event.key == 'C') { event.preventDefault(); document.getElementById("clearall").click(); }
    if (event.key == 'Backspace') { event.preventDefault(); document.getElementById("correct").click(); }
    if (event.key == 'Delete') { event.preventDefault(); document.getElementById("clearall").click(); }
}));

function createLog(logrow, result, usage) {
    var regex = /[\+\-\*\/]/;
    if (usage.charAt(0) != '-') {
        if (regex.test(usage)) {
            var log = document.createElement("p");
            log.innerHTML = logrow;
            var logs = document.getElementById("logsbox");
            logs.appendChild(log);
        }
    }
    else {
        var s1 = usage.slice(1);
        if (regex.test(s1)) {
            var log = document.createElement("p");
            log.innerHTML = logrow;
            var logs = document.getElementById("logsbox");
            logs.appendChild(log);
        }

    }
    if (result == undefined) {
        result = '';
    }
    calculator.display.value = result;

}


function clearLogs() {
    document.getElementById('logsbox').innerHTML = '';
}

function clearMemory() {
    document.getElementById('membox').innerHTML = '';
    window.localStorage.clear();
    var mButtons = document.getElementsByClassName('mButtons');
    console.log(mButtons);
    for (var each of mButtons) {
        each.disabled = true;
    }

}

function openTabs(evt, tabName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

var memArray = [];


window.addEventListener('load', (event) => {
    if ('memory' in window.localStorage) {
        memArray = JSON.parse(window.localStorage.getItem('memory'));
        LoadFromLocalStorage();
        var mButtons = document.getElementsByClassName('mButtons');
        console.log(mButtons);
        for (var each of mButtons) {
            each.disabled = false;
        }
        alert('memory has been loaded successfully');
    }
});

window.addEventListener('click', (event) => {
    document.activeElement.blur();
});

function displayChecker() {
    var holder = document.getElementById('display').value;
    var regex = /[\+\-\*\/]/;
    if (holder.charAt(0) != '-') {
        if (!regex.test(holder)) {
            return true;
        }
    }
    else if (holder.charAt(0) == '-') {
        var s1 = holder.slice(1);
        if (!regex.test(s1)) {
            return true;
        }
    }
    else {
        return false;
    }
}

function mS() {
    if (saveToLocalStorage(document.getElementById("display").value)) {
        var memo = document.createElement("p");
        memo.innerHTML = memArray[memArray.length - 1];
        var memories = document.getElementById('membox');
        memories.prepend(memo);
        var mButtons = document.getElementsByClassName('mButtons');
        console.log(mButtons);
        for (var each of mButtons) {
            each.disabled = false;
        }
    }

}

function saveToLocalStorage(toBeSaved) {

    var holder = toBeSaved;
    if (displayChecker() && document.getElementById("display").value != '' ) {
        memArray.push(holder);
        window.localStorage.setItem('memory', JSON.stringify(memArray));
        return true;

    }
    else {
        alert("Only numbers are to be uploaded into memory");
        return false;
    }

   
}



function LoadFromLocalStorage() {
    if (memArray.length > 0) {
        memArray.forEach(function (entry) {
            var memo = document.createElement("p");
            memo.innerHTML = entry;
            var memories = document.getElementById('membox');
            memories.prepend(memo);
        })
    }
    else {
        alert("there is nothing to load");
    }
}

function LoadLastFromLocalStorage() {
    if (memArray.length > 0) {
        document.getElementById('display').value = memArray[memArray.length - 1];
    }
    else {
        alert("there is nothing to load");
    }
}

function mPlus() {


    if (memArray.length > 0) {
        try {
            var lastElement = memArray[memArray.length - 1];
            if (saveToLocalStorage(eval(eval(lastElement) + eval(document.getElementById('display').value)))) {
                var log = document.createElement("p");
                var logrow = lastElement + '+' + document.getElementById('display').value + '=' + memArray[memArray.length - 1];
                log.innerHTML = logrow;
                var logs = document.getElementById("logsbox");
                logs.appendChild(log);

                var memo = document.createElement("p");
                memo.innerHTML = memArray[memArray.length - 1];
                var memories = document.getElementById('membox');
                memories.prepend(memo);
            }
            

        }
        catch (e) {
            alert("There was an error, please only input numbers");
        }
       
    }
    else {
        alert("there are no numbers to add to in memory yet");
    }
    
}

function mMinus() {


    if (memArray.length > 0) {
        try {
            var lastElement = memArray[memArray.length - 1];
            if (saveToLocalStorage(eval(eval(memArray[memArray.length - 1]) - eval(document.getElementById('display').value)))) {
                var log = document.createElement("p");
                var logrow = lastElement + '-' + document.getElementById('display').value + '=' + memArray[memArray.length - 1];
                log.innerHTML = logrow;
                var logs = document.getElementById("logsbox");
                logs.appendChild(log);

                var memo = document.createElement("p");
                memo.innerHTML = memArray[memArray.length - 1];
                var memories = document.getElementById('membox');
                memories.prepend(memo);

            }
            
        }
        catch (e) {
            alert("There was an error, please only input numbers");
        }

    }
    else {
        alert("there are no numbers to add to in memory yet");
    }

}

function equalPress() {
    try { createLog(calculator.display.value + ' = ' + eval(calculator.display.value), eval(calculator.display.value), calculator.display.value) }
    catch (e) {
        alert('Invalid input, please try again'); calculator.display.value = '';
    }
}

function lengthChecker() {
    if (calculator.display.value.length >= 9) {
        alert("Input length must be <= 8");
        return false;
    }
    else
        return true;
}