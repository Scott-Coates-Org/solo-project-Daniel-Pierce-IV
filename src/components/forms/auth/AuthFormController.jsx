import { useState } from 'react';
import PasswordResetForm from './PasswordResetForm';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const SIGN_IN = 'signin';
const SIGN_UP = 'signup';
const RESET = 'reset';

export default function AuthFormController() {
  const [formType, setFormType] = useState('signin');
  const [errorMessages, setErrorMessages] = useState([]);

  function addErrorMessage(message) {
    // Remove vendor messaging and improve formatting
    let formattedMessage = message
      .replace('Firebase: Error (auth/', '')
      .replace(').', '')
      .replaceAll('-', ' ');

    // Capitalize the message
    formattedMessage =
      formattedMessage[0].toUpperCase() + formattedMessage.slice(1);

    setErrorMessages([...errorMessages, formattedMessage]);
  }

  function resetErrorMessages() {
    setErrorMessages([]);
  }

  let form;

  switch (formType) {
    case SIGN_IN:
      form = (
        <SigninForm
          onAuthError={addErrorMessage}
          onShowResetPassword={setFormType.bind(null, RESET)}
          onShowSignUp={setFormType.bind(null, SIGN_UP)}
          onSubmit={resetErrorMessages}
        />
      );
      break;
    case SIGN_UP:
      form = (
        <SignupForm
          onAuthError={addErrorMessage}
          onShowSignIn={setFormType.bind(null, SIGN_IN)}
          onSubmit={resetErrorMessages}
        />
      );
      break;
    case RESET:
      form = (
        <PasswordResetForm
          onAuthError={addErrorMessage}
          onShowSignIn={setFormType.bind(null, SIGN_IN)}
          onSubmit={resetErrorMessages}
        />
      );
      break;
  }

  return (
    <div className="p-16 bg-white rounded-[4rem]">
      {form}

      {errorMessages.map((error) => (
        <div>{error}</div>
      ))}
    </div>
  );
}
