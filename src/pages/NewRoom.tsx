import { FormEvent, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

import { Button } from '../components/Button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

import illustrationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';

import '../styles/auth.scss';

export function NewRoom() {
  const { user } = useAuth();
  const { theme } = useTheme();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  useEffect(() => {
    if (!user) {
      history.push('/');
    }
  }, [user, history]);

  async function handleCreateRoom(e: FormEvent) {
    e.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms');

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    });

    history.push(`/admin/rooms/${firebaseRoom.key}`);
  }

  return (
    <div id="page-auth" className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
      <aside>
        <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
        <strong>Toda pergunta tem <br />uma resposta.</strong>
        <p>Aprenda e compartilhe conhecimento <br />com outras pessoas</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={theme === 'dark' ? logoDarkImg : logoImg} alt="Letmeask" />
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={e => setNewRoom(e.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
          <ThemeSwitcher />
        </div>
      </main>
    </div>
  );
}