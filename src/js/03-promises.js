import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(".form"),
  button: document.querySelector("button")
}


function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay })
    } else {
      reject({ position, delay })
    }
  })
}

function startPromise() {
  const amount = refs.form["amount"].value
  let delayFrs = refs.form["delay"].value
  let step = refs.form["step"].value
  delayFrs = JSON.parse(delayFrs)
  step = JSON.parse(step)
  for (let i = 1, delay = delayFrs; i <= amount; i += 1, delay += step) {
    console.log(delay);
    setTimeout(() => {
      createPromise(i, delay).then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
        .catch(({ position, delay }) => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, delay)

  }
}

refs.button.addEventListener("click", (e) => {
  e.preventDefault()
  startPromise()
})