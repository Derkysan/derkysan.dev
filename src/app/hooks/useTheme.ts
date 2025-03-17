import { useState, useEffect } from 'react';

const useTheme = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Detecta la preferencia de tema del usuario
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    // Si ya hay un tema guardado en localStorage, usa ese tema
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;

    // Establece el tema inicial basado en lo guardado o en la preferencia del sistema
    setTheme(savedTheme || systemTheme);

  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return { theme, toggleTheme };
};

export default useTheme;
