// Memory store Functions

function memstore() {
    if (typeof (Storage) !== "undefined") {
        var currentVal = document.getElementById("result").value
        if (currentVal !== "") {
            console.log('Current Value: ' + currentVal);
            window.localStorage.setItem('lastVal', currentVal);
            document.getElementById('memoryStoreViewer').value = currentVal + "\n" + document.getElementById('memoryStoreViewer').value;
            document.getElementById('memrecall').disabled = false;
            document.getElementById('memplus').disabled = false;
            document.getElementById('memminus').disabled = false;
            clr();
           
        }

    }
     
}

function memrecall() {
    if (typeof (Storage) !== "undefined") {
        document.getElementById("result").value = window.localStorage.getItem('lastVal')
    }

    }
    

function memplus() {
    if (typeof (Storage) !== "undefined") {
        var currentVal = parseInt(document.getElementById("result").value);
        var lastVal = parseInt(window.localStorage.getItem('lastVal'));
        var result = eval(lastVal + currentVal);
        document.getElementById("result").value = result;
        document.getElementById("memstore").value = result;
        document.getElementById("memoryStoreViewer").value += lastVal + '-' + currentVal + '=' + result + '\n'
    }
}
    
        



function memminus() {
    if (typeof (Storage) !== "undefined")
        var currentVal = parseFloat(document.getElementById("result").value);
    var lastVal = parseFloat(window.localStorage.getItem('lastVal'));
    var result = eval(lastVal - currentVal);
    document.getElementById("result").value = result;
    document.getElementById("memminus").value = result;
    document.getElementById("memoryStoreViewer").value += lastVal + '-' + currentVal + '=' + result + '\n'
}

function memreset() {
    if (typeof (Storage) !== "undefined")
        document.getElementById("memStoreViewer").value = ''
        clr();
  

}

  




