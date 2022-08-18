import { useState } from 'react';
import PasswordResetForm from './PasswordResetForm';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const SIGN_IN = 'signin';
const SIGN_UP = 'signup';
const RESET = 'reset';

export default function AuthFormController() {
  const [formType, setFormType] = useState('signin');

  function showSignUpForm() {
    setFormType(SIGN_UP);
  }

  function showSignInForm() {
    setFormType(SIGN_IN);
  }

  function showPasswordResetForm() {
    setFormType(RESET);
  }

  let form;

  switch (formType) {
    case SIGN_IN:
      form = (
        <SigninForm
          onResetPassword={showPasswordResetForm}
          onSignUp={showSignUpForm}
        />
      );
      break;
    case SIGN_UP:
      form = <SignupForm onSignIn={showSignInForm} />;
      break;
    case RESET:
      form = <PasswordResetForm onSignIn={showSignInForm} />;
      break;
  }

  return form;
}
