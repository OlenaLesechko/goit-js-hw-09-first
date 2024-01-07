const formEl = document.querySelector('.feedback-form');
const localStorageFeedbackKey = 'feedback-form-state';

try {
  const initialFormData = JSON.parse(
    localStorage.getItem(localStorageFeedbackKey)
  );

  Array.from(formEl.elements).forEach(element => {
    if (initialFormData) {
      element.value = initialFormData[element.name];
    }
  });
} catch {
  console.error('PARSE FORM STORAGE ERROR');
}

const userFeedback = {};

formEl.addEventListener('input', e => {
  const data = new FormData(formEl);
  data.forEach((value, key) => {
    userFeedback[key] = value;
    localStorage.setItem(localStorageFeedbackKey, JSON.stringify(userFeedback));
  });
});

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const login = formEl.elements.email.value.trim();
  const message = formEl.elements.message.value.trim();
  if (!login || !message) {
    alert('All form fields must be filled in');
  } else {
    console.log(userFeedback);
    localStorage.removeItem(localStorageFeedbackKey);
    formEl.reset();
  }
});