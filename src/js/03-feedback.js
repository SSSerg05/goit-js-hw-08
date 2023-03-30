import storage from './storage'
import throttle from 'lodash.throttle'

const refs = { 
  form: document.querySelector('.feedback-form'),
  email: document.querySelector('.feedback-form input'),
  message: document.querySelector('.feedback-form textarea'),
}

const KEY_STORAGE = 'feedback-form-state' 
let objForm = storage.load(KEY_STORAGE);

if (objForm) {
  refs.email.value = objForm.email;
  refs.message.value = objForm.message;
} else {  
  objForm = { email: "", message: "" };
}

// перевірка подї на ввод даних
const onInput = (event) => { 
  const { name, value } = event.target;

  if (name === 'email') {
    objForm.email = value;
  } else if (name === 'message') { 
    objForm.message = value;
  }

  storage.save(KEY_STORAGE, objForm)
}

// перевірка події на відправку даних
const onFormSubmit = (event) => { 
  event.preventDefault();

  console.log(objForm);

  storage.remove(KEY_STORAGE);
  objForm.email = '';
  objForm.message = '';

  event.currentTarget.reset();
}

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInput, 500));


