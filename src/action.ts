'use server';

import { redirect } from 'next/navigation';
import { createUserOnFireBase, getUserOnFireBase } from './app/apis/firebase';
import { z } from 'zod';

const schema = z.object({
  email: z.string({
    invalid_type_error: 'Invalid Email',
  }),
  password: z.string({
    invalid_type_error: 'Invalid Password',
  }),
});

export async function createUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  const res = await createUserOnFireBase(
    validatedFields.data.email,
    validatedFields.data.password
  )
    .then(redirect('/'))
    .catch((error) => error);
}

export async function getUser(formData: FormData) {
  const validatedFields = schema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
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
}
