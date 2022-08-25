import { useEffect } from 'react';
import { useState } from 'react';
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/client';
import LabelledInput from '../LabelledInput';
import BaseForm from './BaseForm';

export default function SigninForm({
  onAuthError,
  onShowResetPassword,
  onShowSignUp,
  onSubmit,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, googleUser, googleLoading, googleError] =
    useSignInWithGoogle(auth);

  function attemptSignIn(event) {
    event.preventDefault();

    onSubmit(event);

    if (event.target.checkValidity()) {
      signInWithEmailAndPassword(email, password);
    } else {
      event.target.reportValidity();
    }
  }

  useEffect(() => {
    if (error) onAuthError(error.message);
    if (googleError) onAuthError(googleError.message);
  }, [error, googleError]);

  return (
    <BaseForm
      heading="Sign In"
      subheading="Jump in and enjoy the full range of Bespork's features!"
      onSubmit={attemptSignIn}
    >
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
        minLength={6}
        required
      />

      <button
        onClick={onShowResetPassword}
        type="button"
        className="self-end hover:bg-[rgba(255,255,255,0.3)] hover:underline"
      >
        Forgot password?
      </button>

      <button className="bg-recipe-green text-white text-xl py-1 mt-6">
        Sign in
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
        onClick={onShowSignUp}
      >
        Dont have an account yet?{' '}
        <span className="text-recipe-green">Sign up</span>
      </button>
    </BaseForm>
  );
}
