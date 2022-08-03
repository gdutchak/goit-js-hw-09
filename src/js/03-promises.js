import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector(".form"),
  button: document.querySelector("button")
}

function startPromise() {
  const amount = refs.form["amount"].value;
  let delayFrs = JSON.parse(refs.form["delay"].value);
  let step = JSON.parse(refs.form["step"].value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delayFrs).then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delayFrs += step
  }
}

function createPromise(position, delay) {

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay })
      } else {
        reject({ position, delay })
      }
    }, delay)
  })

}

refs.button.addEventListener("click", (e) => {
  e.preventDefault()
  startPromise()
})