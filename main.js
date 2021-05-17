// Calculator without using eval()

// ans shows if there was a previous computation
let ans = [0];
let ansIndex = 0;
let newOp = true;

const ansView = document.querySelector(".calc__display__ansView");
ansView.value = "Numpad enabled / ANS = input prev. answers";

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
    regEx = /[\d)-]/g
  } else {
    regEx = /[\d)]/g
  }
  
  if (regEx.test(view.value[view.value.length-1]) == false) {
    view.value = view.value.slice(0, -1);
  }
}


const compute = () => {
  try {
    // eval version
    // const answer = eval(view.value);

    const viewArr = view.value.split("");

    // HANDLE REGULAR FUNCTIONS
    // loop on self
    const resolveLeftRight = (unitArr=viewArr) => {
      for (unit of unitArr) {
        // test for only numbers
        if (/^[\d.]+$/.test(unitArr.join(""))) {
          return unitArr;
        } else {
          // checks for a minus number
          if (/^-/.test(unitArr.join("")) && /^[\d.]+$/.test(unitArr.join("").slice(1))) {
            return unitArr;
          }
        }

      
        if (unit == "*" || unit == "/") {
          const unitIndex = unitArr.indexOf(unit);
          let isMinus = 0;

          // get start index of immediate left number only
          let leftNum = [];
          let leftIndex;
          for (let i = unitIndex-1; i >= 0; i--) {
            if (/[\d.()]/.test(unitArr[i])) {
              leftNum.unshift(unitArr[i])
              if (i == 0) {
                leftIndex = i;
              }
              if (unitArr[i-1] == "-") {
                leftNum.unshift("-");
                isMinus = i-2;
                leftIndex = i;
              }
            } else {
              leftIndex = i+1;
              break;
            }
          }
          
          // get end index of immediate right number only
          let rightNum = [];
          let rightIndex;
          for (let i = unitIndex+1; i < unitArr.length; i++) {
            if (/[\d.()]/.test(unitArr[i])) {
              rightNum.push(unitArr[i])
              if (i == unitArr.length-1) {
                rightIndex = i+1;
              }
            } else {
              rightIndex = i;
              break;
            }
          }

          console.log("left, right nums,", leftNum, rightNum);
          console.log("left, right index,", leftIndex, rightIndex);

          // attempt to operate on left and right
          let result;
          if (unit == "*") {
            result = Number(leftNum.join("")) * Number(rightNum.join(""));
          } else {
            result = Number(leftNum.join("")) / Number(rightNum.join(""));
          }
          
          result = `${result}`;
          if (result[0] == "-") {
            result = result.split("");
            if (result[0] == "-" && result[1] == "-") {
              result = result.slice(1);
            }
          }

          if (typeof result == "string") {
            result = result.split("")
          }
          console.log("result: ", result);

          // now replace calculated part of array and join to original array
          newLeftArr = unitArr.slice(isMinus, leftIndex)
          newRightArr = unitArr.slice(rightIndex)

          console.log("leftArr, rightArr:", newLeftArr, newRightArr);

          if (typeof result == "string") {
            unitArr = newLeftArr.concat([`${result}`]).concat(newRightArr);
          } else {
            unitArr = newLeftArr.concat(result).concat(newRightArr);
          }

          console.log("new arr,", unitArr);
        }
      }

      // for (unit of unitArr) {
      //   // test for only numbers
      //   if (/^[\d.]+$/.test(unitArr.join(""))) {
      //     return unitArr;
      //   } else {
      //     // checks for a minus number
      //     if (/^-/.test(unitArr.join("")) && /^[\d.]+$/.test(unitArr.join("").slice(1))) {
      //       return unitArr;
      //     }
      //   }

      //   if (unit == "+") {
      //     const unitIndex = unitArr.indexOf(unit);
      //     let isMinus = 0;

      //     // get start index of immediate left number only
      //     let leftNum = [];
      //     let leftIndex;
      //     for (let i = unitIndex-1; i >= 0; i--) {
      //       console.log("unitIndex:", unitIndex);
      //       if (/[\d.()]/.test(unitArr[i])) {
      //         leftNum.unshift(unitArr[i])
      //         if (i == 0) {
      //           console.log("going i==0");
      //           leftIndex = i;
      //         }
      //         if (unitArr[i-1] == "-") {
      //           console.log("going minus");
      //           leftNum.unshift("-");
      //           isMinus = i-2;
      //           leftIndex = i;
      //         }
      //       } else {
      //         console.log("going else");
      //         leftIndex = i+1;
      //         break;
      //       }
      //     }
      //     // get end index of immediate right number only
      //     let rightNum = [];
      //     let rightIndex;
      //     for (let i = unitIndex+1; i < unitArr.length; i++) {
      //       if (/[\d.()]/.test(unitArr[i])) {
      //         rightNum.push(unitArr[i])
      //         if (i == unitArr.length-1) {
      //           rightIndex = i+1;
      //         }
      //       } else {
      //         rightIndex = i;
      //         break;
      //       }
      //     }

      //     console.log("left, right nums,", leftNum, rightNum);
      //     console.log("left, right index,", leftIndex, rightIndex);

      //     // attempt to operate on left and right
      //     let result = Number(leftNum.join("")) + Number(rightNum.join(""));

      //     result = `${result}`;
      //     if (result[0] == "-") {
      //       result = result.split("");
      //       if (result[0] == "-" && result[1] == "-") {
      //         result = result.slice(1);
      //       }
      //     }
      //     console.log("result: ", result);

      //     // now replace calculated part of array and join to original array
      //     newLeftArr = unitArr.slice(isMinus, leftIndex);
      //     newRightArr = unitArr.slice(rightIndex);

      //     console.log("leftArr, rightArr:", newLeftArr, newRightArr);

      //     if (typeof result == "string") {
      //       unitArr = newLeftArr.concat([`${result}`]).concat(newRightArr);
      //     } else {
      //       unitArr = newLeftArr.concat(result).concat(newRightArr);
      //     }

      //     console.log("new arr,", unitArr);
      //   }
      // }

      for (unit of unitArr) {
        // test for only numbers
        if (/^[\d.]+$/.test(unitArr.join(""))) {
          return unitArr;
        } else {
          // checks for a minus number
          if (/^-/.test(unitArr.join("")) && /^[\d.]+$/.test(unitArr.join("").slice(1))) {
            return unitArr;
          }
        }

        let negativeCount = 0;
        for (let i = 0; i < unitArr.length; i++) {
          if (unitArr[i] == "-") {
            negativeCount++;
          }
        }

        if (negativeCount > 1 && unitArr[0] == "-" && unit == "-") {
          console.log("DOUBLE MINUS");
          console.log(unitArr);
          
          let minusCopyArr = unitArr.slice(1);
          console.log("MinusCopy is", minusCopyArr);
          console.log("original unit arr is", unitArr);

          const unitIndex = minusCopyArr.indexOf(unit);
          console.log("index of unit", unitIndex);


          // get start index of immediate left number only
          let isMinus = 0;
          let leftNum = [];
          let leftIndex;
          for (let i = unitIndex-1; i >= 0; i--) {
            console.log("unitIndex:", unitIndex);
            if (/[\d.()]/.test(minusCopyArr[i])) {
              leftNum.unshift(minusCopyArr[i])
              if (i == 0) {
                console.log("going i==0");
                leftIndex = i;
              }
              if (minusCopyArr[i-1] == "-") {
                console.log("going minus");
                leftNum.unshift("-");
                isMinus = i-2;
                leftIndex = i;
              }
            } else {
              console.log("going else");W
              leftIndex = i+1;
              break;
            }
          }

          // get end index of immediate right number only
          let rightNum = [];
          let rightIndex;
          for (let i = unitIndex+1; i < minusCopyArr.length; i++) {
            if (/[\d.()]/.test(minusCopyArr[i])) {
              rightNum.push(minusCopyArr[i])
              if (i == minusCopyArr.length-1) {
                rightIndex = i+1;
              }
            } else {
              rightIndex = i;
              break;
            }
          }

          leftNum.unshift("-")
          result = Number(leftNum.join("")) - Number(rightNum.join(""));
          
          console.log("MINUS COPY leftNum, rightNum", leftNum, rightNum);
          console.log("MINUS COPY RESULTS", result);

          result = `${result}`;
          if (result[0] == "-") {
            result = result.split("");
            if (result[0] == "-" && result[1] == "-") {
              result = result.slice(1);
            }
          }

          if (typeof result == "string") {
            result = result.split("")
          }
          console.log("result: ", result);

          // now replace calculated part of array and join to original array
          newLeftArr = minusCopyArr.slice(isMinus, leftIndex);
          newRightArr = minusCopyArr.slice(rightIndex);

          console.log("leftArr, rightArr:", newLeftArr, newRightArr);

          if (typeof result == "string") {
            unitArr = newLeftArr.concat([`${result}`]).concat(newRightArr);
          } else {
            unitArr = newLeftArr.concat(result).concat(newRightArr);
          }

          console.log("new arr,", unitArr);


        } else if (unit == "+" || unit == "-") {

          const unitIndex = unitArr.indexOf(unit);
          
          console.log("index of unit", unitIndex);
          let isMinus = 0;

          // get start index of immediate left number only
          let leftNum = [];
          let leftIndex;
          for (let i = unitIndex-1; i >= 0; i--) {
            console.log("unitIndex:", unitIndex);
            if (/[\d.()]/.test(unitArr[i])) {
              leftNum.unshift(unitArr[i])
              if (i == 0) {
                console.log("going i==0");
                leftIndex = i;
              }
              if (unitArr[i-1] == "-") {
                console.log("going minus");
                leftNum.unshift("-");
                isMinus = i-2;
                leftIndex = i;
              }
            } else {
              console.log("going else");
              leftIndex = i+1;
              break;
            }
          }

          // get end index of immediate right number only
          let rightNum = [];
          let rightIndex;
          for (let i = unitIndex+1; i < unitArr.length; i++) {
            if (/[\d.()]/.test(unitArr[i])) {
              rightNum.push(unitArr[i])
              if (i == unitArr.length-1) {
                rightIndex = i+1;
              }
            } else {
              rightIndex = i;
              break;
            }
          }

          console.log("left, right nums,", leftNum, rightNum);
          console.log("left, right index,", leftIndex, rightIndex);

          // attempt to operate on left and right
          let result;
          if (unit == "+") {
            result = Number(leftNum.join("")) + Number(rightNum.join(""));
          } else {
            result = Number(leftNum.join("")) - Number(rightNum.join(""));
          }

          result = `${result}`;
          if (result[0] == "-") {
            result = result.split("");
            if (result[0] == "-" && result[1] == "-") {
              result = result.slice(1);
            }
          }

          if (typeof result == "string") {
            result = result.split("")
          }
          console.log("result: ", result);

          // now replace calculated part of array and join to original array
          newLeftArr = unitArr.slice(isMinus, leftIndex);
          newRightArr = unitArr.slice(rightIndex);

          console.log("leftArr, rightArr:", newLeftArr, newRightArr);

          if (typeof result == "string") {
            unitArr = newLeftArr.concat([`${result}`]).concat(newRightArr);
          } else {
            unitArr = newLeftArr.concat(result).concat(newRightArr);
          }

          console.log("new arr,", unitArr);
        }
      }
    }
    // initial call
    const answer = resolveLeftRight().join("");


    // // handle brackets first
    // let openBracketIndex;
    // for (let i = 0; i < viewArr.length; i++) {
    //   regEx = /[(]/;
    //   if (regEx.test(viewArr[i])) {
    //     openBracketIndex.push(viewArr.IndexOf(viewArr[i]));
    //   }
    // }

    // let closeBracketIndex;
    // for (let i = 0; i < viewArr.length; i++) {
    //   regEx = /[)]/;
    //   if (regEx.test(viewArr[i])) {
    //     closeBracketIndex.push(viewArr.IndexOf(viewArr[i]));
    //   }
    // }

    // if (openBracketIndex.length != closeBracketIndex.length) {
    //   view.value = "Syntax Error";
    //   return; // break out of code here
    // }

    // for (let i = 0; i < openBracketIndex.length; i++) {
    //   // evaluate each bracket on at a time
    //   // does not include brackets
    //   const singleBracketArr = viewArr.slice(openBracketIndex[i+1], closeBracketIndex[i]);
    //   let nums = singleBracketArr.join("").split(/[+/*]/);
 
    // }



    if (view.value.length > 10) {
      ansView.value = view.value.slice(0,10) + "... : " + answer;
    } else {
      ansView.value = view.value + ": " + answer;
    }

    // truncate if too long
    if (ansView.value.length > 32) {
      ansView.value = ansView.value.slice(0,32) + "...";
    }
    view.value = answer;
    ans.push(answer);
    ansIndex += 1;
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

const ans_up = () => {
  ansIndex -= 1;
  if (ansIndex < 0) {
    ansIndex = 0;
  }
  
  ansView.value = `[${ansIndex}] Previous Calc: ` + ans[ansIndex];

  if (ansView.value.length > 32) {
    ansView.value = ansView.value.slice(0,32) + "...";
  }  
}

const ans_down = () => {
  ansIndex += 1;
  if (ansIndex > ans.length - 1) {
    ansIndex = ans.length - 1;
  }
  
  ansView.value = `[${ansIndex}] Previous Calc: ` + ans[ansIndex];

  if (ansView.value.length > 32) {
    ansView.value = ansView.value.slice(0,32) + "...";
  }
}

const insert_ans = () => {
  zero_clear();

  if (view.value != "0" || view.value != "" || eval(view.value) != eval(ans[ansIndex])) {
    view.value += ans[ansIndex];
    start_op()
  }

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
  non_digit_replacer();
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


// detect keyboard input
const calc = document.querySelector(".calc");
calc.addEventListener("keydown", (event) => {
  if (event.defaultPrevented) {
    return;
  }

  switch (event.key) {
    case "9":
      input_nine();
      break;
    case "8":
      input_eight();
      break;
    case "7":
      input_seven();
      break;
    case "6":
      input_six();
      break;
    case "5":
      input_five();
      break;
    case "4":
      input_four();
      break;
    case "3":
      input_three();
      break;
    case "2":
      input_two();
      break;
    case "1":
      input_one();
      break;
    case "0":
      input_zero();
      break;
    case "Multiply":
      op_mult();
      break;
    case "Divide":
      op_divi();
      break;
    case "Add":
      op_add();
      break;
    case "Subtract":
      op_subt();
      break;

    default:
      break;
  }

  switch (event.keyCode) {
    case 110:
      input_dot();
      break;
    case 190:
      input_dot();
      break;
    case 111:
      op_divi();
      break;
    case 191:
      op_divi();
      break;
    case 106:
      op_mult();
      break;
    case 107:
      op_add();
      break;
    case 109:
      op_subt();
      break;
    case 13:
      compute();
      break;
    case 8:
      delete_input();
      break;
    default:
      break;
  }
})