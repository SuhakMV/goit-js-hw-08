import throttle from "lodash.throttle";

/**Storage key*/
const STORAGE_KEY = 'feedback-form-state';

/**Form selector*/
const refs = {
    form: document.querySelector('.feedback-form'),
    textarea: document.querySelector('.feedback-form  textarea'),
    input: document.querySelector('.feedback-form  input'),
};

let formData = {};

populateTextarea();
/**Upload every 500ms */
refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onTextareaInput, 500));

/**Save form in storage */
function onTextareaInput(e) {
    e.preventDefault();
    formData[e.target.name] = e.target.value;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

/**Upload form from storage */
function populateTextarea() {
    const savedForm = localStorage.getItem(STORAGE_KEY);
    const parseForm = JSON.parse(savedForm);

    if (savedForm) {
        formData = parseForm;
        (refs.textarea.value = parseForm.message || "");
        (refs.input.value = parseForm.email || "");
    }
}

/** Reset form*/
function onFormSubmit(e) {
    e.preventDefault();
    console.log(formData);
    e.currentTarget.reset();
    localStorage.removeItem(STORAGE_KEY);
}