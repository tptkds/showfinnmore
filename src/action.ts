'use server';

import { redirect } from 'next/navigation';
import { createUserOnFireBase } from './app/api/auth/firebase';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email({ message: '유효하지 않은 이메일 형식입니다.' }),
  password: z
    .string()
    .min(6, {
      message: '패스워드는 최소 6글자 이상이어야 합니다.',
    })
    .regex(/[a-z]/, {
      message: '패스워드에는 최소 1개 이상의 소문자가 포함되어 있어야 합니다.',
    })
    .regex(/[A-Z]/, {
      message: '패스워드에는 최소 1개 이상의 대문자가 포함되어 있어야 합니다.',
    })
    .regex(/[0-9]/, {
      message: '패스워드에는 최소 1개 이상의 숫자가 포함되어 있어야 합니다.',
    })
    .regex(/[^A-Za-z0-9]/, {
      message:
        '패스워드에는 최소 1개 이상의 특수문자가 포함되어 있어야 합니다.',
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
    validatedFields.data.password,
  )
    .then(redirect('/'))
    .catch((error) => error);
}
