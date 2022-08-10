const nameValidation = /^[a-zA-Z ]+$/;
const lowerCaseLetters = /[a-z]/g;
const upperCaseLetters = /[A-Z]/g;
const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
const validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const numbers = /[0-9]/g;

const nameValidator = (value, setValue, required = false, label) => {
  setValue(p => ({ ...p, errorMessage: '' }));
  if (required && value.trim().length < 3) {
    setValue(p => ({
      ...p,
      errorMessage: `${label} cannot be empty / less  than 2 letters`,
    }));
    return false;
  } else if (!nameValidation.test(value)) {
    setValue(p => ({
      ...p,
      errorMessage: `${label} should contain only letters`,
    }));
    return false;
  }
  return true;
};
const passwordValidator = (value, setValue) => {
  let message = '';
  setValue(p => ({ ...p, errorMessage: '' }));
  message = `Password should contain`;
  if (!value.match(lowerCaseLetters)) {
    message = message + ` atleast 1 lowercase letter,`;
  }
  // Validate capital letters
  if (!value.match(upperCaseLetters)) {
    message = message + ` atleast 1 uppercase letter,`;
  }

  // Validate numbers
  if (!value.match(numbers)) {
    message = message + ` atleast 1 number,`;
  }

  // Validate length
  if (!value.length >= 8) {
    message = message + ` atleast 8 characters,`;
  }
  //special characters

  if (!specialChars.test(value)) {
    message = message + ` atleast 1 special character`;
  }
  if (message.length > 25) {
    setValue(p => ({ ...p, errorMessage: message }));
    return false;
  }
  return true;
};
const emailValidator = (value, setValue) => {
  setValue(p => ({ ...p, errorMessage: '' }));
  if (value.trim().length === 0) {
    setValue(p => ({ ...p, errorMessage: `Email cannot be empty` }));
    return false;
  }
  if (!validEmail.test(value)) {
    setValue(p => ({ ...p, errorMessage: 'Invalid email format' }));
    return false;
  }
  return true;
};
export const validator = (type, value, setValue, required, label) => {
  if (type === 'name') {
    nameValidator(value, setValue, required, label);
  } else if (type === 'password') {
    passwordValidator(value, setValue);
  } else if (type === 'email') {
    emailValidator(value, setValue);
  }
};
