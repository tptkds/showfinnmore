import React from 'react';

const Notice: React.FC = () => {
  const text =
    'Check out the fresh drop at SS24 – explore and roll through the vibes!';
  return (
    <div className="text-sm pt-2 w-full whitespace-nowrap h-8 bg-zinc-100	bg-opacity-80 dark:bg-black dark:text-white dark:bg-opacity-60">
      <div className="slideText">
        {new Array(10).fill(null).map((_, i) => (
          <span key={i} className=" mr-12">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Notice;
