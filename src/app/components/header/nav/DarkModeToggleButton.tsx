'use client';
import { useLayoutEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import '@theme-toggles/react/css/Classic.css';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';

const DarkModeToggleButton: React.FC = () => {
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  const themeToggle = () => {
    theme === 'light' ? setTheme('dark') : setTheme('light');
  };
  return (
    <>
      <div
        className=" itesm-center flex"
        //data-tip="Dark Mode"
      >
        <button onClick={themeToggle} aria-label="다크모드 테마 변경">
          {theme === 'light' ? (
            <IoIosSunny style={{ fontSize: '22px' }} />
          ) : (
            <IoIosMoon style={{ fontSize: '20px' }} />
          )}
        </button>
      </div>
    </>
  );
};
export default DarkModeToggleButton;
