import { useSession } from 'next-auth/react';

const MyInfo: React.FC = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex ">
        <p className="w-14">Name. </p>
        <p>{session?.user.name}</p>
      </div>
      <div className="flex ">
        <p className="w-14">Email. </p>
        <p>{session?.user.email}</p>
      </div>
    </>
  );
};

export default MyInfo;
