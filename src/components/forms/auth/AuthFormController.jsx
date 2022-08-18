import { useState } from 'react';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const SIGN_IN = 'signin';
const SIGN_UP = 'signup';

export default function AuthFormController() {
  const [formType, setFormType] = useState('signin');

  function showSignUpForm() {
    setFormType(SIGN_UP);
  }

  function showSignInForm() {
    setFormType(SIGN_IN);
  }

  let form = <SigninForm onSignUp={showSignUpForm} />;

  if (formType === SIGN_UP) form = <SignupForm onSignIn={showSignInForm} />;

  return form;
}
