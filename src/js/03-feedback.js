// const formEl = document.querySelector('.feedback-form');
// const throttle = require('lodash.throttle');

// let data = {};
// formEl.addEventListener('input', throttle(onInput, 250));

// function onInput(event) {
//     data[event.target.name] = event.target.value;
//     localStorage.setItem("feedback-form-state", JSON.stringify(data));
// }



// if (localStorage.getItem("feedback-form-state")) {
//     const { email, message } = JSON.parse(localStorage.getItem("feedback-form-state"));
//     formEl.email.value = email;
//     formEl.message.value = message;
//     data.email = email;
//     data.message = message;
// }


// formEl.addEventListener('submit', onSubmit);

// function onSubmit(event) {
//     event.preventDefault();
//     localStorage.removeItem("feedback-form-state")
//     console.log(data);
//     formEl.reset();
    
    
// }






const inputEl = document.querySelector('input');
const formEl = document.querySelector('.feedback-form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(event) {
    event.preventDefault();
    console.log(inputEl.value);
}