import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";
const refs = {
    myInput: document.querySelector("#datetime-picker"),
    myButton: document.querySelector("[data-start]"),
    days: document.querySelector("[data-days]"),
    hours: document.querySelector("[data-hours]"),
    minutes: document.querySelector("[data-minutes]"),
    seconds: document.querySelector("[data-seconds]"),
}
refs.myButton.setAttribute("disabled", "disabled");

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        if (selectedDates[0].getTime() < new Date().getTime()) {
            Notify.failure('Please choose a date in the future');
        } else {
            refs.myButton.removeAttribute("disabled")
        }

        refs.myButton.addEventListener("click", () => {
            const timerId = setInterval(() => {

                const differentTm = selectedDates[0].getTime() - new Date().getTime()

                if (differentTm < 0) {
                    clearInterval(timerId)
                } else {
                    startTimer(differentTm);
                }
            }, 1000)
        });

    }
};
function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}

function startTimer(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);
    return { days, hours, minutes, seconds };
}
const timer = flatpickr(refs.myInput, options);

