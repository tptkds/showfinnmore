import { signInSchema } from '@/schema/userValidationSchema';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { ZodIssue } from 'zod';

const useSignInUser = () => {
  const [status, setStatus] = useState<string>('idle');

  const signInUser = async (email: string, password: string) => {
    setStatus('loading');

    const validatedFields = signInSchema.safeParse({
      email: email,
      password: password,
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(
        (issue: ZodIssue) => issue.message
      );
      const combinedMessage = errorMessages.join('\n');
      throw new Error(combinedMessage);
    }

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
