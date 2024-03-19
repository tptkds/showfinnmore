'use client';
import React, { useState } from 'react';
import { auth, db } from '@/app/firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { AppDispatch } from '@/types/reduxTypes';
import { setUserInfo } from '@/slices/userSlice';
import { useRouter } from 'next/navigation';
import { addDoc, collection } from 'firebase/firestore';

const Form: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegistering, setIsRegstering] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const dispatch: AppDispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegstering(true);
    if (email === '' || password === '' || name === '') {
      setError('이메일과 패스워드 그리고 이름 모두 입력해 주세요.');
      setIsRegstering(false);
      return;
    }
    if (name.length > 6) {
      setError('이름은 6글자 이하로 입력해 주세요');
      setIsRegstering(false);
      return;
    }

    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          });
          dispatch(setUserInfo(user));
          addDoc(collection(db, 'users'), {
            wishlist: {},
            cartItems: {},
            //  purchaseList: {},
          });
          router.push('/');
        })
        .catch((error) => {
          setIsRegstering(false);
          const errorCode = error.code;
          switch (errorCode) {
            case 'auth/email-already-in-use':
              setError('이미 사용 중인 이메일이에요.');
              return;
            case 'auth/weak-password':
              setError('비밀번호는 6글자 이상으로 입력해 주세요.');
              return;
            case 'auth/network-request-failed':
              setError(
                '네트워크 연결에 실패했어요. 잠시 후에 다시 시도해 주세요.'
              );
              return;
            case 'auth/invalid-email':
              setError('이메일 형식을 올바르게 입력해 주세요.');
              return;
            case 'auth/internal-error':
              setError('잘못된 요청이에요.');
              return;
            default:
              setError('회원가입에 실패했어요.');
              return;
          }
        });
    } catch (error) {
      console.error('회원가입 에러:', error);
    }
  };

  return (
    <>
      <div className="text-red-600 mb-4">{error}</div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="flex flex-col items-center w-full">
          <input
            name="name"
            type="name"
            value={name}
            placeholder="이름 (6글자 이하)"
            autoComplete="username"
            onChange={(e) => setName(e.target.value)}
            className="px-4   h-14 bg-gray-50  dark:text-black border-gray-200 border mb-6 outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
          <input
            name="email"
            type="email"
            value={email}
            placeholder="이메일"
            autoComplete="username"
            onChange={(e) => setEmail(e.target.value)}
            className="px-4   h-14 bg-gray-50  dark:text-black border-gray-200 border mb-6 outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
          <input
            name="password"
            type="password"
            value={password}
            placeholder="패스워드 (6글자 이상)"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
            className="px-4  h-14 bg-gray-50  dark:text-black border-gray-200 border outline-none w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3 "
          />
        </div>
        <div className="flex flex-col items-center w-full my-8">
          <button
            type="submit"
            className="dark:bg-white dark:text-black dark:hover:bg-zinc-300 h-12 bg-zinc-900   text-white  transition duration-200 ease-in-out  w-11/12 sm:w-4/5 md:w-1/2 lg:w-2/5 xl:w-1/3"
            disabled={isRegistering}
            aria-label="회원가입하기"
          >
            {isRegistering ? '회원가입 중...' : '회원가입하기'}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
