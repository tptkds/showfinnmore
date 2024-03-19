'use client';
import { AuthContext } from '@/app/AuthProvider';
import { auth } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setUserInfo } from '@/slices/userSlice';
import { updatePassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

const MyPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [clickedButtonName, setClickedButtonName] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const { currentUser } = useContext(AuthContext);
  const modalBackground = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useLayoutEffect(() => {
    if (isLoaded)
      if (!currentUser) {
        router.push('/account/login');
      }
    if (!isLoaded) setIsLoaded(true);
  }, [isLoaded, currentUser]);

  const toggleModal = (e: any = null) => {
    if (e?.target.name === 'nameButton') setClickedButtonName('name');
    else setClickedButtonName('password');

    if (modalBackground.current?.classList.contains('hidden')) {
      modalBackground.current?.classList.remove('hidden');
    } else {
      modalBackground.current?.classList.add('hidden');
      setPassword('');
      setName('');
      setClickedButtonName('');
      setIsUpdating(false);
      setError('');
    }
  };

  const changeSomething = () => {
    if (clickedButtonName === 'name') {
      setIsUpdating(true);
      if (name === '') {
        setError('이름을 입력해 주세요.');
        setIsUpdating(false);
        return;
      }
      if (name == currentUser?.displayName) {
        setError('기존과 다른 이름을 입력해 주세요.');
        setIsUpdating(false);
        return;
      }
      if (name.length > 6) {
        setError('6글자 이하의 이름을 입력해 주세요.');
        setIsUpdating(false);
        return;
      }
      setError('');
      if (auth.currentUser != null)
        try {
          updateProfile(auth.currentUser, { displayName: name })
            .then(() => {
              dispatch(setUserInfo(auth.currentUser));
              toggleModal();
            })
            .catch((error) => console.error(error));
        } catch (error) {
          console.error(error);
          setIsUpdating(false);
          setName('');
        }
    }
    if (clickedButtonName === 'password') {
      setIsUpdating(true);
      if (password === '') {
        setError('패스워드를 입력해 주세요.');
        setIsUpdating(false);
        return;
      }
      if (password.length < 6) {
        setError('6글자 이상의 패스워드를 입력해 주세요.');
        setIsUpdating(false);
        return;
      }
      setError('');
      if (auth.currentUser != null)
        try {
          //reauthenticateWithCredential(auth.currentUser, a)
          updatePassword(auth.currentUser, password)
            .then(() => {
              toggleModal();
              dispatch(setUserInfo(null));
              alert(
                'Password has been successfully changed. Please log in again'
              );
              auth.signOut();
              router.push('/account/login');
            })
            .catch((error) => {
              console.error(error);
              setIsUpdating(false);
              setError(`재로그인 후 다시 시도해 주세요.`);
              setPassword('');
            });
        } catch (error) {
          console.error(error);
          setIsUpdating(false);
          setName('');
        }
    }
  };

  return (
    <div className="mt-14 flex flex-col justify-center w-full items-center">
      <h2>마이페이지</h2>
      <div className="my-14 flex flex-col items-center min-w-64">
        <h3 className=" text-xl">내 정보</h3>

        <div className="mt-8">
          <div className="flex ">
            <p className="w-14">Name. </p>
            <p>{currentUser?.displayName}</p>
          </div>
          <div className="flex ">
            <p className="w-14">Email. </p>
            <p>{currentUser?.email}</p>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 w-full ">
          <button
            name="nameButton"
            type="button"
            className="h-12  dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-zinc-900 hover:bg-zinc-700 text-white transition duration-200 ease-in-out w-full"
            onClick={toggleModal}
            aria-label="이름 변경하기"
          >
            이름 변경
          </button>
          <button
            name="passwordButton"
            type="button"
            className="mt-4 h-12  dark:bg-white dark:text-black dark:hover:bg-zinc-300  bg-zinc-900 hover:bg-zinc-700 text-white transition duration-200 ease-in-out w-full"
            onClick={toggleModal}
            aria-label="패스워드 변경하기"
          >
            패스워드 변경
          </button>
        </div>

        <div
          className="bg-black bg-opacity-30 w-full h-full fixed top-0 left-0 hidden"
          ref={modalBackground}
        >
          <div
            aria-modal="true"
            className="absolute z-50 top-10  shadow-md search-modal-center bg-white w-96 h-96  overflow-y-auto dark:bg-zinc-800"
          >
            <button
              name="downModal"
              className="absolute right-4 top-4 text-xl"
              onClick={toggleModal}
              aria-label="닫기"
            >
              <IoCloseSharp />
            </button>

            <div className="flex flex-col justify-center items-center h-full w-full">
              <h4 className="mb-8">
                {clickedButtonName === 'name' ? '이름 변경' : '패스워드 변경'}
              </h4>
              <div className="text-red-600  mb-4">{error}</div>
              <label className="mb-4 w-full">
                {clickedButtonName === 'name' ? '이름' : '패스워드'}
                {clickedButtonName === 'name' ? (
                  <input
                    type="text"
                    value={name}
                    placeholder="여섯 글자 이하"
                    onChange={(e) => setName(e.target.value)}
                    className="mt-2 px-4 dark:text-black   h-14 bg-gray-50 border-gray-200 border outline-none w-full"
                  />
                ) : (
                  <input
                    type="password"
                    value={password}
                    placeholder="여섯 글자 이상"
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-2 px-4 dark:text-black  h-14 bg-gray-50 border-gray-200 border outline-none w-full"
                  />
                )}
              </label>
              <button
                type="button"
                className="h-12 mt-4 dark:bg-white dark:text-black dark:hover:bg-zinc-300    bg-zinc-900 hover:bg-zinc-700 text-white transition duration-200 ease-in-out w-full"
                onClick={changeSomething}
                disabled={isUpdating}
                aria-label="변경하기"
              >
                {isUpdating
                  ? '변경 중...'
                  : clickedButtonName === 'name'
                  ? '이름 변경하기'
                  : '패스워드 변경하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyPage;
