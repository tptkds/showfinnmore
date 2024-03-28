import signUpFirebase from '@/_utils/signUpFirebase';
import { signUpSchema } from '@/schema/userValidationSchema';
import { resetCartItems } from '@/slices/cartSlice';
import { resetWishlist } from '@/slices/wishListSlice';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ZodIssue } from 'zod';

const useSignUpUser = () => {
  const [status, setStatus] = useState('idle');
  const dispatch = useDispatch();
  const resetStore = () => {
    dispatch(resetCartItems());
    dispatch(resetWishlist());
  };
  const signUpUser = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const validatedFields = signUpSchema.safeParse({
        email: email,
        password: password,
        displayName: displayName,
      });

      if (!validatedFields.success) {
        const errorMessages = validatedFields.error.issues.map(
          (issue: ZodIssue) => issue.message
        );
        const combinedMessage = errorMessages.join('\n');
        throw new Error(combinedMessage);
      }

      setStatus('loading');
      await signUpFirebase({ email, password, displayName });
      setStatus('success');
    } catch (error) {
      setStatus('error');
      throw error;
    }
  };

  return { status, signUpUser, resetStore };
};
export default useSignUpUser;
