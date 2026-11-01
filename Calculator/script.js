const clearDiv = document.getElementById('clear')
const equationButton = document.getElementById('equation')
const outputDiv = document.getElementById('output')
const actionButtons = document.querySelectorAll('.values-buttons-actions')
const buttons = document.querySelectorAll('.values-buttons')
const percentageButton = document.getElementById('percentage')
const rubberButton = document.getElementById('rubber')

let actionButtonClicked = false
let operator = ""
let a = ""
let b = ""

const actualizeOutput = () => {
  outputDiv.innerText = `${a} ${operator} ${b}`
}

document.addEventListener('keydown', function(e) {
  if ((e.key / 1) == e.key || e.key == ".") {
    if (!actionButtonClicked) {
      a += e.key
      actualizeOutput()
    } else if (actionButtonClicked) {
      b += e.key
      actualizeOutput()
      return
    }
  } else if (e.key == '*' || e.key == "-" || e.key ==  "+" || e.key == "/") {
    if (!actionButtonClicked && a != "") {
      operator = e.key
      actualizeOutput()
      actionButtonClicked = true
    }
  } else if (e.code == "Enter") {
    console.log({a}, {b}, operator)
    if (a != "" && b != "") {
      const result = equation(a, b)
      a = result
      b = ""
      console.log(result)
    }
  } else if (e.code == "Backspace") {
    backspace()
  } else if (e.code == "Delete") {
    clear()
  } else {
    console.log('wrong value: ' + e.key)
    throw new Error('Wrong value')
  }
})
buttons.forEach(button => {
  button.onclick = () => {
    if (actionButtonClicked == true) {
      b += button.value
      actualizeOutput()
      return 
    } else if (!actionButtonClicked) {
      a += button.value
      actualizeOutput()
    }
    button.blur()
  }
}) 

const equation = (a, b) => {
  outputDiv.innerText = ""
  let result;
  const number1 = Number(a)
  const number2 = Number(b)
  if (operator == '+') {
    result = number1 + number2
  } else if (operator == "-") {
    result = number1 - number2
  } else if (operator == "/") {
    if (number2 == 0) {
      outputDiv.innerText = "Error"
      throw new Error('Dividing by 0 is impossible')
    }
    result = number1 / number2
  } else if (operator == "*") {
    result = number1 * number2
  }
  resultFixed = Math.floor(result * (10**9)) / (10**9)
  outputDiv.innerText = `${resultFixed}`
  operator = ""
  actionButtonClicked = false
  return resultFixed
} 

const root = (number) => {
  return Math.floor((number ** 0.5) * (10**9)) / (10**9)
}

const backspace = () => {
  if (!actionButtonClicked) {
    a = a.slice(0, -1)
    actualizeOutput()
  } else if (b.length == 0) {
    operator = ""
    actionButtonClicked = false
    actualizeOutput()
  } else if (actionButtonClicked) {
    b = b.slice(0, -1) 
    actualizeOutput()
  }
}

const clear = () => {
  outputDiv.innerText = ""
  a = ""
  b = ""
  operator = ""
  actionButtonClicked = false
}

equationButton.onclick = () => {
  console.log({a}, {b}, operator)
  if (a != "" && b != "") {
    const result = equation(a, b)
    a = result
    b = ""
    console.log(result)
  }
}

actionButtons.forEach(button => {
    button.onclick = () => {
      if (!actionButtonClicked && a != "") {
        operator = button.value
        actionButtonClicked = true
        actualizeOutput()
    }
    button.blur()
  }
})

clearDiv.onclick = () => {
  clear()
  clearDiv.blur()
}

percentageButton.onclick = () => {
    if (actionButtonClicked == false) {
      a = root(a)
      actualizeOutput()
    } else if (actionButtonClicked == true) {
      b = root(b)
      actualizeOutput()
  }
  percentageButton.blur()
}

rubberButton.onclick = () => {
    backspace()
    rubberButton.blur()
}