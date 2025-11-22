import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ARTICLES } from '../data/articles';
import { ARTICLES_I18N } from '../data/articles.i18n';
import { Modal } from '../components/Modal';
import { formatDuration } from '../utils/time';
import { COOLDOWN_ENABLED } from '../constants/featureFlags';
import { useI18n } from '../i18n/I18nContext';

export default function ArticlePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang } = useI18n();

  const base = useMemo(() => ARTICLES.find((a) => a.id === id), [id]);

  // localized override (falls back to base)
  const title = useMemo(() => {
    if (!base) return '';
    const o = ARTICLES_I18N[base.id]?.[lang];
    return o?.title ?? base.title;
  }, [base, lang]);
  const content = useMemo(() => {
    if (!base) return [];
    const o = ARTICLES_I18N[base.id]?.[lang];
    return o?.content ?? base.content;
  }, [base, lang]);

  const [showConfirm, setShowConfirm] = useState(false);
  const [showCooldown, setShowCooldown] = useState(false);
  // фиксируем текущее время через эффект, чтобы не вызывать Date.now() во время рендера
  const [nowMs] = useState(() => Date.now());

  const cooldownUntil = useMemo(() => {
    if (!base) return null;
    const key = `test_attempt:${base.id}`;
    const ts = Number(localStorage.getItem(key));
    return !Number.isNaN(ts) && ts > 0 ? ts + 7 * 24 * 60 * 60 * 1000 : null;
  }, [base]);

  // live countdown for cooldown modal
  const [remainingMs, setRemainingMs] = useState(0);
  useEffect(() => {
    if (!COOLDOWN_ENABLED || !cooldownUntil || !showCooldown) return;
    const tick = () => setRemainingMs(Math.max(0, cooldownUntil - Date.now()));
    tick();
    const tmr = setInterval(tick, 1000);
    return () => clearInterval(tmr);
  }, [cooldownUntil, showCooldown]);

  const startClick = () => {
    if (!COOLDOWN_ENABLED) {
      proceedTest();
      return;
    }
    if (cooldownUntil && nowMs && cooldownUntil > nowMs) {
      setShowCooldown(true);
    } else {
      setShowConfirm(true);
    }
  };

  const proceedTest = () => {
    setShowConfirm(false);
    if (base) navigate(`/test/${base.id}`);
  };

  if (!base) {
    return (
      <div className="content">
        <h2>{t('article.notFound')}</h2>
        <button onClick={() => navigate(-1)}>{t('article.back')}</button>
      </div>
    );
  }

  return (
    <div className="article">
      <header className="article-header">
        <button onClick={() => navigate(-1)} aria-label={t('article.back')} style={{ marginRight: 8 }}>
          ← {t('article.back')}
        </button>
        <h2>{title}</h2>
      </header>
      <div className="article-body">
        {content.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="article-footer">
        <button onClick={startClick}>{t('article.takeQuiz')}</button>
      </div>

      <Modal
        open={showConfirm}
        title={t('article.warn.title')}
        onClose={() => setShowConfirm(false)}
        actions={
          <>
            <button onClick={proceedTest}>{t('article.warn.continue')}</button>
            <button onClick={() => setShowConfirm(false)}>{t('article.warn.readMore')}</button>
          </>
        }
      >
        <p>{t('article.warn.text')}</p>
      </Modal>

      <Modal
        open={showCooldown}
        title={t('article.cooldown.title')}
        onClose={() => setShowCooldown(false)}
        actions={<button onClick={() => setShowCooldown(false)}>{t('article.cooldown.ok')}</button>}
      >
        <p>
          {t('article.cooldown.until')} {formatDuration(remainingMs)} (
          {cooldownUntil ? new Date(cooldownUntil).toLocaleString() : ''})
        </p>
      </Modal>
    </div>
  );
}
