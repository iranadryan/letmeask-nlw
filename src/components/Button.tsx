import { ButtonHTMLAttributes } from 'react';
import { useTheme } from '../hooks/useTheme';
import cx from 'classnames';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  const { theme } = useTheme();

  return (
    <button
      className={cx(
        'button',
        { outlined: isOutlined },
        { 'dark-theme': theme === 'dark' }
      )}
      {...props}
    />
  )
}