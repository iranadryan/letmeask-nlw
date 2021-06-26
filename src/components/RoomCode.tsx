import toast, { Toaster } from 'react-hot-toast';
import { useTheme } from '../hooks/useTheme';

import copyImg from '../assets/images/copy.svg';

import '../styles/room-code.scss';

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps) {
  const { theme } = useTheme();

  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success('O código foi copiado.');
  }
  return (
    <>
      <Toaster />
      <button
        className={`room-code ${theme === 'dark' ? 'dark-theme' : ''}`}
        onClick={copyRoomCodeToClipboard}
      >
        <div>
          <img src={copyImg} alt="Copy room code" />
        </div>
        <span>Sala #{props.code}</span>
      </button>
    </>
  );
}