import signUpFirebase from '@/_utils/signUpFirebase';
import { signUpSchema } from '@/schema/userValidationSchema';
import { useState } from 'react';
import { ZodIssue } from 'zod';

const useSignUpUser = () => {
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const signUpUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    setStatus('loading');
    const validatedFields = signUpSchema.safeParse({
      email: email,
      password: password,
      displayName: displayName,
    });

    if (!validatedFields.success) {
      const errorMessages = validatedFields.error.issues.map(
        (issue: ZodIssue) => issue.message
      );
      setStatus('error');
      const combinedMessage = errorMessages.join('\n');
      setErrorMessage(combinedMessage);
      return false;
    }

    try {
      await signUpFirebase({ email, password, displayName });
      setStatus('success');
      return true;
    } catch (error) {
      const err = error as Error;
      setStatus('error');
      setErrorMessage(err.message);
      return false;
    }
  };

  return { status, signUpUser, errorMessage };
};
export default useSignUpUser;
