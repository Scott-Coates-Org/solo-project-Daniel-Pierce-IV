import { useEffect } from 'react';
import { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client';
import LabelledInput from '../LabelledInput';

export default function PasswordResetForm({ onSignIn }) {
  const [email, setEmail] = useState('');
  const [errorMessages, setErrorMessages] = useState(null);
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  function attemptPasswordReset(event) {
    event.preventDefault();

    if (validateForm()) {
      sendPasswordResetEmail(email);
    }
  }

  // Returns true if the form is valid, false if not
  // SIDE EFFECT: updates the error message state with errors
  function validateForm() {
    const errors = [];

    if (!email) {
      errors.push('Please enter your email');
    }

    if (errors.length === 0) {
      setErrorMessages(null);
    } else {
      setErrorMessages(errors);
    }

    return errors.length === 0;
  }

  useEffect(displayFirebaseErrors, [error]);

  function displayFirebaseErrors() {
    let errors = [];

    if (error) errors.push(error.message);

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
        onSubmit={attemptPasswordReset}
      >
        <h2 className="text-2xl text-center">Reset Password</h2>

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

        <div className="flex gap-3">
          <button
            type="button"
            className="grow text-center hover:bg-[rgba(255,255,255,0.3)]"
            onClick={onSignIn}
          >
            Back
          </button>

          <button className="bg-green-500 grow">Reset password</button>
        </div>
      </form>
    </div>
  );
}
