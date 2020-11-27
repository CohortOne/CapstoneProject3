function getNumber(num) {
    document.getElementById('display').value += num //gets number from the buttons & displays it
}

function Clear() {
    document.getElementById('display').value = '' //clears display
   // window.alert(document.getElementById("display").value)
}

function clearTransLog() { //clears Transaction Log
    document.getElementById('TransLog').value = ''
}

function checkNum() { //check if it is valid number
    var input = document.getElementById("display").value
    if (input.includes('+') || input.includes('*') || input.includes('/')) {
        return true
    }  
}

function clearMemLog() { //clears Memory Log & disables the memory add, subtract & repeat buttons
    document.getElementById('MemoryLog').value = ''
    document.getElementById('Mr').disabled = true
    document.getElementById('M-').disabled = true
    document.getElementById('M+').disabled = true
}


function solveNumber() { //solves the user input & displays result
    var input = document.getElementById("display").value //stores the user input
    var result = eval(input)  //calculates the user input

    if (!isFinite(result)) {
        document.getElementById('display').value = "Error! Cannot divide by zero."
    } else if (result !== null) {
        document.getElementById('display').value = result //displays the calculation

    if (result != null && (input.includes("+") || input.includes("-") || input.includes("*") || input.includes("/")))
        document.getElementById('TransLog').value += input + ' ' + '=' + result + '\n'
    //Clear()
    var logArea = document.getElementById("TransLog")
        logArea.scrollTop = logArea.scrollHeight
    }
}

addEventListener("keypress", function (event) { //handler for keypress
    var keyPressed = event.which || event.keyCode 

    if ((keyPressed >= 48 && keyPressed <= 57) ||
        (keyPressed >= 96 && keyPressed <= 105)) {
        getNumber(String.fromCharCode(event.charCode))
    } else if (keyPressed == 42 || keyPressed == 43 || keyPressed == 45 || keyPressed == 47) {
        getNumber(" " + String.fromCharCode(event.charCode) + " ")
    } else if (keyPressed == 46) {
        getNumber(String.fromCharCode(event.charCode))
    } else if (keyPressed == 13) {     //enter
        solveNumber()
    } else if (keyPressed == 32) { //spacebar
        Clear()
        document.activeElement.blur()
    }
})

function memoryStore() {
    if (checkNum()) { //before storing, check if valid number
        document.getElementById('display').value = "This is not a number."
        return
    }
        if (typeof (Storage) !== "undefined" && !checkNum()) {       
        var currentVal = document.getElementById('display').value
            if (currentVal !== "") {
                //console.log('Current Value: ' + currentVal)
                window.localStorage.setItem('lastVal', currentVal)
                document.getElementById('MemoryLog').value = currentVal + "\n" + document.getElementById('MemoryLog').value
                document.getElementById('Mr').disabled = false
                document.getElementById('M-').disabled = false
                document.getElementById('M+').disabled = false
                Clear()
        }
    }
}

function memoryRepeat() { //displays the top value from the memory log to the display screen
    if (typeof (Storage) !== "undefined") {
        document.getElementById('display').value += window.localStorage.getItem('lastVal')
    }
}

function memoryPlus() { //add the top value in the memory log with the display input
    if (typeof (Storage) !== "undefined") {
        var currentVal = parseFloat(document.getElementById('display').value)
        var lastVal = parseFloat(window.localStorage.getItem('lastVal'))
        var result = eval(lastVal + currentVal)
        document.getElementById('display').value = result
        //document.getElementById('MemoryLog').value = result 
        document.getElementById('TransLog').value += lastVal + ' + ' + currentVal + ' = ' + result + '\n'
    }
}

function memorySub() { //subtract the top value in the memory log from the display input
    if (typeof (Storage) !== "undefined") {
        var currentVal = parseFloat(document.getElementById('display').value) //turn the display value into a float & store in currentVal
        var lastVal = parseFloat(window.localStorage.getItem('lastVal')) //turn the memory store value into a float & store in lastVal
        var result = eval(lastVal - currentVal)  
        document.getElementById('display').value = result  //assign the result to the display 
        //document.getElementById('MemoryLog').value = result
        document.getElementById('TransLog').value += lastVal + ' - ' + currentVal + ' = ' + result + '\n'
    }
}

function backSpace() { 
        var currentVal = document.getElementById('display').value  //assign display value to currentVal
        if (currentVal !== '') {  //if currentVal is not empty
            currentVal = currentVal.substr(0, eval(currentVal.length - 1))  //remove last value of the string.length
            document.getElementById('display').value = currentVal  //reassign currentVal to display
        }
}

addEventListener("keydown", function (event) {
    var keyDown = event.keyCode  //assign keycodes to keyDown
    if (keyDown == 08) {  //if keyDown is 'Backspace'
        backSpace()
    }
})