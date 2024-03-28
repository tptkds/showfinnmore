import { signIn } from 'next-auth/react';
import { useState } from 'react';

const useSignInUser = () => {
  const [status, setStatus] = useState<string>('idle');

  const signInUser = async (email: string, password: string) => {
    setStatus('loading');
    const result = await signIn('credentials', {
      redirect: false,
      email: email,
      password: password,
    });
    if (result?.ok) {
      setStatus('success');
    } else {
      setStatus('error');
      throw result?.error;
    }
  };

  return { status, signInUser };
};
export default useSignInUser;
