import { useSession } from 'next-auth/react';

const MyInfo: React.FC = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex ">
        <p>{session?.user.name}</p>
      </div>
      <div className="flex text-xs">
        <p>({session?.user.email})</p>
      </div>
    </>
  );
};

export default MyInfo;
