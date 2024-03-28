import CloseModalButton from '@/app/components/modal/CloseModalButton';
import { auth } from '@/app/firebaseConfig';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { ModalContentsProps } from '@/types/globalTypes';
import { updatePassword, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface AccountEditingModalContents extends ModalContentsProps {
  selectedButton: string;
}
const AccountEditingModalContents: React.FC<AccountEditingModalContents> = ({
  toggleModal,
  selectedButton,
}) => {
  const currentUser = null;
  const dispatch = useAppDispatch();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const router = useRouter();

  const resetState = () => {
    setName('');
    setPassword('');
    setError('');
    setIsUpdating(false);
  };

  const changeSomething = () => {
    if (selectedButton === 'changeName') {
      setIsUpdating(true);
      if (name === '') {
        setError('이름을 입력해 주세요.');
        setIsUpdating(false);
        return;
      }
      // if (name == currentUser?.displayName) {
      //   setError('기존과 다른 이름을 입력해 주세요.');
      //   setIsUpdating(false);
      //   return;
      // }
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
              // dispatch(setUserInfo(auth.currentUser));
              toggleModal();
            })
            .catch((error) => console.error(error));
        } catch (error) {
          console.error(error);
          setIsUpdating(false);
          setName('');
        }
    }
    if (selectedButton === 'password') {
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
          updatePassword(auth.currentUser, password)
            .then(() => {
              toggleModal();
              // dispatch(setUserInfo(null));
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
    <div
      aria-modal="true"
      className="absolute z-50 top-10  shadow-md search-modal-center bg-white w-96 h-96  overflow-y-auto dark:bg-zinc-800"
    >
      <span onClick={resetState}>
        <CloseModalButton toggleModal={toggleModal} />
      </span>
      <div className="flex flex-col justify-center items-center h-full w-full">
        <h4 className="mb-8">
          {selectedButton === 'changeName' ? '이름 변경' : '패스워드 변경'}
        </h4>
        <div className="text-red-600  mb-4">{error}</div>
        <label className="mb-4 w-full">
          {selectedButton === 'changeName' ? '이름' : '패스워드'}
          {selectedButton === 'changeName' ? (
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
            : selectedButton === 'changeName'
            ? '이름 변경하기'
            : '패스워드 변경하기'}
        </button>
      </div>
    </div>
  );
};
export default AccountEditingModalContents;
