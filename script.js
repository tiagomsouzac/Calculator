    //  variables  //

const buttons = document.querySelectorAll("#btn")
var res, n1, n2 = 0
var sum, minus, time, division, reset = false

    //  functions  //

// search point
function noPoint(numbers){
    const nums = numbers.value
    const n = nums.length

    //  verification
    for(let i = 0; i < n; i++){
        if(nums[i] == '.'){
            return false
        }
    }
    return true
}

//  math operations
function math(op, num){
    if(op == '+'){
        n2 = Number(num)
        n1 = n1 + n2
        n2 = 0
    } else if (op == '-'){
        n2 = Number(num)
        n1 = n1 - n2
        n2 = 0      
    } else if (op == 'x'){
        n2 = Number(num)
        n1 = n1 * n2
        n2 = 0
    } else {
        n2 = Number(num)
        n1 = n1 / n2
        n2 = 0
    }
    return n1
}

//  button click
function click(e){
    const value = e.target.innerText
    const display = document.querySelector("#NumberDisplay")

    //  display input
    var num = display.value 

    //  number input
    if (value != '=' && value != 'AC' && value != '-' && value != '+' && value != 'x' && value != '÷' && value != '.'){
        if(reset){
            display.value = ''
            reset = false
            display.value += value
        } else{
            display.value += value
        }
    } 

    // clear display input and values
    else if (value == 'AC') {
        display.value = ''
        n1 = 0
        n2 = 0
    }

    //  point
    else if(value == '.' && noPoint(display)){
        if(reset){
            display.value = ''
            reset = false
            display.value += value
        } else{
            display.value += value
        }
    }

    // doing operation
    else {
        //  operations
        switch (value){
            // sum
            case '+':
                if (sum){
                    math('+', num)
                    display.value = ''
                } else {                    
                    sum = true
                    if (time){
                        math('x', num)
                        time = false
                        display.value = ''
                    } else if (minus){
                        math('-', num)
                        minus = false
                        display.value = ''
                    } else if (division){
                        math('÷', num)
                        division = false
                        display.value = ''
                    }
                    else{
                        minus, time, division = false                    
                        n1 = Number(num)
                        display.value = ''
                    }
                }
                break
            //  minus
            case '-':
                if (minus){
                    math('-', display.value)
                    display.value = ''
                } else {
                    minus = true
                    if (sum){
                        math('+', num)
                        sum = false
                        display.value = ''
                    } else if (time){
                        math('x', num)
                        time = false
                        display.value = ''
                    } else if (division){
                        math('÷', num)
                        division = false
                        display.value = ''
                    }
                    else{
                        sum, time, division = false                    
                        n1 = Number(num)
                        display.value = ''
                    }
                }             
                break
            //  time
            case 'x':
                if (time){
                    math('x', display.value)
                    display.value = ''
                } else {
                    time = true
                    if (sum){
                        math('+', num)
                        sum = false
                        display.value = ''
                    } else if (minus){
                        math('-', num)
                        minus = false
                        display.value = ''
                    } else if (division){
                        math('÷', num)
                        division = false
                        display.value = ''
                    }
                    else{
                        minus, sum, division = false                    
                        n1 = Number(num)
                        display.value = ''
                    }
    
                }
                break
            // division
            case '÷':
                if (division){
                    math('÷', num)
                    display.value = ''
                } else {
                    division = true
                    if (time){
                        math('x', num)
                        time = false
                        display.value = ''
                    } else if (minus){
                        math('-', num)
                        minus = false
                        display.value = ''
                    } else if (sum){
                        math('+', num)
                        time = false
                        display.value = ''
                    }
                    else{
                        minus, time, sum = false                    
                        n1 = Number(num)
                        display.value = ''
                    }
                }
                break 
            //  equal
            case '=':
                //  sum
                if(sum){
                    res = math('+', num)
                    if (isNaN(res)){
                        display.value = 'ERRO'
                    } else{ 
                        display.value = res
                    }
                    reset = true
                    sum = false
                }
                //  minus
                if(minus){
                    res = math('-', num)
                    if (isNaN(res)){
                        display.value = 'ERRO'
                    } else{ 
                        display.value = res
                    }
                    reset = true
                    minus = false
                }
                //  time
                if(time){
                    res = math('x', num)
                    if (isNaN(res)){
                        display.value = 'ERRO'
                    } else{ 
                        display.value = res
                    }
                    reset = true
                    time = false
                }
                //  division
                if(division){
                    res = math('÷', num)
                    if (isNaN(res)){
                        display.value = 'ERRO'
                    } else{ 
                        display.value = res
                    }
                    reset = true
                    division = false
                }
                break  
        }
    }
}

    //  events  //

// button click
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault()
        click(e)
    })
})
