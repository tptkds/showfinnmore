import Link from 'next/link';
import React from 'react';

const Notice: React.FC = () => {
  const text =
    'Check out the fresh drop at SS24 – explore and roll through the vibes!';
  return (
    <Link href={'/product/all/1'} className="hidden sm:block">
      <div className="h-8 w-full overflow-x-hidden whitespace-nowrap bg-zinc-100 bg-opacity-80 pt-2	text-sm dark:bg-black dark:bg-opacity-60 dark:text-white">
        <div className="slideText">
          {new Array(30).fill(null).map((_, i) => (
            <span key={i} className=" mr-12">
              {text}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default Notice;
