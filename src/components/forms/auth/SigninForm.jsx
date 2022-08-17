import { useState } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client';

export default function SigninForm({}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errorMessages, setErrorMessages] = useState(null);
  const [createUserWithEmailAndPassword, error] =
    useCreateUserWithEmailAndPassword(auth);

  if (error) {
    console.log(error);
  }

  function attemptSignup(event) {
    event.preventDefault();

    if (validateForm()) {
      // TODO .then() create user doc in users collection in Firestore
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

  return (
    <div className="p-2">
      <form
        action=""
        className="signup p-2 flex flex-col gap-2"
        onSubmit={attemptSignup}
      >
        <h2 className="text-2xl">Sign up</h2>

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

        <div className="flex flex-col">
          <label className="text-sm" htmlFor="password-confirm">
            Password confirm
          </label>

          <input
            type="password"
            id="password-confirm"
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
          />
        </div>

        <button className="bg-green-500">Sign Up</button>
      </form>
    </div>
  );
}
