import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import { shuffleIndexes, generatePromo } from '../utils/random';
import { formatDuration } from '../utils/time';
import { COOLDOWN_ENABLED } from '../constants/featureFlags';
import { useI18n } from '../i18n/I18nContext';
import { ARTICLES_I18N } from '../data/articles.i18n';

export default function QuizPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const article = useMemo(() => ARTICLES.find((a) => a.id === id), [id]);
  const { t, lang } = useI18n();

  const title = useMemo(() => {
    if (!article) return '';
    const o = ARTICLES_I18N[article.id]?.[lang];
    return o?.title ?? article.title;
  }, [article, lang]);

  const localizedQuestions = useMemo(() => {
    if (!article) return [];
    const o = ARTICLES_I18N[article.id]?.[lang]?.questions;
    return article.questions.map((q, i) => ({
      q: o?.[i]?.q ?? q.q,
      options: q.options.map((opt, j) => o?.[i]?.options?.[j] ?? opt),
      correctIndex: q.correctIndex,
    }));
  }, [article, lang]);

  // quiz state
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [order, setOrder] = useState<number[][]>([]);
  const [lastAttempt, setLastAttempt] = useState<number | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  // UI навигация по вопросам
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  const key = article ? `test_attempt:${article.id}` : '';

  // load last attempt timestamp
  useEffect(() => {
    if (!key) return;
    const ts = Number(localStorage.getItem(key));
    if (!Number.isNaN(ts) && ts > 0) setLastAttempt(ts);
  }, [key]);

  // shuffle options when article changes
  useEffect(() => {
    if (!article) return;
    setOrder(article.questions.map((q) => shuffleIndexes(q.options.length)));
  }, [article?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const questions = localizedQuestions;

  const onSelect = (qi: number, oi: number) => {
    if (submitted) return;
    const next = answers.slice();
    next[qi] = oi;
    setAnswers(next);

    // авто-переход на следующий вопрос с плавным эффектом
    if (qi === current) {
      setFading(true);
      setTimeout(() => {
        setFading(false);
        if (current < questions.length - 1) {
          setCurrent((c) => c + 1);
        } else {
          // на последнем вопросе можно автоматически завершить, если все ответы выбраны
          const allAnswered = next.filter((a) => a !== undefined).length === questions.length;
          if (allAnswered) {
            setSubmitted(true);
          }
        }
      }, 200);
    }
  };

  const score = useMemo(() => {
    if (!submitted) return 0;
    return questions.reduce((acc, q, i) => {
      const selected = answers[i];
      const mapped = order[i]?.[selected] ?? -1;
      return acc + (mapped === q.correctIndex ? 1 : 0);
    }, 0);
  }, [submitted, questions, answers, order]);

  // finalize attempt and promo
  useEffect(() => {
    if (!submitted) return;
    const now = Date.now();
    if (COOLDOWN_ENABLED && key) localStorage.setItem(key, String(now));
    setLastAttempt(now);
    if (score === questions.length && questions.length > 0) {
      setPromoCode(generatePromo(6));
      setShowSuccess(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const canRetake =
    !COOLDOWN_ENABLED || !lastAttempt || Date.now() - (lastAttempt ?? 0) >= 7 * 24 * 60 * 60 * 1000;

  // live countdown for retake note
  const [retakeMs, setRetakeMs] = useState(0);
  useEffect(() => {
    if (!COOLDOWN_ENABLED) {
      setRetakeMs(0);
      return;
    }
    if (!lastAttempt || canRetake) return setRetakeMs(0);
    const until = (lastAttempt ?? 0) + 7 * 24 * 60 * 60 * 1000;
    const tick = () => setRetakeMs(Math.max(0, until - Date.now()));
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [lastAttempt, canRetake]);

  const copyPromo = async () => {
    try {
      await navigator.clipboard.writeText(promoCode);
    } catch (e) {
      console.warn('Copy failed', e);
    }
  };

  if (!article) {
    return (
      <div className="content">
        <h2>{t('quiz.notFound')}</h2>
        <button onClick={() => navigate(-1)}>{t('quiz.back')}</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <header className="quiz-header">
        <h2>{t('quiz.title')}: {title}</h2>
      </header>

      {/* Пагинация и прогресс */}
      <div className="quiz-steps">
        {questions.map((_, i) => {
          const done = answers[i] !== undefined;
          const active = i === current;
          return <span key={i} className={`quiz-step ${done ? 'done' : ''} ${active ? 'active' : ''}`} aria-label={`Вопрос ${i + 1}`} />;
        })}
      </div>
      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${questions.length ? ((current + 1) / questions.length) * 100 : 0}%` }} />
      </div>

      {/* Текущий вопрос */}
      <ol className="quiz-list">
        <li key={current} className={`quiz-item question ${fading ? 'fading' : ''}`}>
          <div className="quiz-q">
            {t('quiz.question')} {current + 1} {t('quiz.of')} {questions.length}: {questions[current].q}
          </div>
          <div className="quiz-options">
            {order[current]?.map((origIndex, oi) => {
              const opt = questions[current].options[origIndex];
              const checked = answers[current] === oi;
              const isCorrect = submitted && origIndex === questions[current].correctIndex;
              const isWrong = submitted && checked && origIndex !== questions[current].correctIndex;
              return (
                <label
                  key={oi}
                  className={`quiz-option ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                >
                  <input
                    type="radio"
                    name={`q-${current}`}
                    checked={checked || false}
                    onChange={() => onSelect(current, oi)}
                    disabled={submitted}
                  />
                  <span>{opt}</span>
                </label>
              );
            })}
          </div>
        </li>
      </ol>

      {/* Навигация по вопросам (доступна и после сдачи для просмотра) */}
      <div className="quiz-nav">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
        >
          {t('quiz.prev')}
        </button>
        <button
          onClick={() => setCurrent((c) => Math.min(questions.length - 1, c + 1))}
          disabled={current >= questions.length - 1 || (!submitted && answers[current] === undefined)}
        >
          {t('quiz.next')}
        </button>
      </div>

      <div className="quiz-actions">
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={answers.filter((a) => a !== undefined).length < questions.length}
          >
            {t('quiz.finish')}
          </button>
        ) : (
          <>
            <div className="quiz-result">
              {t('quiz.result')}: {score} {t('quiz.of')} {questions.length}
            </div>
            {!COOLDOWN_ENABLED || canRetake ? (
              <button
                onClick={() => {
                  setAnswers([]);
                  setSubmitted(false);
                  setCurrent(0);
                  setOrder(article.questions.map((q) => shuffleIndexes(q.options.length)));
                }}
              >
                {t('quiz.retry')}
              </button>
            ) : null}
            {COOLDOWN_ENABLED && !canRetake ? (
              <span className="quiz-note">
                {t('quiz.retakeNote')} {formatDuration(retakeMs)} (
                {new Date((lastAttempt ?? 0) + 7 * 24 * 60 * 60 * 1000).toLocaleString()})
              </span>
            ) : null}
            <button onClick={() => navigate('/')}>{t('quiz.home')}</button>
          </>
        )}
      </div>

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{t('quiz.success.title')}</h3>
            <p>{t('quiz.success.text')}</p>
            <div className="promo-code">{promoCode}</div>
            <div className="modal-actions">
              <button onClick={copyPromo}>{t('quiz.copy')}</button>
              <button onClick={() => setShowSuccess(false)}>{t('quiz.close')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
