
< !DOCTYPE html >
    <html>
        <head>
            <link rel="stylesheet" href="style.css" type="text/css" />

            <script>

                var init = 0
                function dis(val)
            {
                    document.getElementById("result").value += val
                console.log(" This is an alert " + val) // Debug Statements
            }

            //function that evaluates the digit and return result
            function solve()
            {

                var x = document.getElementById("result").value

                let result = eval(x)
                if (!isFinite(result)) {
                    window.alert('Cannot divide by zero');
                    clr();
                } else if (result !== null) {
                    console.log(" Result of Calc.... " + result) // Debug Statements
                    document.getElementById("result").value = result
                    if (x.includes("+") || x.includes("/") || x.includes("-") || x.includes("*"))
                        document.getElementById("log").value += x + ' ' + ' = ' + result + '\n'
                    document.getElementById("result").value = ""
                    var tArea = document.getElementById('log');
                    tArea.scrollTop = tArea.scrollHeight;
                }
            }


            //function that clear the display
            function clr()
            {
                    document.getElementById("result").value = ""
                }
            function clrAll() {
                    clr();
                document.getElementById('log').value = ''
            }

            addEventListener("keypress", function (event) {

                var keyPressed = event.which || event.keyCode;

                if (keyPressed >= 48 && keyPressed <= 57)
                    dis(String.fromCharCode(event.charCode));
                else if (keyPressed == 42 || keyPressed == 43 || keyPressed == 45 || keyPressed == 47)
                    dis(" " + String.fromCharCode(event.charCode) + " ");
                else if (keyPressed == 46)
                    dis(String.fromCharCode(event.charCode));
                else if (keyPressed == 61 || keyPressed == 13)
                    solve();
                else if (keyPressed == 32)
                    clr();
            });

            function xSqr() {

                var curVal = document.getElementById("result").value;
                if (curVal !== "") {
                    var sqrVal = Math.pow(curVal, 2)
                    document.getElementById("log").value += 'sqr(' + curVal + ') = ' + sqrVal + '\n';
                    document.getElementById("result").value = '';
                }
            }
            function xRoot() {

                var curVal = document.getElementById("result").value;
                if (curVal !== "") {
                    var sqrVal = Math.sqrt(curVal)
                    document.getElementById("log").value += 'sqRoot(' + curVal + ') = ' + sqrVal + '\n';
                    document.getElementById("result").value = '';
                }
            }
            function byX() {
                var curVal = parseFloat(document.getElementById("result").value);
                if (curVal == 0) {
                    window.alert(" Can't be divided by Zero");
                    clr();
                } else if (curVal !== '') {
                    var byXVal = 1 / parseFloat(curVal);
                    document.getElementById("log").value += '1/(' + curVal + ') = ' + byXVal + '\n';
                    document.getElementById("result").value = '';
                }
            }
            function percent() {
                var curVal = parseFloat(document.getElementById("result").value);
                if (curVal == 0) {
                    window.alert(" Can't be divided by Zero");
                    clr();
                    document.getElementById("result").value = '';
                } else if (curVal !== '') {
                    var byXVal = parseFloat(curVal) / 100;
                    document.getElementById("log").value += curVal + ' / 100 = ' + byXVal + '\n';
                    document.getElementById("result").value = '';
                }

            }

            function mStore() {
                if (typeof (Storage) !== "undefined") {
                    var curVal = document.getElementById("result").value
                    if (curVal !== "") {
                    console.log('Current Value : ' + curVal);
                        window.localStorage.setItem('lastVal', curVal)
                        document.getElementById('mStore').value = curVal + "\n" + document.getElementById('mStore').value;
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
            function mRec() {
                if (typeof (Storage) !== "undefined") {
                    document.getElementById("result").value = window.localStorage.getItem('lastVal')
                }
            }
            function mPlus() {
                if (typeof (Storage) !== "undefined") {
                    var curVal = parseInt(document.getElementById("result").value);
                    var lastVal = parseInt(window.localStorage.getItem('lastVal'));
                    var result = eval(curVal + lastVal);
                    document.getElementById("result").value = result;
                    document.getElementById("mStore").value = result;
                    document.getElementById("log").value += result + ' + ' + lastVal + ' = ' + result + '\n'
                }
            }
            function mSub() {
                if (typeof (Storage) !== "undefined") {
                    var curVal = parseFloat(document.getElementById("result").value);
                    var lastVal = parseFloat(window.localStorage.getItem('lastVal'));
                    var result = eval(lastVal - curVal);
                    document.getElementById("result").value = result;
                    document.getElementById("mStore").value = result;
                    document.getElementById("log").value += lastVal + ' - ' + curVal + ' = ' + result + '\n'
                }
            }
        </script>

            <style>
                .box {

                    background - color:#d9d9d9;
                position:fixed;

                top:25%;
                left:25%;
            }
            .title{
                    margin - bottom: 10px;
                text-align:center;
                width: 210px;
                color: beige;
                /**        border: solid black 2px; **/
            }

            .numButton
            {
                    background - color: lightskyblue;
                color: white;
                font-weight: 900;

                font-weight: bolder
                    /**           border: solid black 2px; **/
                    width:100%
            }

            .symButton
            {
                    background - color: lightskyblue;
                color: black;
                font-weight: 900;
                align-content: center;
                font-weight: bolder

                    /**           border: solid black 2px; **/
                    width:100%
            }

            .resButton
            {
                    background - color: lightskyblue;
                color: greenyellow;
                font-weight: bolder
                    font-weight: 900;

                /**           border: solid black 2px; **/
                width:100%
            }

            input[type="text"]
            {
                    background - color: antiquewhite;
                /**            border: solid black 2px; **/
                width:100%
            }
        </style>
            <title>Simple Calculator</title>
            <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=30">
    </head>
                <body class="box" style="background-color: azure">
                    <table height="335px" border="2" style="display: inline-block; text-align: center;">
                        <tr>
                            <td >
                                <label> Memory Store </label>
                            </td>
                        </tr>
                        <tr rowspan='15'>
                            <td >
                                <textarea style="overflow-y: scroll;  height:auto;  text-align:right; " id="mStore" name="name" rows="15" cols="30" disabled >    </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input style='padding: 15px' type="button" value="Memory Clear" onclick="document.getElementById('mStore').value = ''" />
                            </td>
                        </tr>
                    </table>
                    <table height="100%" border="1" style="padding: 40px; display: inline-block; text-align: center;">
                        <tr style='padding: 80px'>
                            <td colspan="3" rowspan="2" style='padding: 20px'>
                                <input style="text-align: right" type="text" id="result" disabled />
                            </td>
                            <td>
                                <input class="clrButton" type="button" value="C" onclick="clr()" />
                            </td>
                        </tr>
                        <tr>
                            <td style='padding: 5px'>
                                <input class="clrButton" type="button" value="CE" onclick="clrAll()" />
                            </td>
                        </tr>
                        <tr >
                            <td><input class="symButton" style='background-color: grey;' type="button" id='MRec' value="MR" onclick="mRec()" disabled /> </td>
                            <td><input class="symButton" style='background-color: grey;' type="button" id='MPlus' value="M+" onclick="mPlus()" disabled /> </td>
                            <td><input class="symButton" style='background-color: grey;' type="button" id='MSub' value="M-" onclick="mSub()" disabled /> </td>
                            <td><input class="symButton" style='color: white;' type="button" id='MStore' value="MS" onclick="mStore()" /> </td>
                        </tr>
                        <tr >
                            <td><input class="symButton" type="button" value="%" onclick="percent()" /> </td>
                            <td><input class="symButton" type="button" value="1/x" onclick="byX()" /> </td>
                            <td><input class="symButton" type="button" value="x^​2" onclick="xSqr()" /> </td>
                            <td><input class="symButton" type="button" value="√x" onclick="xRoot()" /> </td>
                        </tr>
                        <tr >
                            <td><input class="numButton" type="button" value="7" onclick="dis('7')" /> </td>
                            <td><input class="numButton" onkeypress="dis('8')" type="button" value="8" onclick="dis('8')" /> </td>
                            <td><input class="numButton" type="button" value="9" onclick="dis('9')" /> </td>
                            <td><input class="symButton" type="button" value="/" onclick="dis('/')" /> </td>
                        </tr>
                        <tr >
                            <td><input class="numButton" type="button" value="4" onclick="dis('4')" /> </td>
                            <td><input class="numButton" type="button" value="5" onclick="dis('5')" /> </td>
                            <td><input class="numButton" type="button" value="6" onclick="dis('6')" /> </td>
                            <td><input class="symButton" type="button" value="-" onclick="dis('-')" /> </td>
                        </tr>
                        <tr>

                            <td><input class="numButton" type="button" value="1" onclick="dis('1')" /> </td>
                            <td><input class="numButton" type="button" value="2" onclick="dis('2')" /> </td>
                            <td><input class="numButton" type="button" value="3" onclick="dis('3')" /> </td>
                            <td><input class="symButton" type="button" value="*" onclick="dis('*')" /> </td>
                        </tr>
                        <tr >
                            <td><input class="numButton" type="button" value="0" onclick="dis('0')" /> </td>
                            <td><input class="symButton" type="button" value="." onclick="dis('.')" /> </td>
                            <td><input class="resButton" type="button" value="=" onclick="solve()" /> </td>
                            <td><input class="symButton" type="button" value="+" onclick="dis('+')" /> </td>
                        </tr>
                    </table>
                    <table height="335px" border="2" style="display: inline-block; text-align: center;">
                        <tr>
                            <td >
                                <label> Calculation History </label>
                            </td>
                        </tr>
                        <tr rowspan='15'>
                            <td >
                                <textarea style="overflow-y: scroll;  height:auto;  text-align:right; " id="log" name="name" rows="15" cols="30" disabled >    </textarea>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input style='padding: 15px' type="button" value="History Clear" onclick="clrAll()" />
                            </td>
                        </tr>
                    </table>
                </body>
</html>
