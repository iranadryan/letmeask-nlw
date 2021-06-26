import { useTheme } from '../hooks/useTheme';

import sunImg from '../assets/images/sun.svg';
import moonImg from '../assets/images/moon.svg';

import '../styles/theme-switcher.scss';

export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button className="theme-switcher" onClick={toggleTheme}>
      <img
        src={theme === 'light' ? moonImg : sunImg}
        alt={theme === 'light' ? 'Mudar para tema escuro' : 'Mudar para tema claro'}
      />
    </button>
  );
}