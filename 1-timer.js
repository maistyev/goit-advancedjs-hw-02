import"./assets/modulepreload-polyfill-B5Qt9EMX.js";/* empty css                      */import{f,i}from"./assets/vendor-BbbuE1sJ.js";const e={days:document.querySelector(".js-timer-days"),hours:document.querySelector(".js-timer-hours"),minutes:document.querySelector(".js-timer-minutes"),seconds:document.querySelector(".js-timer-seconds"),startButton:document.querySelector(".js-timer-start"),resetButton:document.querySelector(".js-timer-reset")};localStorage.getItem("end-timer")&&(e.startButton.disabled=!0,d());const h={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){console.log(t);const r=t[0],u=new Date;e.startButton.disabled=!1,r<u?(e.startButton.disabled=!0,i.error({title:"Error",message:"Please choose a date in the future"}),localStorage.removeItem("end-timer")):(localStorage.setItem("end-timer",JSON.stringify(r)),e.startButton.disabled=!1)}};f("#datetime-picker",h);function y(t){const a=Math.floor(t/864e5),o=Math.floor(t%864e5/36e5),n=Math.floor(t%864e5%36e5/6e4),s=Math.floor(t%864e5%36e5%6e4/1e3);return{days:a,hours:o,minutes:n,seconds:s}}function d(){const t=localStorage.getItem("end-timer");if(!t){i.error({title:"Error",message:"Please choose a date in the future"});return}const r=new Date(JSON.parse(t));if(r-new Date<=0){i.error({title:"Error",message:"Please choose a date in the future"});return}window.timerId=setInterval(()=>{e.startButton.disabled=!0;const a=r-new Date;if(a<=0){clearInterval(timerId),i.success({title:"Success",message:"Time is up!"}),localStorage.removeItem("end-timer"),e.startButton.disabled=!1;return}const{days:o,hours:n,minutes:s,seconds:c}=y(a);e.days.textContent=o<10?`0${o}`:o,e.hours.textContent=n<10?`0${n}`:n,e.minutes.textContent=s<10?`0${s}`:s,e.seconds.textContent=c<10?`0${c}`:c},1e3)}e.startButton.addEventListener("click",d);e.resetButton.addEventListener("click",()=>{localStorage.removeItem("end-timer"),e.days.textContent="00",e.hours.textContent="00",e.minutes.textContent="00",e.seconds.textContent="00",e.startButton.disabled=!1,clearInterval(window.timerId),window.timerId=null});
//# sourceMappingURL=1-timer.js.map
