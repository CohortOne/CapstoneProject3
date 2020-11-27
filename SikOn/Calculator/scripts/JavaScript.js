const intMaxDigit = 8;
var numRegister = 0.0

/* ************************************************************** */
/* Design principals:
 * 1. This is a simulation of a simple portable calculation.
 * 2. Perform instantaneous validations so that users are not able to input anything invalid.
 * 3. Log all the calculations performed with clarity.
 * 4. Log all memory store/recall/clear/add/subtract operations.
 * 5. Perform reciprocal, square, and square root operations.
 * Design basics:
 * 1. The computation is supported by these four elements:
 *    - Display: this is same as the LCD display found on calculators.  It is an area for input
 *               as well for display of computation results.
 *    - Register: this is a temporarily storage.  After entering a number of Display, the user 
 *                will press an operation button ([+],[-],[*],[/]).At this point, the value on Display
 *                will be copied to Register.  The Display will remain the same.
 *    - Shadow: Refer to the above, when an operation button is pressed, and the value on Display
 *              is copied to Register, the Display remains unchanged.   However, this nature of the
 *              Display has changed.  For example, if Display currently shows "123", by pressing
 *              the button "4", user would expect Display to become "1234".  However, if user 
 *              pressed "123+", 123 would appear on Display as well be be stored in Register.  Now
 *              if the user proceed to press "4", the Display would change into "4" instead.
 *              This Shadow flag is an indicator that what's on display is a shadow of earlier 
 *              operation, and any subsequent key should clear it and start all over again.  This
 *              is true but for these exception: [Back space], [+/-], [%], which will reset the
 *              Shadow flag and continue to use the Display without clearing it.  The value in 
 *              Shadow Display is also accepted for instant operations ([%], [1/x], [square], [sqrt]).
 *    - Oper: Refer to description on Register, when an operation button is pressed, besides copying
 *              the value on Display to Register, the operation is also saved into Oper, so as the
 *              complete the computation with the next value is entered.
 *    Register, Shadow, and Oper are hidden. They can be revealed by pressing the [\] key on the 
 *              keyboard.  Press one more time will hide them again.  This feature is users
 *              to see more of the computation process, as well as to aid in testing/debugging.
 * 2. 
 * Future enhancements:
 * 1. To make the keypad look nicer, and be able to handle more keyPressed. Copy model from the beautiful works of some other students
 * 2. Add a functin to read key-strokes from a text file in a controlled manner.  This will facilitate repeated testing.
 * 2. To handle computation of square and sqrt to become more like that of %, meaning to withhold compuation until more complete input.
 * 3. To better control the computation accuracies by controlling the number of digits for input and output
 */

function trimCalcResult(strNumExpression) {
	// to trim the numeric value represented into no more than intMaxDigit digits
	// for future enhancement
	return strNumExpression;
}


function jsButtClear(charClear) {
    var myHandleDisplay = document.getElementById("frmtDisplay");
    var myHandleOper = document.getElementById("frmtOper");
    var myHandleShadow = document.getElementById("frmtShadow");
    var myHandleRegister = document.getElementById("frmtRegister");
	myHandleDisplay.value = "0";
	myHandleShadow.value = "";
	if (charClear == "A") {
		myHandleDisplay.value = "0";
		myHandleOper.value = "";
		myHandleRegister.value = "";
	}
}



function jsButtBS() {  // back space
    var myHandleDisplay = document.getElementById("frmtDisplay");
    var myHandleShadow = document.getElementById("frmtShadow");
    var strDisplay = myHandleDisplay.value;
    var strShadow = myHandleShadow.value;
    var strDisplaynew = strDisplay;
    if (strShadow == "Y") {
        myHandleShadow.value = "";
    }
    if (strDisplay.length == 1) {
        strDisplaynew = "0";
        myHandleDisplay.value = strDisplaynew;
        return;
    }
    if (strDisplay == "-0") {
        strDisplaynew = "0";
        myHandleDisplay.value = strDisplaynew;
        return;
    }
	if (strDisplay[strDisplay.length - 1] == "%") {
		strDisplaynew = strDisplay.substr(0, strDisplay.length - 1);
		myHandleDisplay.value = strDisplaynew;
		return;
	}
    if ((myHandleDisplay.length == 2) && (strDisplay[0] == "-")) {
        strDisplaynew = strDisplay.slice(1);
        myHandleDisplay.value = strDisplaynew;
        return;
    }
    strDisplaynew = strDisplay.substr(0,strDisplay.length-1);
    myHandleDisplay.value = strDisplaynew;
}



function jsButtDigit(charDigit) {  // handles digit [0..9] input
    var myHandleDisplay = document.getElementById("frmtDisplay");
    var myHandleShadow = document.getElementById("frmtShadow");
    var strDisplay = myHandleDisplay.value;
    var strShadow = myHandleShadow.value;
    var strDisplaynew = strDisplay;
	var intDigitsAllowed = intMaxDigit;
	if (strShadow == "Y") {
		strDisplaynew = charDigit;
		myHandleDisplay.value = strDisplaynew;
		myHandleShadow.value = "";
		return;
	}
	if (strDisplay.indexOf("%") >= 0) {
		var x = document.getElementById("myAudio");
		x.play();
		return;
    }
    if (strDisplay == "0") {
        strDisplaynew = charDigit;
        myHandleDisplay.value = strDisplaynew;
        return;
    }
    if (strDisplay == "-0") {
            strDisplaynew = "-" + charDigit;
        myHandleDisplay.value = strDisplaynew;
        return;
    }

    if (strDisplay.indexOf("-") >= 0) { intDigitsAllowed = intDigitsAllowed + 1; } 
    if (strDisplay.indexOf(".") >= 0) { intDigitsAllowed = intDigitsAllowed + 1; } 
    if (strDisplay.length == intDigitsAllowed) {
        strDisplaynew = strDisplay;
        myHandleDisplay.value = strDisplaynew;
        alert("Only up to " + intMaxDigit + " digits allowed!")
        return; 
        }
    strDisplaynew = strDisplay + charDigit;
    myHandleDisplay.value = strDisplaynew;
}


function jsButtPeriod(charDigit) {  // handles decimal point [.] 
    var myHandleDisplay = document.getElementById("frmtDisplay");
    var myHandleShadow = document.getElementById("frmtShadow");
    var strDisplay = myHandleDisplay.value;
    var strShadow = myHandleShadow.value;
    var strDisplaynew = strDisplay;
    var intDigitsAllowed = intMaxDigit;

	if (strShadow == "Y") {
		strDisplaynew = "0.";
		myHandleDisplay.value = strDisplaynew;
		myHandleShadow.value = "";
		return;
	}

	if (strDisplay[strDisplay.length - 1] == "%") {
		var x = document.getElementById("myAudio");
		x.play();
		return;
	}

    if (strDisplay.indexOf(".") >= 0) {
        strDisplaynew = strDisplay;
        myHandleDisplay.value = strDisplaynew;
        alert("Duplicated decimal point not allowed!")
        return;
    }
	if (strDisplay[0] == "-") { intDigitsAllowed = intDigitsAllowed + 1; }
    if (strDisplay.length == intDigitsAllowed) {
        strDisplaynew = strDisplay;
        myHandleDisplay.value = strDisplaynew;
        alert("Only up to " + intMaxDigit + " digits allowed!")
        return;
    }
    strDisplaynew = strDisplay + charDigit;
    myHandleDisplay.value = strDisplaynew;
}


function jsButtFLIP() {  // handles positive/negative sign flip
    var myHandleDisplay = document.getElementById("frmtDisplay");
    var myHandleShadow = document.getElementById("frmtShadow");
    var strDisplay = myHandleDisplay.value;
    var strShadow = myHandleShadow.value;
    var strDisplaynew = strDisplay;

    if (strShadow == "Y") {
        myHandleShadow.value = "";
    }

    if (strDisplay[0] == "-") {
        strDisplaynew = strDisplay.slice(-(strDisplay.length - 1));
    }
    else {
        strDisplaynew = "-" + strDisplay
    }
    myHandleDisplay.value = strDisplaynew;
}



function jsButtOPER(charOPER) {  // handles arithmatic operations
    var myHandleDisplay  = document.getElementById("frmtDisplay");
    var myHandleOper     = document.getElementById("frmtOper");
    var myHandleRegister = document.getElementById("frmtRegister");
    var myHandleShadow     = document.getElementById("frmtShadow");
    var myHandleCLog      = document.getElementById("frmtCLOG");

    var strDisplay    =  myHandleDisplay.value;
    var strOper       =     myHandleOper.value;
    var strRegister   = myHandleRegister.value;
    var strShadow = myHandleShadow.value;
    var strLogEntry = "";
	var strDisplaynew = strDisplay;

	var numRegister = 0.0;
	if (strRegister[strRegister.length - 1] == "%") {
		numRegister = eval(strRegister.substr(0, strRegister.length - 1)) / 100;
	}
	else {
		numRegister = eval(strRegister);
	}
	var numDisplay = 0.0;
	if (strDisplay[strDisplay.length - 1] == "%") {
		numDisplay = eval(strDisplay.substr(0, strDisplay.length - 1)) / 100;
	}
	else {
		numDisplay = eval(strDisplay);
	}


    if (strOper == "") { 
		if (charOPER == "=") {
			var x = document.getElementById("myAudio");
			x.play();
		}
		else {
			var t = document.createTextNode(strLogEntry);
			strLogEntry = strDisplay + "\n";
			myHandleCLog.appendChild(t);
			myHandleRegister.value = strDisplaynew;
			myHandleShadow.value = "Y";
			myHandleOper.value = charOPER;
			var t = document.createTextNode(strLogEntry);
			myHandleCLog.appendChild(t);
			myHandleCLog.scrollTop = myHandleCLog.scrollHeight;
		}
		return;
	}

    var numResult = 0.0;
	if ((strOper == "/") && (numDisplay == 0)) {
		alert("Division by 0 is invalid.");
		return;
	}

	if ((strDisplay[strDisplay.length - 1] == "%") && ((strOper == "+") || (strOper == "-"))) {
		strLogEntry = strOper + " " + strDisplay + " of (" + strRegister + ") => ";
		numResult = numRegister * numDisplay;
		strNumResult = "" + numResult;
		strLogEntry = strLogEntry + strNumResult;
		strRegister = "" + numRegister;
		numResult = eval(strRegister + strOper + "(" + strNumResult + ")");
		strNumResult = "" + numResult;
		strDisplaynew = trimCalcResult(strNumResult);
		if (charOPER == "=") {
			strLogEntry = strLogEntry + "\n" + "=" + strDisplaynew + "\n" + "\n";
		}
		else {
			strLogEntry = strLogEntry + " = " + strDisplaynew + "\n";
        }
		var t = document.createTextNode(strLogEntry);
		myHandleCLog.appendChild(t);
		myHandleCLog.scrollTop = myHandleCLog.scrollHeight;

		myHandleRegister.value = strDisplaynew;
		myHandleDisplay.value = strDisplaynew;
		myHandleShadow.value = "Y";
		if (charOPER == "=") {
			myHandleOper.value = ""
		}
		else {
			myHandleOper.value = charOPER;
        }
		return;
	}


	if ((strDisplay[strDisplay.length - 1] == "%") && ((strOper == "*") || (strOper == "/"))) {
		strLogEntry = strOper + " " + strDisplay;
		strRegister = "" + numRegister;
		strDisplay = "" + numDisplay;
		numResult = eval(strRegister + strOper + "(" + strDisplay + ")");
		strNumResult = "" + numResult;
		strDisplaynew = trimCalcResult(strNumResult);
		if (charOPER == "=") {
			strLogEntry = strLogEntry + "\n" + "=" + strDisplaynew + "\n" + "\n";
		}
		else {
			strLogEntry = strLogEntry + " = " + strDisplaynew + "\n";
		}
		var t = document.createTextNode(strLogEntry);
		myHandleCLog.appendChild(t);
		myHandleCLog.scrollTop = myHandleCLog.scrollHeight;

		myHandleRegister.value = strDisplaynew;
		myHandleDisplay.value = strDisplaynew;
		myHandleShadow.value = "Y";
		if (charOPER == "=") {
			myHandleOper.value = ""
		}
		else {
			myHandleOper.value = charOPER;
		}
		return;
	}

	strRegister = "" + numRegister;
	numResult = eval("(" + strRegister + ")" + strOper + "(" + strDisplay + ")");
	var strNumResult = "" + numResult;
	strDisplaynew = trimCalcResult(strNumResult);
	strLogEntry = strOper + " " + strDisplay;
	if (charOPER == "=") {
		strLogEntry = strLogEntry + "\n" + " = " + numResult + "\n\n";
	}
	else {
		strLogEntry = strLogEntry + " = " + numResult + "\n";
	}

    var t = document.createTextNode(strLogEntry);
    myHandleCLog.appendChild(t);
	myHandleCLog.scrollTop = myHandleCLog.scrollHeight;

    myHandleRegister.value = strDisplaynew;
    myHandleDisplay.value = strDisplaynew;
	// Shadow is set to Y when there is a calculation result on the Display.  This calculation result is
    // generated from any operation (+,-,*,/,=,%,1/x,sq(x),sqrt(x).
    // That results is placed on Display and can be reused.
	// Shadow is set to Y when there is a calculation result in the Display that can be reused.
	// Re-use is enabled for these buttons only, which will clear the Shadow flag unless specified otherwise:
	// M*: MS, M+, M-: will cause the Display to be applied to the momoey, and Shadown flag remains on.
	// MC: Memoey content is cleared, and Shadown flag remains on.
	// MR: Memoey content is recalled into Display, and Shadown flag sets to on.
	// BS: remove trailing digit, and Display becomes current input
	// +/-: flips the sign of the value on Display.
	// Other keys will simply ignore the value on Display and start inputing to Display from the beginning.
	myHandleShadow.value = "Y";
    myHandleOper.value = charOPER;
    if (charOPER == "=") {
        myHandleOper.value = "";
        myHandleRegister.value = "";
    }
}




function jsButtIOPER(charOPER) {  // handles instant operations: %, 1=reciprocal, 2=square, 3=square root
    var myHandleDisplay  = document.getElementById("frmtDisplay");
    var myHandleOper     = document.getElementById("frmtOper");
    var myHandleRegister = document.getElementById("frmtRegister");
    var myHandleShadow     = document.getElementById("frmtShadow");
    var myHandleCLog      = document.getElementById("frmtCLOG");

    var strDisplay    =  myHandleDisplay.value;
    var strOper       =     myHandleOper.value;
    var strRegister   = myHandleRegister.value;
    var strShadow = myHandleShadow.value;
    var strLogEntry = "";
	var numResult = 0.0;
	var strNumResult = "";

    var strDisplaynew = strDisplay;

	if (charOPER == "1") {  // handle reciprocal
		if (strDisplay[strDisplay.length - 1] == "%") {
			numResult = eval(strDisplay.substr(0, strDisplay.length - 1)) / 100;
		}
		else {
			numResult = eval(strDisplay);
		}
		if (numResult == 0) {
			alert("Cannot reciprocate a 0.");
			return;
		}
		numResult = 1 / numResult;
		strNumResult = "" + numResult;
		strDisplaynew = trimCalcResult(strNumResult);
		if (strOper == "") {
			strLogEntry = "1/" + strDisplay + "\n" + "= " + strDisplaynew + "\n\n";
		}
		else {
			strLogEntry = "[1/(" + strDisplay + ")] => " + strDisplaynew;
			numResult = eval(strRegister + strOper + "(" + strNumResult + ")");
			strNumResult = "" + numResult;
			strDisplaynew = trimCalcResult(strNumResult);
			strLogEntry = strOper + " " + strLogEntry + "\n" + "= " + strDisplaynew + "\n\n";
		}
		var t = document.createTextNode(strLogEntry);
		myHandleCLog.appendChild(t);
		myHandleCLog.scrollTop = myHandleCLog.scrollHeight;

		myHandleRegister.value = "";
		myHandleDisplay.value = strDisplaynew;
		myHandleShadow.value = "Y";
		myHandleOper.value = "";
		return;
	}

	if (charOPER == "2") {  // handle square
		if (strDisplay[strDisplay.length - 1] == "%") {
			numResult = eval(strDisplay.substr(0, strDisplay.length - 1)) / 100;
		}
		else {
			numResult = eval(strDisplay);
		}
		numResult = numResult * numResult;
		strNumResult = "" + numResult;
		strDisplaynew = trimCalcResult(strNumResult);
		if (strOper == "") {
			strLogEntry = "square(" + strDisplay + ")" + "\n" + "= " + strDisplaynew + "\n" + "\n";
		}
		else {
			strLogEntry = "[square(" + strDisplay + ")] => " + strDisplaynew;
			numResult = eval(strRegister + strOper + "(" + strNumResult + ")");
			strNumResult = "" + numResult;
			strDisplaynew = trimCalcResult(strNumResult);
			strLogEntry = strOper + " " + strLogEntry + "\n" + "= " + strDisplaynew + "\n" + "\n";

			myHandleRegister.value = "";
			myHandleOper.value = "";
		}
		myHandleDisplay.value = strDisplaynew;
		myHandleShadow.value = "Y";
		var t = document.createTextNode(strLogEntry);
		myHandleCLog.appendChild(t);
		myHandleCLog.scrollTop = myHandleCLog.scrollHeight;
		return;
	}

	if (charOPER == "r") {  // handle square root
		numResult = eval(strDisplay);
		if (numResult < 0) {
			alert("Cannot compute square root for negative numbers.");
			return;
		}
		numResult = Math.sqrt(numResult);
		strNumResult = "" + numResult;
		strDisplaynew = trimCalcResult(strNumResult);
		if (strOper == "") {
			strLogEntry = "[sqrt(" + strDisplay + ")]" + "\n" + "= " + strDisplaynew + "\n" + "\n";
		}
		else {
			strLogEntry = "[sqrt(" + strDisplay + ")] => " + strDisplaynew;
			numResult = eval(strRegister + strOper + "(" + strNumResult + ")");
			strNumResult = "" + numResult;
			strDisplaynew = trimCalcResult(strNumResult);
			strLogEntry = strOper + strLogEntry + "\n" + "= " + strDisplaynew + "\n" + "\n";

			myHandleRegister.value = "";
			myHandleOper.value = "";
		}
		myHandleDisplay.value = strDisplaynew;
		myHandleShadow.value = "Y";
		var t = document.createTextNode(strLogEntry);
		myHandleCLog.appendChild(t);
		myHandleCLog.scrollTop = myHandleCLog.scrollHeight;
		return;
	}


	if (charOPER == "%") {  // handle percent
		if (strDisplay[strDisplay.length - 1] == "%") {
			var x = document.getElementById("myAudio");
			x.play();
		}
		else {
			myHandleDisplay.value = myHandleDisplay.value + "%"

        }
		return;
	}
	
}





function jsButtMem(charMOPR) {  // handles Memory operations: MS, MC, MR, M+, M-
    var myHandleMemory  = document.getElementById("frmtMemory");
    var myHandleDisplay  = document.getElementById("frmtDisplay");
    var myHandleOper     = document.getElementById("frmtOper");
    var myHandleRegister = document.getElementById("frmtRegister");
    var myHandleShadow     = document.getElementById("frmtShadow");
    var myHandleMLog      = document.getElementById("frmtMLOG");

    var strMemory    =  myHandleMemory.value;
    var strDisplay    =  myHandleDisplay.value;
    var strOper       =     myHandleOper.value;
    var strRegister   = myHandleRegister.value;
    var strShadow = myHandleShadow.value;
    var strLogEntry = "";
	var numResult = 0.0;
	var strNumResult = "";

    var strDisplaynew = strDisplay;

	if (charMOPR == "S") {  // handle Memory store
		strLogEntry = "Stored --> " + strDisplay + "\n";
		myHandleMemory.value = strDisplay;
		myHandleShadow.value = "Y";
		var t = document.createTextNode(strLogEntry);
		myHandleMLog.prepend(t);
		// myHandleMLog.appendChild(t);
		// myHandleMLog.scrollTop = myHandleMLog.scrollHeight;

		return;
	}

	if (charMOPR == "C") {  // handle Memory clear
		strLogEntry = "Cleared --> " + "\n";
		myHandleMemory.value = "";
		var t = document.createTextNode(strLogEntry);
		myHandleMLog.prepend(t);
		return;
	}

	if (charMOPR == "R") {  // handle Memory recall
		if (strMemory == "") {
			var x = document.getElementById("myAudio");
			x.play();
		}
		else {
		strLogEntry = "Recalled <-- " + strMemory + "\n";
		var t = document.createTextNode(strLogEntry);
		myHandleMLog.prepend(t);
		myHandleDisplay.value = strMemory;
		}
		return;
	}


	if ((charMOPR == "+") || (charMOPR == "-")) {  // handle Memory add/subtract
		numResult = eval(strMemory + charMOPR  + "(" + strDisplay + ")");
		strNumResult = "" + numResult;
		strMemory = trimCalcResult(strNumResult);
		strLogEntry = charMOPR + " " + strDisplay + " --> " + strMemory + "\n";

		var t = document.createTextNode(strLogEntry);
		myHandleMLog.prepend(t);
		myHandleMemory.value = strMemory;
		myHandleShadow.value = "Y";
		return;
	}
	
}



function jsButtSLOG(charLogInd) {
    var myHandleCLog = document.getElementById("frmtCLOG");
	var myHandleMLog = document.getElementById("frmtMLOG");
	var strHeight = "";
	strHeight = myHandleMLog.style.height;  // height in "nnnpx"
	var heightMLog = parseInt(strHeight.substr(0, strHeight.length - 2));
	strHeight = myHandleCLog.style.height;  // height in "nnnpx"
	var heightCLog = parseInt(strHeight.substr(0, strHeight.length - 2));
	let preferredCLogHeight = 280;

	if (charLogInd == "C") {  //show calculation log
		if (myHandleCLog.hidden) {
			myHandleCLog.hidden = false;
			if (myHandleMLog.hidden == false) {
				if ((heightMLog + preferredCLogHeight) > heightCLog) {
					heightCLog = heightMLog + preferredCLogHeight;
					myHandleCLog.style.height = heightCLog + "px";
				}
				else {
					heightMLog = heightCLog - preferredCLogHeight;
					myHandleMLog.style.height = heightMLog + "px";
				}
			}
		}
		else {
			myHandleCLog.hidden = true;
		}
    }
	if (charLogInd == "M") {  //show memory log
		if (myHandleMLog.hidden) {
			myHandleMLog.hidden = false;
			if (myHandleCLog.hidden == false) {
				if ((heightMLog + preferredCLogHeight) > heightCLog) {
					heightCLog = heightMLog + preferredCLogHeight;
					myHandleCLog.style.height = heightCLog + "px";
				}
				else {
					heightMLog = heightCLog - preferredCLogHeight;
					myHandleMLog.style.height = heightMLog + "px";
                }
            }
		}
		else {
			myHandleMLog.hidden = true;
			heightCLog = heightCLog - heightMLog;
			if (heightCLog < preferredCLogHeight) {
				heightCLog = preferredCLogHeight;
			}
			myHandleCLog.style.height = heightCLog + "px";
        }
    }

}


function jsShowMore() {
	var lst = document.getElementsByClassName("hidden");
	if (lst.length == 0) {
		document.getElementById("thRegister").classList.add("hidden");
		document.getElementById("thOper").classList.add("hidden");
		document.getElementById("thShadow").classList.add("hidden");
	}
	else {
		document.getElementById("thRegister").classList.remove("hidden");
		document.getElementById("thOper").classList.remove("hidden");
		document.getElementById("thShadow").classList.remove("hidden");
	}
}



addEventListener("keypress", function (event) {
    var keyPressed = event.which || event.keyCode;
    switch (keyPressed) {
        case 13: jsButtOPER('='); break;
        case 37: jsButtIOPER('%'); break;
        case 43: jsButtOPER('+'); break;
        case 45: jsButtOPER('-'); break;
        case 42: jsButtOPER('*'); break;
        case 46: jsButtPeriod('.'); break;
        case 47: jsButtOPER('/'); break;
        case 13: jsButtOPER('='); break;
        case 61: jsButtOPER('='); break;
        case 48: jsButtDigit('0'); break;
        case 49: jsButtDigit('1'); break;
        case 50: jsButtDigit('2'); break;
        case 51: jsButtDigit('3'); break;
        case 52: jsButtDigit('4'); break;
        case 53: jsButtDigit('5'); break;
        case 54: jsButtDigit('6'); break;
        case 55: jsButtDigit('7'); break;
        case 56: jsButtDigit('8'); break;
        case 57: jsButtDigit('9'); break;
        case 67: jsButtAC(); break;
		case 99: jsButtAC(); break;
		case 92: jsShowMore(); break; // back slash toggles show more
		default: alert("I don't recognize the command " + keyPressed);
    }

})


