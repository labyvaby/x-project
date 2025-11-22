import { useState, type FormEvent } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { isAuthenticated, setAuthenticated } from '../utils/auth';
import { useI18n } from '../i18n/I18nContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const ok = email.trim() === 'admin@gmail.com' && password === 'admin';
    await new Promise((r) => setTimeout(r, 250));
    setLoading(false);
    if (!ok) {
      setError(t('login.error'));
      return;
    }
    setAuthenticated(true);
    navigate('/', { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-card" role="form" aria-label="Вход">
        <h1>{t('login.heading')}</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">{t('login.email')}</label>
            <input
              id="email"
              type="email"
              autoComplete="username"
              placeholder={t('login.email.placeholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">{t('login.password')}</label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              placeholder={t('login.password.placeholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error ? (
              <div className="error" role="alert">
                {error}
              </div>
            ) : null}
          </div>

          <div className="actions">
            <button type="submit" disabled={loading}>
              {loading ? t('login.loading') : t('login.submit')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
