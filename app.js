const dateOfBirth = document.querySelector(".date-of-birth");
const btnCheck = document.querySelector("#check-number");
const Message = document.querySelector(".Message");

function reverseStr(str) {
  var listOfChar = str.split("");
  var resverseListOfChar = listOfChar.reverse();
  var reversedStr = resverseListOfChar.join("");
  return reversedStr;
}
function isPalindrome(str) {
  var reverse = reverseStr(str);
  return str === reverse;
}

function convertDateToString(date) {
  var dateStr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFromats(date) {
  var dateStr = convertDateToString(date);
  var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPalindromeFoAllFormate(date) {
  var listOfPalindrome = getAllDateFromats(date);
  var flag = false;
  for (i = 0; i < listOfPalindrome.length; i++) {
    if (isPalindrome(listOfPalindrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}
// check leap year
function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
  return false;
} //get the next date
function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;
  var dayIsMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //0-1
  if (month === 2) {
    //check for february
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    //check if the day exceed the max days in month
    if (day > dayIsMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}
function getNextPalindromeDate(date) {
  var ctr = 0;
  var nextDate = getNextDate(date);
  while (1) {
    ctr++;
    var isPalindrome = checkPalindromeFoAllFormate(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }
  return [ctr, nextDate];
}

function clickHandler(e) {
  var bdayStr = dateOfBirth.value;
  if (bdayStr != "") {
    var listNode = bdayStr.split("-");
    var date = {
      day: Number(listNode[2]),
      month: Number(listNode[1]),
      year: Number(listNode[0]),
    };
    var isPalindrome = checkPalindromeFoAllFormate(date);
    if (isPalindrome) {
      Message.innerText = "Yay! your Birthday is a Palindrome!! 🤗🤗";
    } else {
      var [ctr, nextDate] = getNextPalindromeDate(date);
      Message.innerText = `the next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed it by ${ctr} Day!😔`;
    }
  }
}
btnCheck.addEventListener("click", clickHandler);

// var date = {
//   day: 11,
//   month: 2,
//   year: 2020,
// };
// console.log(getNextPalindromeDate(date));

// https://lucky-birthdatego.netlify.app/
// PERVIOUS palindrome date and how mand days are remaining it not mandatoyre
