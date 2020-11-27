//function that display value 
function dis(val) {
    document.getElementById("result").value += val
    addToHistory(val);
}

//function that evaluates the digit and return result 
function solve() {
    let x = document.getElementById("result").value
    let y = eval(x)
    document.getElementById("result").value = y
    addToHistory('=' + y);
}

//function that clear the display 
function clr() {
    document.getElementById("result").value = ""
    addToHistory("");
} 

function handler(btn) {
    // return if C wasn't pressed when divide by zero was done
    if (btn !== 'C' && 'result' === 'Result is undefined' || result === 'Cannot divide by zero') {
        return;
    }
}

let history = '';

function addToHistory(value) {
    history += value;
    document.getElementById('history').innerText = history;
}


// Added a keyboard functionality to the calculator
    document.addEventListener("keydown", document.addEventListener("keyup", function (event) {
        if (event.key == 'Enter') { event.preventDefault(); document.getElementById("Equals").click(); }
        if (event.key == 0) { event.preventDefault(); document.getElementById("button0").click(); }
        if (event.key == 1) { event.preventDefault(); document.getElementById("button1").click(); }
        if (event.key == 2) { event.preventDefault(); document.getElementById("button2").click(); }
        if (event.key == 3) { event.preventDefault(); document.getElementById("button3").click(); }
        if (event.key == 4) { event.preventDefault(); document.getElementById("button4").click(); }
        if (event.key == 5) { event.preventDefault(); document.getElementById("button5").click(); }
        if (event.key == 6) { event.preventDefault(); document.getElementById("button6").click(); }
        if (event.key == 7) { event.preventDefault(); document.getElementById("button7").click(); }
        if (event.key == 8) { event.preventDefault(); document.getElementById("button8").click(); }
        if (event.key == 9) { event.preventDefault(); document.getElementById("button9").click(); }
        if (event.key == 187) { event.preventDefault(); document.getElementById("Plus").click(); }
        if (event.key == 189) { event.preventDefault(); document.getElementById("Minus").click(); }
        if (event.key == 170) { event.preventDefault(); document.getElementById("Multiply").click(); }
        if (event.key == 191) { event.preventDefault(); document.getElementById("Divide").click(); }
        if (event.key == 32 || event.key == 'C') { event.preventDefault(); document.getElementById("clear").click(); }
        if (event.key == 08) { event.preventDefault(); document.getElementById("backSpace").click(); }
        if (event.which == 110) { event.preventDefault(); document.getElementById("Dots").click(); }
    }));

