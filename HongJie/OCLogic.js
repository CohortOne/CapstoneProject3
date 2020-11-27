//var init = 0
//to display value on the textbox
function Get(num)
{
    document.getElementById("dval").value += num
}
//to clear value from the textbox
function clr()
{
    document.getElementById("dval").value =""
}
//to clear the last numeral from textbox
function back() {
    var value = document.getElementById("dval").value;
    document.getElementById("dval").value = value.substr(0, value.length - 1);
}
function Compute() {
    var x = document.getElementById("dval").value

    let dval = eval(x)
    if (!isFinite(dval)) {
        window.alert('Cannot divide by zero');
        clr();
    } else if (dval !== null) {
        console.log(" Result of Calc.... " + dval) // Debug Statements
        document.getElementById("dval").value = dval
        if (x.includes("+") || x.includes("/") || x.includes("-") || x.includes("*"))
            document.getElementById("history").value += x + ' ' + ' = ' + dval + '\n'
        document.getElementById("dval").value = ""
        var tArea = document.getElementById('history');
        tArea.scrollTop = tArea.scrollHeight;
    }
}

addEventListener("keypress", function (event) {

    var keyPressed = event.which || event.keyCode;

    if (keyPressed >= 48 && keyPressed <= 57)
        Get(String.fromCharCode(event.charCode));
    else if (keyPressed == 42 || keyPressed == 43 || keyPressed == 45 || keyPressed == 47)
        Get(" " + String.fromCharCode(event.charCode) + " ");
    else if (keyPressed == 46)
        Get(String.fromCharCode(event.charCode));
    else if (keyPressed == 61 || keyPressed == 13)
        solve();
    else if (keyPressed == 32)
        clr();
});

function Sq() {

    var curVal = document.getElementById("dval").value;
    if (curVal !== "") {
        var sqrVal = Math.pow(curVal, 2)
        document.getElementById("history").value += 'sqr(' + curVal + ') = ' + sqrVal + '\n';
        document.getElementById("dval").value = '';
    }
}


function mStore() {
    if (typeof (Storage) !== "undefined") {
        var curVal = document.getElementById("dval").value
        if (curVal !== "") {
            console.log('Current Value : ' + curVal);
            window.localStorage.setItem('lastVal', curVal)
            document.getElementById('mlog').value = curVal + "\n" + document.getElementById('mlog').value;
            document.getElementById('MRec').disabled = false;
            document.getElementById('MPlus').disabled = false;
            document.getElementById('MSub').disabled = false;
            document.getElementById('MRec').style.backgroundColor = 'lightskyblue';
            document.getElementById('MPlus').style.backgroundColor = 'lightskyblue';
            document.getElementById('MSub').style.backgroundColor = 'lightskyblue';
            document.getElementById('mlog').style.color = 'black';
            clr();
        }
    }
}
function mRec() {
    if (typeof (Storage) !== "undefined") {
        document.getElementById("dval").value = window.localStorage.getItem('lastVal')
    }
}
function mPlus() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseInt(document.getElementById("dval").value);
        var lastVal = parseInt(window.localStorage.getItem('lastVal'));
        var dval = eval(curVal + lastVal);
        document.getElementById("dval").value = dval;
        document.getElementById("mlog").value = dval;
        document.getElementById("history").value += dval + ' + ' + lastVal + ' = ' + dval + '\n'
    }
}
function mSub() {
    if (typeof (Storage) !== "undefined") {
        var curVal = parseFloat(document.getElementById("dval").value);
        var lastVal = parseFloat(window.localStorage.getItem('lastVal'));
        var dval = eval(lastVal - curVal);
        document.getElementById("dval").value = dval;
        document.getElementById("mlog").value = dval;
        document.getElementById("history").value += lastVal + ' - ' + curVal + ' = ' + dval + '\n'
    }
}
function clrAll() {
    
    document.getElementById('mlog').value = ''
}
function clrAll2() {
    document.getElementById('history').value = ''
}
/*function xRoot() {

    var curVal = document.getElementById("result").value;
    if (curVal !== "") {
        var sqrVal = Math.sqrt(curVal)
        document.getElementById("history").value += 'sqRoot(' + curVal + ') = ' + sqrVal + '\n';
        document.getElementById("result").value = '';
    }
}
/*function byX() {
    var curVal = parseFloat(document.getElementById("result").value);
    if (curVal == 0) {
        window.alert(" Can't be divided by Zero");
        clr();
    } else if (curVal !== '') {
        var byXVal = 1 / parseFloat(curVal);
        document.getElementById("history").value += '1/(' + curVal + ') = ' + byXVal + '\n';
        document.getElementById("result").value = '';
    }
}
/*function percent() {
    var curVal = parseFloat(document.getElementById("result").value);
    if (curVal == 0) {
        window.alert(" Can't be divided by Zero");
        clr();
        document.getElementById("result").value = '';
    } else if (curVal !== '') {
        var byXVal = parseFloat(curVal) / 100;
        document.getElementById("history").value += curVal + ' / 100 = ' + byXVal + '\n';
        document.getElementById("result").value = '';
    }

}*/