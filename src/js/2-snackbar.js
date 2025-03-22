import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.js-form'),
};

function onFormSubmit(event) {
  event.preventDefault();

  const delay = refs.form.elements.delay.value;
  const state = refs.form.querySelector('input[name="state"]:checked').value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve();
      } else {
        reject();
      }
    }, delay);
  })
    .then(() => {
      iziToast.success({
        title: 'Resolved',
        message: `Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(() => {
      iziToast.error({
        title: 'Rejected',
        message: `Rejected promise in ${delay}ms`,
      });
    })
    .finally(() => {
      refs.form.reset();
    });
}

refs.form.addEventListener('submit', onFormSubmit);
