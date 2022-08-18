import { useEffect } from 'react';
import { useState } from 'react';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client';

export default function SigninForm({ onSignUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessages, setErrorMessages] = useState(null);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  function attemptSignIn(event) {
    event.preventDefault();

    if (validateForm()) {
      signInWithEmailAndPassword(email, password);
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
      errors.push('Please enter your password');
    } else if (password.length < 6) {
      // Password length dictated by Firebase
      // https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
      errors.push('Password must be at least 6 characters');
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
        className="signup p-2 flex flex-col gap-2"
        onSubmit={attemptSignIn}
      >
        <h2 className="text-2xl text-center">Sign In</h2>

        {errorMessages?.map((error) => (
          <span key={error} className="text-red-800 text-sm">
            {error}
          </span>
        ))}

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="email">
            Email
          </label>

          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="password">
            Password
          </label>

          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="grow text-center hover:bg-[rgba(255,255,255,0.3)]"
            onClick={onSignUp}
          >
            Sign up
          </button>

          <button className="bg-green-500 grow">Sign in</button>
        </div>
      </form>

      <div className="flex flex-col gap-2 items-center border-t-2 border-black pt-2">
        <button className="bg-gray-300 px-3" onClick={() => signInWithGoogle()}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
