Calculator.html
---
### Description
The display shown calculator screen and log screen. 
The calculator display consists of input digit buttons (`0`,`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`,`.`), 
operation symbol buttons (`%`, `/`, `*`, `-`, `+`, `=`), 
memory buttons consist of Memory Store `MS`, Memory Clear `MC`, Memory Recall `MR`,
Memory substraction `M-` and Memory addition `M+` and clear button `AC`.

The log screen will be display for first memory store, second memory store and 
history log for normal operation.

Input and operation buttons on screen can use keyboard (keypress).
Memory buttons will be `MC` ctrl^c, `MR` ctrl^r, `MS` ctrl^s, `M-` ctrl^m, `M+` ctrl^p.
Second memory buttons on log screen will be `m-` shift-m, `m+` shift-p. 
And Clear button `AC`  will be keypress "a". 

### Design Aspect
The calculator run on javascript.

The whole design based on the script. Hence, possible to run on the console.log.
Using the ascii code at keypress to manipulate operation.

After button or keypress, the function `myOpe(UniC)` will check for valid input. 
- for digit input will be store in  `valPre`;
- for operation symbol will direct to `myFuncE(lastCalSign)`;
- for memory `MS` will direct to `myFuncMem(UniC)`; and
- for all clear `AC` with reset the necessary var.

Script keys variable:    
- var `UniC` - the ascii code from addEventListener.  
- var `valPre` - for digits added
- var `valDis` - only for display at calculation screen, or console screen. 
- var `valBef` - actual result after the calculation operation done. 
- var `lastCalSign`` - store operation symbol after digits keyin. 
- function `myOpe(UniC)`: it collect the UnitC, and direct this UniC to other operation functions
- function `myFuncE()`: perform actual calculation from symbol `*`, `+`, `-`, `/` and `%`.
- function `myFuncMem()`: direct this code to other operation for memory `MS`, `MR`, `M-`, `M+`, `MC`, `m-` and `m+`.
- function `myFuncC()`: from html button onclick, which direct to myOpe().

html:
- Calculator tables of buttons using "grid-container" window.
- Buttons onclick function `myOpe(nn)`, where `nn` is the ascii code.
- Log window using absolute and relative boxes.

### Test scenarios
1. Test for basic digit (0 to 9) operation and decimals (.) by pressing on the button, or keyboard. 
2. Test for  'AC' or keypress `a` button to clear the screen.
3. Test for plus calculation, `4` `+` `2` `=`, result will be 6. Shown on the history log.
4. Test for minus calculation `4` `-` `2` `=`, result will be 2.
5. Test for multiplcation `4` `*` `2` `=`, result will be 8.
6. Test for division `4` `/` `2` `=`, result will be 2.
7. Test for percentage `4` `%` `*` `2` `=` display shown will be 0.08.
8. Test for Memory store, from 0.08 press `MS`, memory will be store, shown first memory display 0.08.
9. Test for Memory addition, `8` `M+`, memory display 8.08.
10. Test for Memory substration, `8` `M-`, memory display -7.92.
11. Test for second memory, from display 8, enter `MS`, the -7.92 will be move to second memory.
12. Test for 2nd Memory addition, from display 8 `m+`, memory display 16.08.
13. Test for 2nd Memory substration, display 88 `m+`, memory display -71.92.
14. Test for to add value from memory to display. keyin 123 `+` `MR`, display will be shown 131.

### Issues yet to resolve
- Show error, "NaN" on double press of  `*`, `-`, or `+`.
- Show error, "NaN" Input button(s) follow by `=`.  
- `+/-` not added, conversion to opposite value.

### Scope for improvement
- Any errors need to resolve otherwise to be proper display.
- Add button to clear History Log 
- Add backspace button to erase last digit keyin.
- Improve cosmetics look.
- Flexi screen for all devices.
