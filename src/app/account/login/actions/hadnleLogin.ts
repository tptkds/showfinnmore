import { getUserOnFireBase } from '@/app/apis/firebase';
import schema from '../schemas/userValidationSchema';
import { redirect } from 'next/navigation';

const handleLogin = async (formData: FormData) => {
  const rawFormData = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const validatedFields = schema.safeParse({
    email: rawFormData.email,
    password: rawFormData.password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const res = await getUserOnFireBase(
    validatedFields.data.email,
    validatedFields.data.password
  )
    .then(redirect('/'))
    .catch((error) => error);
};
export default handleLogin;
