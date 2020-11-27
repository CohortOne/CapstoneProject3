// Code Written By: Wong Keng

function clearAll() {

    document.getElementById("displayAnswer").value = "";
    document.getElementById("transactLog").innerHTML = "";
    sessionStorage.removeItem("currentEntry");

}

function displayEntry(inputChar) {

    document.getElementById("displayAnswer").value += inputChar;
    // document.getElementById("transactLog").innerHTML += inputChar;

}

function computeResult(entry) {

    let enteredString = document.getElementById("displayAnswer").value;

    console.log("enteredString = " + enteredString);

    result = eval(enteredString);

    document.getElementById("displayAnswer").value = result;

    document.getElementById("transactLog").innerHTML += enteredString + " = " + result + "\n";
}

function sQuare() {
    //function to calculate square of a number

    var dataInput = document.getElementById("displayAnswer").value;

    //FOR DEBUG
    //console.log("From perCentage(), data entered is " + dataInput + " " + typeof(dataInput));

    if (dataInput != "") {

        let computeString = dataInput + "**2";

        var result = eval(computeString);

        document.getElementById("transactLog").innerHTML = computeString + " = " + result + "\n"; //print to Transaction Log

        document.getElementById("displayAnswer").value = result;

    } else {
        alert("Invalid data entered");
    }
}

function squareRoot() {
    //function to calculate square-root of a number

    var dataInput = document.getElementById("displayAnswer").value;

    //FOR DEBUG
    //console.log("From perCentage(), data entered is " + dataInput + " " + typeof(dataInput));

    if (dataInput != "") {

        let computeString = "SQRT(" + dataInput + ")";

        var result = eval(Math.sqrt(dataInput));

        document.getElementById("transactLog").innerHTML = computeString + " = " + result + "\n"; //print to Transaction Log

        document.getElementById("displayAnswer").value = result;

    } else {
        alert("Invalid data entered");
    }
}

function perCentage() {
    //function to calculate percent of a number

    var dataInput = document.getElementById("displayAnswer").value;

    //FOR DEBUG
    //console.log("From perCentage(), data entered is " + dataInput + " " + typeof(dataInput));

    if (dataInput != "") {

        let computeString = dataInput + "/100";

        var result = eval(computeString);

        document.getElementById("transactLog").innerHTML = computeString + " = " + result + "\n"; //print to Transaction Log

        document.getElementById("displayAnswer").value = result;

    } else {
        alert("Invalid data entered");
    }
}

function reciProcal() {
    //function to calculate reciprocal of a number

    var dataInput = document.getElementById("displayAnswer").value;

    //FOR DEBUG
    //console.log("From reciProcal(), data entered is " + dataInput + " " + typeof(dataInput));

    if (dataInput != "") {

        let computeString = "1/" + dataInput;

        var result = eval(computeString);

        document.getElementById("transactLog").innerHTML = computeString + " = " + result + "\n"; //print to Transaction Log

        document.getElementById("displayAnswer").value = result;

    } else {
        alert("Invalid data entered");
    }
}

function switchSign() {
    //function to switch the sign of a number (+/-)

    var dataInput = document.getElementById("displayAnswer").value;

    //FOR DEBUG
    //console.log("From reciProcal(), data entered is " + dataInput + " " + typeof(dataInput));

    if (dataInput != "") {

        let computeString = "-1*" + dataInput;

        var result = eval(computeString);

        document.getElementById("transactLog").innerHTML = computeString + " = " + result + "\n"; //print to Transaction Log

        document.getElementById("displayAnswer").value = result;

    } else {
        alert("Invalid data entered");
    }
}

function clearEntry() {
    //clear last entry

    let lastEntry = sessionStorage.getItem("currentEntry");

    console.log("lastEntry = " + lastEntry);

    //get current display string
    var displayString = document.getElementById("displayAnswer").value;

    //find index position of last entered entry (number or operator sign)

    // var lastIndex = displayString.lastIndexOf(lastEntry);
    var lastIndexLength = lastEntry.length;
    var displayStringLength = displayString.length;

    //remove last entry by replacing it with "" char

    document.getElementById("displayAnswer").value = displayString.substr(0, (displayStringLength - lastIndexLength));

    console.log("lastIndex = " + lastIndex + " and displayString length = " + displayStringLength);
    console.log("lastIndex type = " + typeof(lastIndex));

    //clear sessionStorage
    sessionStorage.removeItem("currentEntry");

}

function tempStore(num) {

    //temporary storage of input for use by Clear Entry function

    if (num === "+" || num === "-" || num === "/" || num === "*") {
        //replace currentEntry in sessionStorage

        sessionStorage.setItem("currentEntry", num);

    } else {

        var presentEntry = sessionStorage.getItem("currentEntry");

        if (presentEntry === "+" || presentEntry === "-" || presentEntry === "/" || presentEntry === "*") {
            sessionStorage.removeItem("currentEntry");
            presentEntry = "";

        }

        presentEntry = presentEntry + num;
        sessionStorage.setItem("currentEntry", presentEntry);

        console.log("presentEntry = " + presentEntry);

    }
}


addEventListener("keydown", function(e) {

    //Listen to key press

    if (e.key == 1 || e.key == 2 || e.key == 3 || e.key == 4 || e.key == 5 || e.key == 6 || e.key == 7 || e.key == 8 || e.key == 9 || e.key == 0 || e.key == "." || e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/" || e.key == "=") {

        if (e.key === "=") {
            computeResult(e.key);
        } else {
            displayEntry(e.key);
        }

    } else {
        alert("Please enter ONLY numeric keys, '., +, -, /, * or ='");
    }
});