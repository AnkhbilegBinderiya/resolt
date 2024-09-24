"use client"

import { useEffect, useState } from 'react';
import { PiSun } from "react-icons/pi";
import { PiMoonFill } from "react-icons/pi";

export default function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // On component mount, check for existing preference in localStorage
    const isDarkMode = localStorage.getItem('theme') === 'dark';
    setDarkMode(isDarkMode);

    // Apply the dark mode class to <html> tag if preference exists
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.body.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.body.classList.add('dark');
    }
  };

  return (
    <button
      className="text-2xl"
      onClick={toggleDarkMode}
    >
      {darkMode ?  <PiMoonFill className='text-white'/> : <PiSun className='text-dark'/>}
    </button>
  );
}
