
let isDOBOpen = false;
let DateOfBirth;
const settingIconEl = document.getElementById("settingIcon");
const settingsContentEl = document.getElementById("settingsContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("donButton");
const dobInputEl = document.getElementById("dobInput");
const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minutesEl = document.getElementById("minutes");
const secondEl = document.getElementById("second");




const makeTwoDigitNumber = (number) => {
      return number > 9 ? number : `0${number}`
} 




const toggleDateOfBirthSelector = () => {
     
      if (isDOBOpen) {
            settingsContentEl.classList.add("hide");  
      } else {
            settingsContentEl.classList.remove("hide");
      }

      console.log("Toggle",isDOBOpen);
      isDOBOpen = ! isDOBOpen;
}

const upDateAge = () => {
      const currentDate = new Date();
      const dateDiff = currentDate - DateOfBirth;
      const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
      const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
      const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
      const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
      const minute = Math.floor(dateDiff /(1000 * 60)) % 60;
      const second = Math.floor(dateDiff / 1000) % 60;
      
      yearEl.innerHTML = makeTwoDigitNumber(year);
      monthEl.innerHTML = makeTwoDigitNumber(month);
      dayEl.innerHTML = makeTwoDigitNumber(day);
      hourEl.innerHTML = makeTwoDigitNumber(hour);
      minutesEl.innerHTML = makeTwoDigitNumber(minute);
      secondEl.innerHTML = makeTwoDigitNumber(second);
}

const localStorageGetter = () => {
      const year = localStorage.getItem("year");
      const month = localStorage.getItem("month");
      const date = localStorage.getItem("date");
      const hour = localStorage.getItem("hour");
      const minute = localStorage.getItem("minute");
      const second = localStorage.getItem("second");

      if (year && month && date && hour && minute && second) {
            // console.log(year, month, date, hour, minute, second);
            DateOfBirth = new Date(year, month, date, hour, minute, second);
      }    
      upDateAge();
}

const contentToggler = () => {
      upDateAge();
      if (DateOfBirth) {
            initialTextEl.classList.add("hide");
            afterDOBBtnTxtEl.classList.remove("hide");
      } else {
            afterDOBBtnTxtEl.classList.add("hide");
            initialTextEl.classList.remove("hide");
      } 
 }


const setDOBHandler = () => {
      const dateString = dobInputEl.value;
      DateOfBirth = dateString ? new Date(dateString) : null;

       console.log({DateOfBirth});
       
      if (DateOfBirth) {
            localStorage.setItem('year', DateOfBirth.getFullYear());
            localStorage.setItem('month', DateOfBirth.getMonth());
            localStorage.setItem('date', DateOfBirth.getDate());
            localStorage.setItem('hour', DateOfBirth.getHours());
            localStorage.setItem('minute', DateOfBirth.getMinutes());
            localStorage.setItem('second', DateOfBirth.getSeconds());
             
      }
      contentToggler();
      setInterval(()=> upDateAge(),1000);
 } 

localStorageGetter();
contentToggler();
// setDOBHandler();




settingIconEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);