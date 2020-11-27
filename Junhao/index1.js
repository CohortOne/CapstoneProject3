var init = 0
function btn(val) {
    document.getElementById("result").value += val
    console.log(" This is an alert " + val) // Debug Statements
}

//function that evaluates the digit and return result
function solve() {
    var x = document.getElementById("result").value

    let result = eval(x)
    if (!isFinite(result)) {
        window.alert('please check');
        clr();
    } else if (result !== null) {
        console.log(" Result of Calc.... " + result) // Debug Statements
        document.getElementById("result").value = result
        if (x.includes("+") || x.includes("/") || x.includes("-") || x.includes("*"))
            document.getElementById("log").value += x + ' ' + ' = ' + result + '\n'
        document.getElementById("result").value = ""
        var tArea = document.getElementById('log');
        tArea.scrollTop = tArea.scrollHeight;
    }
}
//function that clear the display
function clr() {
    document.getElementById("result").value = ""
}
function clrAll() {
    clr();
    document.getElementById('log').value = ''
}

addEventListener("keypress", function (event) {

    var keyPressed = event.which || event.keyCode;

    if (keyPressed >= 48 && keyPressed <= 57)
        btn(String.fromCharCode(event.charCode));
    else if (keyPressed == 42 || keyPressed == 43 || keyPressed == 45 || keyPressed == 47)
        btn(" " + String.fromCharCode(event.charCode) + " ");
    else if (keyPressed == 46)
        btn(String.fromCharCode(event.charCode));
    else if (keyPressed == 61 || keyPressed == 13)
        solve();
    else if (keyPressed == 32)
        clr();
});

addEventListener("keydown", function (event) {
    var keyPressed = event.keyCode;
    if (keyPressed == 08) {
        var curVal = document.getElementById("result").value
        if (curVal !== '') {
            curVal = curVal.substr(0, eval(curVal.length - 1));
            document.getElementById("result").value = curVal;
        }
    }
    document.activeElement.blur();
});






function mStore() {
    if (typeof (Storage) !== "undefined") {
        var curVal = document.getElementById("result").value
        if (curVal !== "") {
            console.log('Current Value : ' + curVal);
            window.localStorage.setItem('lastVal', curVal)
            document.getElementById('mStore').value = curVal + "\n" + document.getElementById('mStore').value;
            document.getElementById('MRec').disabled = false;
            document.getElementById('MPlus').disabled = false;
            document.getElementById('MSub').disabled = false;
            document.getElementById('MRec').style.backgroundColor = 'lightskyblue';
            document.getElementById('MPlus').style.backgroundColor = 'lightskyblue';
            document.getElementById('MSub').style.backgroundColor = 'lightskyblue';
            document.getElementById('MStore').style.color = 'black';
            clr();
        }
    }
}
function mRec() {
    if (typeof (Storage) !== "undefined") {
        document.getElementById("result").value = window.localStorage.getItem('lastVal')
    }
}
function mPlus() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseInt(document.getElementById("result").value);
        var lastVal = parseInt(window.localStorage.getItem('lastVal'));
        var result = eval(curVal + lastVal);
        document.getElementById("result").value = result;
        document.getElementById("mStore").value = result;
        document.getElementById("log").value += result + ' + ' + lastVal + ' = ' + result + '\n'
    }
}
function mSub() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseFloat(document.getElementById("result").value);
        var lastVal = parseFloat(window.localStorage.getItem('lastVal'));
        var result = eval(lastVal - curVal);
        document.getElementById("result").value = result;
        document.getElementById("mStore").value = result;
        document.getElementById("log").value += lastVal + ' - ' + curVal + ' = ' + result + '\n'
    }
}