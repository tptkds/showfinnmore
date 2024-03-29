import { signInSchema } from '@/schema/userValidationSchema';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import useRouterPush from './useRouterPush';
import useStore from './useStore';

const useSignInUser = () => {
  const [status, setStatus] = useState<string>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { initializeUserStore } = useStore();
  const { goHome } = useRouterPush();

  const signInUser = async (email: string, password: string) => {
    setStatus('loading');

    const validatedFields = signInSchema.safeParse({
      email: email,
      password: password,
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(
        (issue) => issue.message
      );
      const combinedMessage = errorMessages.join('\n');
      setStatus('error');
      setErrorMessage(combinedMessage);
      return;
    }

    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    if (result?.ok) {
      setStatus('success');
      initializeUserStore(email);
      goHome();
    } else {
      setStatus('error');
      if (result?.error) setErrorMessage(result?.error);
    }
  };

  return { status, signInUser, errorMessage };
};
export default useSignInUser;
