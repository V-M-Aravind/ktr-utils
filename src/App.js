import { useState } from 'react';
import { TextBox } from './common/TextBox';
import { validator } from './common/TextBox/validation';
const App = () => {
  const [passwordDetails, setPasswordDetails] = useState({
    value: '',
    errorMessage: '',
  });
  const [firstNameDetails, setFirstNameDetails] = useState({
    value: '',
    errorMessage: '',
  });
  const [emailDetails, setEmailDetails] = useState({
    value: '',
    errorMessage: '',
  });

  const submitHandler = e => {
    e.preventDefault();

    if (
      !validator('password', passwordDetails.value, setPasswordDetails) |
      !validator('email', emailDetails.value, setEmailDetails) |
      !validator(
        'name',
        firstNameDetails.value,
        setFirstNameDetails,
        true,
        'First Name'
      )
    ) {
      return;
    }
    console.log(
      passwordDetails.errorMessage,
      emailDetails.errorMessage,
      firstNameDetails.errorMessage
    );
    console.log('value submitted');
  };
  return (
    <>
      <TextBox
        width="300px"
        label="Password"
        value={passwordDetails}
        setValue={setPasswordDetails}
        type="password"
        onChangeFlag={true}
        onBlurFlag={true}
      />
      <TextBox
        width="300px"
        label="Email"
        value={emailDetails}
        setValue={setEmailDetails}
        type="email"
        onChangeFlag={true}
        onBlurFlag={true}
      />
      <TextBox
        width="300px"
        label="First Name"
        value={firstNameDetails}
        setValue={setFirstNameDetails}
        type="name"
        onChangeFlag={true}
        required={true}
        onBlurFlag={false}
      />
      <button onClick={submitHandler}>Submit</button>
    </>
  );
};

export default App;
