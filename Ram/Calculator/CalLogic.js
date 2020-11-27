function backspace() {

    var goback = document.getElementById('answer').value;
    document.getElementById('answer').value = goback.substring(0, goback.length - 1);

}

function clr() {

    document.getElementById('answer').value = "";
}

function dis(value) {
    document.getElementById("answer").value += value;
   
}


function equation() {

    let input = document.getElementById("answer").value;
    var result = eval(input);
    document.getElementById("answer").value = result;

    document.getElementById("log").value += input + ' ' + ' = ' + result + '\n';
    console.log("this is an alert" + log) //Debug statement
}



function clearlog() {

    document.getElementById('log').value = " ";
}




addEventListener("keypress", function (event) {
    var keyPressed = event.which || event.keyCode;
    if ((keyPressed >= 48 && keyPressed <= 57))
        dis(String.fromCharCode(event.charCode))
    else if (keyPressed == 42 || keyPressed == 43 || keyPressed == 45 || keyPressed == 47 || keyPressed == 46)
        dis(String.fromCharCode(event.charCode))
    else if (keyPressed == 13)
        equation();
    else if (keyPressed == 32)
        clr();
    else if (keyPressed == 108)
        clearlog();
    document.activeElement.blur();
    console.log("this is an alert" + keyPressed) //Debug statement
});
addEventListener("keydown", function (event) {
    var keyDown = event.which || event.keyCode;
    if (keyDown == 08)
        backspace();
});

function memoryS() {
    if (typeof (Storage) !== "undefined") {
        var curVal = document.getElementById("answer").value
        if (curVal !== "") {
            window.localStorage.setItem('lastVal', curVal)
            document.getElementById('memoryBox').value = curVal + "\n" + document.getElementById('memoryBox').value
            console.log("memory test");
            clr();
           
        }

    }
}

function memoryR() {
    if (typeof (Storage) !== "undefined") {
        document.getElementById("answer").value = window.localStorage.getItem('lastVal')

    }
    
}


function memoryP() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseInt(document.getElementById("answer").value);
        var lastVal = parseInt(window.localStorage.getItem('lastVal'));
        var result = eval(curVal + lastVal);
        document.getElementById("answer").value = result;
        document.getElementById("memoryBox").value = result;
        document.getElementById("log").value += result + ' + ' + lastVal + ' = ' + result + '\n'
    }
}
function memoryM() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseFloat(document.getElementById("answer").value);
        var lastVal = parseFloat(window.localStorage.getItem('lastVal'));
        var result = eval(lastVal - curVal);
        document.getElementById("answer").value = result;
        document.getElementById("memoryBox").value = result;
        document.getElementById("log").value += lastVal + ' - ' + curVal + ' = ' + result + '\n'
    }
}


function memoryC() {

    document.getElementById('memoryBox').value = "";
}
