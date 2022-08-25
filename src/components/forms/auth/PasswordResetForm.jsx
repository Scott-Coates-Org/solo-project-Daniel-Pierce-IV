import { useEffect } from 'react';
import { useState } from 'react';
import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client';
import LabelledInput from '../LabelledInput';
import BaseForm from './BaseForm';

export default function PasswordResetForm({
  onAuthError,
  onShowSignIn,
  onSubmit,
}) {
  const [email, setEmail] = useState('');

  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);

  function attemptPasswordReset(event) {
    event.preventDefault();

    onSubmit(event);

    if (event.target.checkValidity()) {
      sendPasswordResetEmail(email);
    } else {
      event.target.reportValidity();
    }
  }

  useEffect(() => {
    if (error) onAuthError(error.message);
  }, [error]);

  return (
    <BaseForm
      heading="Reset Password"
      subheading="An email will be sent to you shortly if your email matches our records"
      onSubmit={attemptPasswordReset}
    >
      <LabelledInput
        id="email"
        type="email"
        label="Email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <button className="bg-recipe-green text-white text-xl py-1 mt-6">
        Reset password
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
