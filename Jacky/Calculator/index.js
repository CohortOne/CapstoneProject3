var inputs = document.getElementsByClassName('input')
var showInput = document.getElementById('showInput')
var calculate = document.getElementById('calculate')
var clear = document.getElementById('clear')
var historyContainer = document.getElementById('history')
var historyHead = document.getElementsByClassName('historyHead')[0]
var memoryHead = document.getElementsByClassName('memoryHead')[0]

var memoryContainer = document.getElementById('memoryContainer')
var memoryButtons = document.getElementsByClassName('memory')

var memoryArray = []

if (sessionStorage.getItem('memoryStorage') != null) {
    memoryArray = sessionStorage.getItem('memoryStorage').split(',')
        for (i=memoryArray.length-1; i != -1; i--) {
            memoryContainer.innerHTML = memoryContainer.innerHTML +
            `
                <div class="${memoryArray[i]} memoryContent">
                    <p>${memoryArray[i]}</p>
                    <div class="memoryButtonRow">
                        <span>MC</span>
                        <span>M+</span>
                        <span>M-</span>
                    </div>
                </div>
            `
        }
}


const reRenderMemory = () => {
    memoryContainer.innerHTML = ''
    for (i=memoryArray.length-1; i != -1; i--) {
        memoryContainer.innerHTML = memoryContainer.innerHTML +
        `
            <div class="memoryContent">
                <span class="arrayIndex">${i}</span>
                <p>${memoryArray[i]}</p>
                <div class="memoryButtonRow">
                    <span class="miniMC">MC</span>
                    <span class="miniM+">M+</span>
                    <span class="miniM-">M-</span>
                </div>
            </div>
        `   
    }
    console.log(memoryArray)

    var miniMC = document.getElementsByClassName('miniMC')
    Array.prototype.forEach.call(miniMC, miniButton => {
        var value = miniButton.parentElement.parentElement
        var index = miniButton.parentElement.previousElementSibling.previousElementSibling.innerHTML
        miniButton.addEventListener('click', () => {
            value.remove()
            memoryArray.splice(index, 1)
            sessionStorage.setItem('memoryStorage', memoryArray)
        })
    })

    var miniMplus = document.getElementsByClassName('miniM+')
    Array.prototype.forEach.call(miniMplus, miniButton => {
        var value = miniButton.parentElement.previousElementSibling.innerHTML
        var index = miniButton.parentElement.previousElementSibling.previousElementSibling.innerHTML
        miniButton.addEventListener('click', () => {
            if (showInput != '') {
                value = parseInt(value) + parseInt(showInput.innerHTML)
                memoryArray[index] = value
                sessionStorage.setItem('memoryStorage', memoryArray)
                reRenderMemory()
            }
        })
    })

    var miniMminus = document.getElementsByClassName('miniM-')
    Array.prototype.forEach.call(miniMminus, miniButton => {
        var value = miniButton.parentElement.previousElementSibling.innerHTML
        var index = miniButton.parentElement.previousElementSibling.previousElementSibling.innerHTML
        miniButton.addEventListener('click', () => {
            if (showInput != '') {
                value = parseInt(value) - parseInt(showInput.innerHTML)
                memoryArray[index] = value
                sessionStorage.setItem('memoryStorage', memoryArray)
                reRenderMemory()
            }
        })
    })

}

Array.prototype.forEach.call(memoryButtons, button => {
    button.addEventListener('click', () => {
        if (button.innerHTML == 'MS'){
            if (showInput.innerHTML != '') {
                var value = showInput.innerHTML
                memoryArray.push(value)
                sessionStorage.setItem('memoryStorage', memoryArray)

                var currentIndex = memoryArray.length - 1
                var memoryContent = `
                <div class="memoryContent">
                    <p id="${currentIndex}">${value}</p>
                    <div class="memoryButtonRow">
                        <span id="MC${currentIndex}">MC</span>
                        <span id="M+${currentIndex}">M+</span>
                        <span id="M-${currentIndex}">M-</span>
                    </div>
                </div>
                `
                
                memoryContainer.innerHTML = memoryContent + memoryContainer.innerHTML
            }
        }

        else if (button.innerHTML == 'MC') {
            memoryContainer.innerHTML = ''
            memoryArray = []
            sessionStorage.setItem('memoryStorage', memoryArray)
        } 
        
        else if (button.innerHTML == 'MR'){
            if (memoryArray.length > 0) {
                showInput.innerHTML = memoryArray[memoryArray.length-1]
            }
        }

        else if (showInput.innerHTML != '' && memoryArray.length > 0){
            if (button.innerHTML == 'M+'){
                var number = parseInt(memoryArray[memoryArray.length-1])
                var addition = parseInt(showInput.innerHTML)
                number += addition
                memoryArray[memoryArray.length-1] = number
                sessionStorage.setItem('memoryStorage', memoryArray)
                reRenderMemory()
            } else {
                var number = parseInt(memoryArray[memoryArray.length-1])
                var minus = parseInt(showInput.innerHTML)
                number -= minus
                memoryArray[memoryArray.length-1] -= showInput.innerHTML
                sessionStorage.setItem('memoryStorage', memoryArray)
                reRenderMemory()
            }
            
        }
    })
})

const clearAll = () => {
    showInput.innerHTML = ''
    historyContainer.innerHTML = ''
}

const calculateResult = () => {
    try {
        var result = eval(showInput.innerHTML)
        historyContainer.innerHTML = historyContainer.innerHTML + `${showInput.innerHTML} = ${result}` + '<br>'
        showInput.innerHTML = result.toLocaleString()
    } catch {
        showInput.innerHTML = 'Error'
    }
}

Array.prototype.forEach.call(inputs, input => {
    input.addEventListener('click', () => {
        showInput.innerHTML = showInput.innerHTML + input.innerHTML
    })
})

addEventListener('keydown', event => {   
    if (isNaN(event.key) == false){
        showInput.innerHTML = (showInput.innerHTML + event.key)
    } else if (event.key == '*' || event.key == '-' || event.key == '+' || event.key == '/') {
        showInput.innerHTML = (`${showInput.innerHTML}${event.key}`)
    } else if (event.key == '=' || event.key == 'Enter') {
        calculateResult()
    } else if (event.key == 'Backspace' || event.key == 'Delete') {
        clearAll()
    }

    if (showInput.innerHTML.length > 14) {
        showInput.innerHTML = 'Limit Exceeded'
    }
})

clear.addEventListener('click', clearAll)

calculate.addEventListener('click', calculateResult)

historyHead.addEventListener('click', () => {
    historyContainer.style.display = 'block'
    memoryContainer.style.display = 'none'
    memoryHead.classList.remove('activeHeader')
    historyHead.classList.add('activeHeader')
})

memoryHead.addEventListener('click', () => {
    historyContainer.style.display = 'none'
    memoryContainer.style.display = 'block'
    memoryHead.classList.add('activeHeader')
    historyHead.classList.remove('activeHeader')
})