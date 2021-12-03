function reverseStr(str) {
  const listofchars = str.split("");
  const reverselistofchar = listofchars.reverse();
  const reversedstr = reverselistofchar.join("");
  return reversedstr;
}
function ispalindorme(str) {
  const reverse = reverseStr(str);
  return str === reverse;
}

function convertdatetostr(date) {
  const datestr = { day: "", month: "", year: "" };
  if (date.day < 10) {
    datestr.day = "0" + date.day;
  } else {
    datestr.day = date.day.toString();
  }
  if (date.month < 10) {
    datestr.month = "0" + date.month;
  } else {
    datestr.month = date.month.toString();
  }
  datestr.year = date.year.toString();
  return datestr;
}
function getdateallformats(date) {
  const dateStr = convertdatetostr(date);

  const ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
  const mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
  const yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
  const ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
  const mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
  const yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkpalindormeforalldateFormate(date) {
  var listofpalindrome = getdateallformats(date);
  var flag = false;
  for (var i = 0; i < listofpalindrome.length; i++) {
    if (ispalindorme(listofpalindrome[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}
function isLeapyear(year) {
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
}
function getNextdate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var dayinmonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapyear(year)) {
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
    if (day > dayinmonth[month - 1]) {
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
function getNextpalindromedate(date) {
  var ctr = 0;
  var nextdate = getNextdate(date);

  while (1) {
    ctr++;
    var ispalindrome = checkpalindormeforalldateFormate(nextdate);
    if (ispalindrome) {
      break;
    }
    nextdate = getNextdate(nextdate);
  }

  return [ctr, nextdate];
}

var bdate = document.querySelector("#bday-input");
const showbtn = document.getElementById("shows-btn");
const result = document.getElementById("result");

function clickHandler(e) {
  var bday = bdate.value;
  if (bday !== "") {
    var listofdate = bday.split("_");
    var date = {
      day: Number(listofdate[2]),
      month: Number(listofdate[1]),
      year: Number(listofdate[0]),
    };
    var isPalindorme = checkpalindormeforalldateFormate(date);
    if (isPalindorme) {
      result.innerText = "yay! your birthday is a palindrome";
    } else {
      var [ctr, nextdate] = getNextpalindromedate(date);
      result.innerText = `the next palindrome date is ${nextdate.day}-${nextdate.month}-${nextdate.year}, you missed it by ${ctr} days! `;
    }
  }
}
showbtn.addEventListener("click", clickHandler);
