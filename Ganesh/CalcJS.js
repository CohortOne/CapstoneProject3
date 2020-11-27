function disp(val) {
    document.getElementById("answer").value+= val;
    }
function execute() {
	let x = document.getElementById("answer").value;
		if (x.includes('+') || x.includes('-') || x.includes ('*') || x.includes('/')) {
		let y = eval(x);
		document.getElementById("answer").value = y;
			console.log("correct");
			document.getElementById("Textlogs").innerHTML += x + ' = ' + y + '\n';
			document.getElementById("answer").value = "";
			let history = document.getElementById('Textlogs');
			history.scrollTop = history.scrollHeight;
	}
	else {
			window.alert("no signs");
			document.getElementById("answer").value = "";
	}
}

function erase() {
	document.getElementById("answer").value ="";
} 
function clrall() {
	erase();
	document.getElementById("Textlogs").value = "";
}
function clrallm() {
	document.getElementById("Memorylogs").value = "";
}

function ms() {
	if (typeof (Storage) !== "undefined") {
		var curVal = document.getElementById("answer").value
		if (curVal !== "") {
			console.log('Current Value : ' + curVal);
			window.localStorage.setItem('lastVal', curVal)
			document.getElementById('mStore').value = curVal + "\n" + document.getElementById('ms').value;
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