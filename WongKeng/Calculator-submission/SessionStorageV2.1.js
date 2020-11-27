// Code Written By: Wong Keng

function displayInMemoryArea(num) {
    //Display number saved in memory.

    document.getElementById("memoryLog").innerHTML = "\n" + num + document.getElementById("memoryLog").innerHTML;
}

function memoryAdd() {

    //check if Browser support Local or Session Storage features
    if (typeof(Storage) === "undefined") {

        alert("Sorry, your browser does not support Web Storage...");

    } else {

        //Function to add to memory

        //setup parameters to hold value from #displayAnswer

        let displayValue = document.getElementById("displayAnswer");

        //Test if there is currently a value in sessionStorage

        let newValue = sessionStorage.getItem("currentValue");

        //DEBUG USE
        // console.log("displayValue is " + displayValue.value + typeof(displayValue.value));
        // console.log("newValue is " + newValue + typeof(newValue));

        if (newValue == null) {

            //new entry

            newValue = displayValue.value;

            sessionStorage.setItem("currentValue", newValue);

            displayInMemoryArea(newValue);

        } else {
            var result = eval(newValue + "+" + displayValue.value);

            sessionStorage.setItem("currentValue", result);

            sessionStorage.setItem("previousValue", newValue);

            displayInMemoryArea(result);
        }
    }
}

function memorySubtract() {

    //check if Browser support Local or Session Storage features
    if (typeof(Storage) === "undefined") {

        alert("Sorry, your browser does not support Web Storage...");

    } else {

        //Function to subtract from memory

        //setup parameters to hold value from #displayAnswer

        let displayValue = document.getElementById("displayAnswer");

        //Test if there is currently a value in sessionStorage

        let newValue = sessionStorage.getItem("currentValue");


        //DEBUG USE
        // console.log("displayValue is " + displayValue.value + typeof(displayValue.value));
        // console.log("newValue is " + newValue + typeof(newValue));

        if (newValue == null) {

            //new entry and negate the value

            newValue = eval("(-1)*" + displayValue.value);

            sessionStorage.setItem("currentValue", newValue);

            displayInMemoryArea(newValue);

        } else {

            var result = eval(newValue + "+" + "(-1)*" + displayValue.value);

            sessionStorage.setItem("currentValue", result);

            sessionStorage.setItem("previousValue", newValue);

            displayInMemoryArea(result);
        }
    }
}

function memoryRecall() {

    //check if Browser support Local or Session Storage features
    if (typeof(Storage) === "undefined") {

        alert("Sorry, your browser does not support Web Storage...");

    } else {

        //Function to recall from memory

        //setup parameters to hold value from #displayAnswer

        let displayValue = document.getElementById("displayAnswer");

        //Test if there is currently a value in sessionStorage

        let newValue = sessionStorage.getItem("currentValue");

        //DEBUG USE
        console.log("displayValue is " + displayValue.value + typeof(displayValue.value));
        console.log("newValue is " + newValue + typeof(newValue));

        if (newValue == null) {

            //No previous number stored

            alert("Memory is Empty");

        } else {

            // Retrieve value and display in #displayAnswer
            displayValue.value = newValue;
        }
    }
}

function memoryClear() {

    //check if Browser support Local or Session Storage features
    if (typeof(Storage) === "undefined") {

        alert("Sorry, your browser does not support Web Storage...");

    } else {

        //Function to clear memory

        sessionStorage.removeItem("currentValue");
        sessionStorage.removeItem("previousValue");
        document.getElementById("memoryLog").innerHTML = "";

    }
}