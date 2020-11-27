function display(val) {
    document.getElementById("result").value += val;
}


function solve() {
    let a = document.getElementById("result").value;

    try {
        eval(a);
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            alert(e.message);
            clearall();
        }
    }
    let b = eval(a);
    if (!isFinite(b)) {
        alert('Cannot divide by zero');
        clearall();
    }
    else if (a.includes("//")) {
        alert("// keyed in");
        clearall();;
    }
    else {
        let c = String(a);
        let d = c.substring(1);
        document.getElementById("result").value = b;
        if (c.startsWith("-") == false && c.startsWith("+") == false && (a.includes("+") || a.includes("-") || a.includes("*") || a.includes("/")))
            document.getElementById("history").innerHTML += a + "=" + b + "<br/>";
        else if ((c.startsWith("+") == true || c.startsWith("-")) == true && (d.includes("+") || d.includes("-") || d.includes("*") || d.includes("/")))
            document.getElementById("history").innerHTML += a + "=" + b + "<br/>";
        var tArea = document.getElementById('history');
        tArea.scrollTop = tArea.scrollHeight;
    }
    
}

function clearall() {
    document.getElementById("result").value = "";
}

window.addEventListener("keyup", function (event) {
    if (event.keyCode == 13 || event.keyCode == 187)
        solve();
});

window.addEventListener("keyup", function (event) {
    if (event.keyCode == 67 || event.keyCode == 27 || event.keyCode == 46)
        clearall();
});

window.addEventListener("keyup", function (event) {
    if (event.keyCode == 96)
        display('0');
    else if (event.keyCode == 97)
        display('1');
    else if (event.keyCode == 98)
        display('2');
    else if (event.keyCode == 99)
        display('3');
    else if (event.keyCode == 100)
        display('4');
    else if (event.keyCode == 101)
        display('5');
    else if (event.keyCode == 102)
        display('6');
    else if (event.keyCode == 103)
        display('7');
    else if (event.keyCode == 104)
        display('8');
    else if (event.keyCode == 105)
        display('9');
    else if (event.keyCode == 107)
        display('+');
    else if (event.keyCode == 109)
        display('-');
    else if (event.keyCode == 106)
        display('*');
    else if (event.keyCode == 111)
        display('/');
    else if (event.keyCode == 110)
        display('.');
});

//addEventListener("keypress", function (event) {
//var keyPressed = event.which || event.keyCode;
//if (keyPressed >= 48 && keyPressed <= 57)
//  dis(String.fromCharCode(event.charCode));
//else if (keyPressed == 42 || keyPressed == 43 || keyPressed == 45 || keyPressed == 47)
// dis(" " + String.fromCharCode(event.charCode) + " ");
//else if (keyPressed == 46)
//  dis(String.fromCharCode(event.charCode));
//else if (keyPressed == 61 || keyPressed == 13)
//  solve();
//else if (keyPressed == 32)
//   clr();
//         });


function memstore() {
    var storage = document.getElementById("result").value;
    if ((storage.includes("+") || storage.substring(1).includes("-") || storage.includes("*") || storage.includes("/") || storage == "" || isNaN(storage)==true || storage.endsWith(".")))
        storage = "";
    else {
        localStorage.setItem("Storage", storage);
        document.getElementById("Mem").value = storage;
        //test
        //var _storage = document.createElement('pre');
        //_storage.textContent = storage;
        //var _storageDiv = document.getElementById("memhistory");
        //if (_storageDiv.firstChild === null)
           // document.getElementById("memhistory").appendChild(_storage);
        //else
           // document.getElementById("memhistory").insertBefore(_storage, _storageDiv.firstChild);
        document.getElementById("memhistory").innerHTML = storage + "<br/>" + document.getElementById("memhistory").innerHTML;
        document.getElementById("M+").disabled = false;
        document.getElementById("M-").disabled = false;
        document.getElementById("MR").disabled = false;
        document.getElementById("MC").disabled = false;        
    }
}

function recallmem() {
    var recallstorage = localStorage.getItem("Storage");
    document.getElementById("result").value = recallstorage;
}

function loadmem() {
    var recallstorage = localStorage.getItem("Storage");
    if (recallstorage !== null) {
        document.getElementById("Mem").value = recallstorage;
        document.getElementById("memhistory").innerHTML = recallstorage;
        document.getElementById("M+").disabled = false;
        document.getElementById("M-").disabled = false;
        document.getElementById("MR").disabled = false;
        document.getElementById("MC").disabled = false;
    }
}

function clearmem() {
    localStorage.clear();
    document.getElementById("Mem").value = null;
    document.getElementById("result").value = null;
    document.getElementById("memhistory").innerHTML = "";
    document.getElementById("M+").disabled = true;
    document.getElementById("M-").disabled = true;
    document.getElementById("MR").disabled = true;
    document.getElementById("MC").disabled = true;
    
}

function addtomem() {
    var recallstorage = localStorage.getItem("Storage");
    var addvalue = document.getElementById("result").value;
    var newmem = eval(Number(recallstorage) + Number(addvalue));
    localStorage.setItem("Storage", newmem);
    document.getElementById("Mem").value = newmem;
    document.getElementById("memhistory").innerHTML = newmem + "<br/>" + document.getElementById("memhistory").innerHTML;
    //var _storage = document.createElement('pre');
    //_storage.textContent = newmem;
    //var _storageDiv = document.getElementById("memhistory");
    //if (_storageDiv.firstChild === null)
     //   document.getElementById("memhistory").appendChild(_storage);
    //else
     //   document.getElementById("memhistory").insertBefore(_storage, _storageDiv.firstChild);
}

function subtractfrommem() {
    var recallstorage = localStorage.getItem("Storage");
    var subtractvalue = document.getElementById("result").value;
    var newmem = eval(Number(recallstorage) - Number(subtractvalue));
    localStorage.setItem("Storage", newmem);
    document.getElementById("Mem").value = newmem;
    document.getElementById("memhistory").innerHTML = newmem + "<br/>" + document.getElementById("memhistory").innerHTML;
    //var _storage = document.createElement('pre');
    //_storage.textContent = newmem;
    //var _storageDiv = document.getElementById("memhistory");
    //if (_storageDiv.firstChild === null)
     //   document.getElementById("memhistory").appendChild(_storage);
    //else
     //   document.getElementById("memhistory").insertBefore(_storage, _storageDiv.firstChild);
}

function percent() {
    let a = document.getElementById("result").value;
    b = a + "/100";
    c = eval(b)
    document.getElementById("result").value = c;
    document.getElementById("history").innerHTML += a + "%" + "=" + c +"<br/>";
}

function byX() {
    let a = document.getElementById("result").value;
    b = a + "**-1";       
    try {
        eval(b);
    }
    catch (e) {
        if (e instanceof SyntaxError) {
            alert(e.message);
            clearall();
        }
    }
    c = eval(b);
    console.log(c); 
    if (!isFinite(c)) {
        alert('Cannot divide by zero');
        clearall();
    }
    else {
        document.getElementById("result").value = c;
        document.getElementById("history").innerHTML += a + "**-1" + "=" + c + "<br/>";
    }
}

function sqr() {
    let a = document.getElementById("result").value;
    b = a + "**2";
    c = eval(b)
    document.getElementById("result").value = c;
    document.getElementById("history").innerHTML += a + "^2" + "=" + c + "<br/>";
}

function sqrrt() {
    let a = document.getElementById("result").value;
    b = a + "**0.5";
    c = eval(b)
    if (c instanceof SyntaxError) {
        alert(c.message);
        clearall();
    }
    document.getElementById("result").value = c;
    document.getElementById("history").innerHTML += a + "**0.5" + "=" + c + "<br/>";
}

