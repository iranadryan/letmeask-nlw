import { useHistory, useParams } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';
import { useRoom } from '../hooks/useRoom';
import { useTheme } from '../hooks/useTheme';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import logoDarkImg from '../assets/images/logo-dark.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';
import closeImg from '../assets/images/close.svg';
import emptyQuestionsImg from '../assets/images/empty-questions.svg';

import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { Question } from '../components/Question';
import { ThemeSwitcher } from '../components/ThemeSwitcher';

import '../styles/room.scss';

type RoomParams = {
  id: string
}

export function AdminRoom() {
  const history = useHistory();
  const { theme } = useTheme();
  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    database.ref(`rooms/${roomId}`).update({
      endedAt: new Date()
    });

    history.push('/');
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isAnswered: true });
  }

  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`)
      .update({ isHighlighted: true });
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`)
        .remove();
    }
  }

  return (
    <div id="page-room" className={`${theme === 'dark' ? 'dark-theme' : ''}`}>
      <header>
        <div className="content">
          <img src={theme === 'dark' ? logoDarkImg : logoImg} alt="Letmeask" />
          <div>
            <ThemeSwitcher />
            <RoomCode code={roomId} />
            <BrowserView>
              <Button isOutlined onClick={handleEndRoom}>Fechar Sala</Button>
            </BrowserView>
            <MobileView>
              <button
                type="button"
                className="mobile-button"
                onClick={handleEndRoom}
              >
                <img src={closeImg} alt="Fechar sala" />
              </button>
            </MobileView>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>
            {`${questions.length} ${questions.length === 1 ? 'perguntas' : 'pergunta'}`}
          </span>}
        </div>

        {questions.length > 0 ? (
          <div className="question-list">
            {questions.map(question => (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque a pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            ))}
          </div>
        ) : (
          <div className="empty-questions">
            <img src={emptyQuestionsImg} alt="Ilustração de mensagens" />
            <span>Nenhuma pergunta por aqui...</span>
            <p>Envie o código desta sala para seus amigos e comece a responder perguntas!</p>
          </div>
        )}
      </main>
    </div >
  );
}