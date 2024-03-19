import Link from 'next/link';
import { BiSolidUserRectangle } from 'react-icons/bi';

const MyPage: React.FC = () => {
  return (
    <div
      className=" flex items-center "
      //data-tip="My Page"
    >
      <Link href="/account/mypage" className="flex items-center">
        <BiSolidUserRectangle
          className="xl:mr-2"
          style={{ fontSize: '20px' }}
        />
        <p className="hidden xl:block">My Page</p>
      </Link>
    </div>
  );
};
export default MyPage;
