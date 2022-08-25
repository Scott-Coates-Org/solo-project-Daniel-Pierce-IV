import { useEffect } from 'react';
import { useState } from 'react';
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client';
import LabelledInput from '../LabelledInput';

export default function SignupForm({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessages, setErrorMessages] = useState(null);
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  function attemptSignUp(event) {
    event.preventDefault();

    if (validateForm()) {
      createUserWithEmailAndPassword(email, password);
    }
  }

  // Returns true if the form is valid, false if not
  // SIDE EFFECT: updates the error message state with errors
  function validateForm() {
    const errors = [];

    if (!email) {
      errors.push('Please enter your email');
    }

    if (!password) {
      errors.push('Please enter a password');
    } else if (password.length < 6) {
      // Password length dictated by Firebase
      // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
      errors.push('Password must be at least 6 characters');
    } else if (!passwordConfirm) {
      errors.push('Please confirm your password');
    } else if (password !== passwordConfirm) {
      errors.push('The passwords you entered do not match');
    }

    if (errors.length === 0) {
      setErrorMessages(null);
    } else {
      setErrorMessages(errors);
    }

    return errors.length === 0;
  }

  useEffect(displayFirebaseErrors, [error, googleError]);

  function displayFirebaseErrors() {
    let errors = [];

    if (error) errors.push(error.message);
    if (googleError) errors.push(googleError.message);

    // Remove vendor messaging and improve formatting
    errors = errors.map((error) => {
      let newError = error
        .replace('Firebase: Error (auth/', '')
        .replace(').', '')
        .replaceAll('-', ' ');

      return newError[0].toUpperCase() + newError.slice(1);
    });

    setErrorMessages(errorMessages ? errorMessages.concat(errors) : errors);
  }

  return (
    <div className="p-2">
      <form
        action=""
        className="signup p-2 flex flex-col gap-4"
        onSubmit={attemptSignUp}
      >
        <h2 className="text-2xl text-center">Sign Up</h2>

        {errorMessages?.map((error) => (
          <span key={error} className="text-red-800 text-sm">
            {error}
          </span>
        ))}

        <LabelledInput
          id="email"
          type="email"
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <LabelledInput
          id="password"
          type="password"
          label="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <LabelledInput
          id="password-confirm"
          type="password"
          label="Password confirm"
          onChange={(e) => setPasswordConfirm(e.target.value)}
          value={passwordConfirm}
        />

        <div className="flex gap-3">
          <button
            type="button"
            className="grow text-center hover:bg-[rgba(255,255,255,0.3)]"
            onClick={onSignIn}
          >
            Sign in
          </button>

          <button className="bg-green-500 grow">Sign up</button>
        </div>
      </form>

      <div className="flex flex-col gap-2 items-center border-t-2 border-black pt-2">
        <button className="bg-gray-300 px-3" onClick={() => signInWithGoogle()}>
          Sign up with Google
        </button>
      </div>
    </div>
  );
}
