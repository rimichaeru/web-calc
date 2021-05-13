// ans shows if there was a previous computation
let ans = "";
let newOp = true;

const ansView = document.querySelector(".calc__display__ansView");
ansView.value = "0";

const view = document.querySelector(".calc__display__view");
view.value = "0";


const zero_clear = (clr=false) => {
  if (clr == false) {
    if (view.value == "0") {
      view.value = "";
    } else {
      if (newOp == true) {
        view.value = "";
      }
    }                                     
  } else {
    view.value = "0";
    newOp = true;
  }
}

const start_op = () => {
  newOp = false;
}

const non_digit_replacer = (subt=false) => {
  // also checks for decimals
  
  if (/[a-z]/gi.test(view.value)) {
    view.value = "";
  }
  
  if (subt == true) {
    regEx = /[\d.)-]/g
  } else {
    regEx = /[\d).]/g
  }

  if (regEx.test(view.value[view.value.length-1]) == false) {
    view.value = view.value.slice(0, -1);
  }
}

const compute = () => {
  try {
    const answer = eval(view.value);

    if (view.value.length > 10) {
      ansView.value = view.value.slice(0,10) + "...: " + answer;
    } else {
      ansView.value = view.value + ": " + answer;
    }

    // truncate if too long
    if (ansView.value.length > 32) {
      ansView.value = ansView.value.slice(0,32) + "...";
    }
    view.value = answer;
    ans = answer;
    newOp = true;
    
  } catch (error) {
    view.value = "Syntax Error"
    newOp = true;
  }
}

const delete_input = () => {
  view.value = view.value.slice(0, -1);
  if (view.value == "") {
    view.value = "0";
  }
}

const insert_ans = () => {
  zero_clear();
  if (ans != "" || view.value != ans) {
    view.value += ans;
  }
  start_op()
}

const bracket_left = () => {
  zero_clear();
  view.value += "(";
  start_op()
}

const bracket_right = () => {
  if (view.value != 0) {
    zero_clear();
    view.value += ")";
    start_op()
  }
}

const input_one = () => {
  zero_clear();
  view.value += "1";
  start_op()
}
const input_two = () => {
  zero_clear()
  view.value += "2";
  start_op()
}
const input_three = () => {
  zero_clear()
  view.value += "3";
  start_op()
}
const input_four = () => {
  zero_clear()
  view.value += "4";
  start_op()
}
const input_five = () => {
  zero_clear()
  view.value += "5";
  start_op()
}
const input_six = () => {
  zero_clear()
  view.value += "6";
  start_op()
}
const input_seven = () => {
  zero_clear()
  view.value += "7";
  start_op()
}
const input_eight = () => {
  zero_clear()
  view.value += "8";
  start_op()
}
const input_nine = () => {
  zero_clear()
  view.value += "9";
  start_op()
}
const input_zero = () => {
  zero_clear()
  view.value += "0";
  start_op()
}
const input_dot = () => {
  zero_clear()
  view.value += ".";
  start_op()
}

const op_mult = () => {
  if (view.value != "0") {
    non_digit_replacer();
    if (view.value != "") {
      view.value += "*";
      newOp = false;
    } else {
      zero_clear(true);
      newOp = true;
    }
  }
}
const op_divi = () => {
  if (view.value != "0") {
    non_digit_replacer();
    if (view.value != "") {
      view.value += "/";
      newOp = false;
    } else {
      zero_clear(true);
      newOp = true;
    }
  }
}
const op_add = () => {
  if (view.value != "0") {
    non_digit_replacer();
    if (view.value != "") {
      view.value += "+";
      newOp = false;
    } else {
      zero_clear(true);
      newOp = true;
    }
  }
}
const op_subt = () => {
  if (view.value == "0") {
    view.value = "";
    non_digit_replacer();
    view.value += "-";
    newOp = false;
  } else {
    non_digit_replacer();
    if (view.value != "") {
      view.value += "-";
      newOp = false;
    } else {
      zero_clear(true);
      newOp = true;
    }
  }
  
}