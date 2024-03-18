'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import '@theme-toggles/react/css/Classic.css';
import { IoIosMoon, IoIosSunny } from 'react-icons/io';

export default function DarkModeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
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
      <button onClick={themeToggle} aria-label="다크모드 테마 변경">
        {theme === 'light' ? (
          <IoIosSunny style={{ fontSize: '22px' }} />
        ) : (
          <IoIosMoon style={{ fontSize: '20px' }} />
        )}
      </button>
    </>
  );
}
