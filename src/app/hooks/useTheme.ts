import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Detecta la preferencia de tema del usuario
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // Si ya hay un tema guardado en localStorage, usa ese tema
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

    // Si no hay tema guardado, usa el preferido por el sistema
    setTheme(savedTheme || systemTheme);

    console.log('systemTheme:', systemTheme)

  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
