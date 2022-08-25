import { useEffect } from 'react';
import { useState } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client';
import LabelledInput from '../LabelledInput';
import BaseForm from './BaseForm';

export default function SignupForm({ onAuthError, onShowSignIn, onSubmit }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  function attemptSignUp(event) {
    event.preventDefault();

    onSubmit(event);
    checkCustomValidity(event);

    if (event.target.checkValidity()) {
      createUserWithEmailAndPassword(email, password);
    } else {
      event.target.reportValidity();
    }
  }

  function checkCustomValidity(event) {
    const passwordConfirmationInput =
      event.target.querySelector('#password-confirm');

    if (password !== passwordConfirm) {
      passwordConfirmationInput.setCustomValidity('Passwords do not match');
    } else {
      passwordConfirmationInput.setCustomValidity('');
    }
  }

  useEffect(() => {
    if (error) onAuthError(error.message);
    if (googleError) onAuthError(googleError.message);
  }, [error, googleError]);

  return (
    <BaseForm heading="Sign Up" onSubmit={attemptSignUp}>
      <LabelledInput
        id="email"
        type="email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <LabelledInput
        id="password"
        type="password"
        label="Password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
        minLength={6}
      />

      <LabelledInput
        id="password-confirm"
        type="password"
        label="Password confirm"
        onChange={(e) => setPasswordConfirm(e.target.value)}
        value={passwordConfirm}
        required
        minLength={6}
      />

      <button className="bg-recipe-green text-white text-xl py-1 mt-6">
        Sign up
      </button>

      <button
        type="button"
        className="border border-recipe-gray-lighter text-xl py-1"
        onClick={() => signInWithGoogle()}
      >
        Continue with Google
      </button>

      <button
        type="button"
        className="self-start hover:bg-[rgba(255,255,255,0.3)]"
        onClick={onShowSignIn}
      >
        Back to <span className="text-recipe-green">sign in</span>
      </button>
    </BaseForm>
  );
}
