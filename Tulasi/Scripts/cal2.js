var init = 0
function calculator(val) {
    document.getElementById("result").value += val
   // alert(val)
    console.log(" This is an alert " + val) // Debug Statements
    EnsureOnlyOneOpSign(val);

}

//function that evaluates the digit and return result
function solve() {
    var x = document.getElementById("result").value
    let result = eval(x)
    if (!isFinite(result)) {
        window.alert('Cannot divide by zero');
        clr();
    }
    else if (result !== null) {
        console.log(" Result of Calc.... " + result) // Debug Statements

        document.getElementById("result").value = result
        if (x.includes("+") || x.includes("/") || x.includes("-") || x.includes("*"))
            document.getElementById("displayLog").value += x + ' ' + ' = ' + result + '\n'
        //document.getElementById("result").value = ""
        document.getElementById("result").value = result
        var tArea = document.getElementById('displayLog');
        tArea.scrollTop = tArea.scrollHeight;
    }
}


//function that clear the display
function clr() {
    document.getElementById("result").value = ""

}
function clrAll() {
    clr();
    document.getElementById('displayLog').value = ''
    document.getElementById('MemoryStore').value = ''
    window.localStorage.getItem('lastVal') = ''
  }

addEventListener("keypress", function (event) {
    var keyPressed = event.which || event.keyCode;
    if (keyPressed >= 48 && keyPressed <= 57)
        calculator(String.fromCharCode(event.charCode));
        else if (keyPressed == 42 || keyPressed == 43 || keyPressed == 45 || keyPressed == 47)
        calculator(" " + String.fromCharCode(event.charCode) + " ");
    else if (keyPressed == 46)
        calculator(String.fromCharCode(event.charCode));
    else if (keyPressed == 61 || keyPressed == 13)
        solve();
    else if (keyPressed == 32)
        clr();
   });
addEventListener("keydown", function (event) {
    var keydown = event.which || event.keyCode;
    if (keydown == 08) {
        var curVal = document.getElementById("result").value
        if (curVal !== ' ') {
            curVal = curVal.substr(0, eval(curVal.length - 1));
            document.getElementById("result").value = curVal;
        }
        document.activeElement.blur();

    }
});

function sqr() {
    var curVal = document.getElementById("result").value
    if (curVal !== "") {
        var sqrVal = Math.pow(curVal,2)
        document.getElementById("displayLog").value += 'sqr(' + curVal + ') = ' + sqrVal + '\n';
        document.getElementById("result").value = '';
    }

}

function sqrRT() {
    var curVal = document.getElementById("result").value
    if (curVal !== "") {
        var sqrVal = Math.sqrt(curVal)
        document.getElementById("displayLog").value += 'sqrt(' + curVal + ') = ' + sqrVal + '\n';
        document.getElementById("result").value = '';
    }
}

function pi() {
    var curVal = document.getElementById("result").value
    if (curVal !== "") {
         var sqrVal = Math.PI * curVal
        document.getElementById("displayLog").value += 'pi(' + curVal + ') = ' + sqrVal + '\n';
        document.getElementById("result").value = '';
    }
}
function percent() {
    var curVal = parseFloat(document.getElementById("result").value);
    if (curVal == 0) {
        clr();
        document.getElementById("result").value = '';
    }
    else if (curVal !== '') {
        var byXVal = parseFloat(curVal) / 100;
        document.getElementById("displayLog").value += curVal + ' / 100 = ' + byXVal + '\n';
        document.getElementById("result").value = '';
    }

}


function deleteChar(input) {
    var curVal = document.getElementById("result").value
    if (curVal !== ' ') {
        curVal = curVal.substr(0, eval(curVal.length - 1));
        document.getElementById("result").value = curVal;
    }
} 
function mStore() {
    if (typeof (Storage) !== "undefined") {
        var curVal = document.getElementById("result").value
        if (curVal !== "") {
            console.log('Current Value : ' + curVal);
            window.localStorage.setItem('lastVal', curVal)
            document.getElementById('MemoryStore').value = curVal + "\n" + document.getElementById('MemoryStore').value;
        }
    }
}
function memory_p() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseInt(document.getElementById("result").value);
        var lastVal = parseInt(window.localStorage.getItem('lastVal'));
        document.getElementById("result").value = eval(curVal + lastVal);
        document.getElementById("displayLog").value += curVal + ' + ' + lastVal + ' = ' + eval(curVal + lastVal) + '\n'
    }
}
function memory_r() {
    if (typeof (Storage) !== "undefined") {
        document.getElementById("result").value = window.localStorage.getItem('lastVal');
    }
}
function memory_s() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseFloat(document.getElementById("result").value);
        var lastVal = parseFloat(window.localStorage.getItem('lastVal'));
        document.getElementById("result").value = eval(curVal - lastVal);
        document.getElementById("displayLog").value += curVal + ' - ' + lastVal + ' = ' + eval(curVal - lastVal) + '\n'

    }

}

