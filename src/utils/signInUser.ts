import { signIn } from 'next-auth/react';
const signInUser = async (email: string, password: string) => {
  const result = await signIn('credentials', {
    redirect: false,
    email: email,
    password: password,
  });
  if (result?.ok) {
    return result?.ok;
  } else {
    throw result?.error;
  }
};
export default signInUser;
