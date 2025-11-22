import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Tab, Achievement } from '../types';
import { TABS } from '../constants/tabs';
import { ARTICLES } from '../data/articles';
import { ACHIEVEMENTS } from '../data/achievements';
import { Sidebar } from '../components/Sidebar';
import { ArticleCard } from '../components/ArticleCard';
import { Modal } from '../components/Modal';
import { Icon } from '../components/Icon';
import type { IconName } from '../components/Icon';
import { setAuthenticated } from '../utils/auth';
import { useI18n } from '../i18n/I18nContext';

export default function DashboardPage() {
  const [active, setActive] = useState<Tab>('главная');
  const [collapsed, setCollapsed] = useState(false);
  const [selectedAch, setSelectedAch] = useState<Achievement | null>(null);
  const [achOpen, setAchOpen] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(() => {
    try {
      return localStorage.getItem('profile.avatar');
    } catch {
      return null;
    }
  });
  const [badge, setBadge] = useState<IconName | null>(() => {
    try {
      return localStorage.getItem('profile.badge') as IconName | null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (avatar) localStorage.setItem('profile.avatar', avatar);
      else localStorage.removeItem('profile.avatar');
      if (badge) localStorage.setItem('profile.badge', badge);
      else localStorage.removeItem('profile.badge');
    } catch {
      // ignore
    }
  }, [avatar, badge]);

  const navigate = useNavigate();
  const { t } = useI18n();

  const onRead = (id: string) => navigate(`/articles/${id}`);

  const sections = Array.from(new Set(ARTICLES.map((a) => a.section)));
  const [filterSection, setFilterSection] = useState<string>('Все');
  const [query, setQuery] = useState('');

  const filtered = ARTICLES.filter((a) => {
    const matchSection = filterSection === 'Все' || a.section === filterSection;
    const q = query.trim().toLowerCase();
    const matchQuery =
      q.length === 0 ||
      a.title.toLowerCase().includes(q) ||
      a.content.some((p) => p.toLowerCase().includes(q));
    return matchSection && matchQuery;
  });

  const renderContent = () => {
    switch (active) {
      case 'главная':
        return (
          <section>
            <h2>{t('head.recommended')}</h2>
            <div className="card-grid">
              {ARTICLES.slice(0, 2).map((a) => (
                <ArticleCard key={a.id} article={a} onRead={onRead} />
              ))}
            </div>
          </section>
        );
      case 'статьи':
        return (
          <section>
            <h2>{t('head.articles')}</h2>

            <div className="filters">
              <div className="filter-chips" role="tablist" aria-label="Разделы">
                <button
                  className={`chip ${filterSection === 'Все' ? 'active' : ''}`}
                  onClick={() => setFilterSection('Все')}
                >
                  Все
                </button>
                {sections.map((sec) => (
                  <button
                    key={sec}
                    className={`chip ${filterSection === sec ? 'active' : ''}`}
                    onClick={() => setFilterSection(sec)}
                  >
                    {sec}
                  </button>
                ))}
              </div>

              <div className="search">
                <span className="search-icon" aria-hidden="true">🔎</span>
                <input
                  type="search"
                  placeholder={t('search.placeholder')}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Поиск"
                />
                {query ? (
                  <button
                    className="clear"
                    onClick={() => setQuery('')}
                    aria-label="Очистить поиск"
                    title="Очистить"
                >
                  {t('filters.all')}
                </button>
                ) : null}
              </div>
            </div>

            <div className="results-meta">{t('results.found')}: {filtered.length}</div>

            <div className="card-grid">
              {filtered.map((a) => (
                <ArticleCard key={a.id} article={a} onRead={onRead} />
              ))}
            </div>
          </section>
        );
      case 'достижение':
        return (
          <section className="achievements">
            <h2>{t('head.achievements')}</h2>
            <div className="card-grid">
              {ACHIEVEMENTS.map((a) => (
                <article
                  key={a.id}
                  className={`card achieve-card ${a.unlocked ? 'unlocked' : 'locked'}`}
                >
                  <div className="achieve-head">
                    <span className={`achieve-icon ${a.unlocked ? 'ok' : 'dim'}`} aria-hidden="true">
                      <Icon name={a.icon} size={28} />
                    </span>
                    <h4 className="card-title">{t(`achv.${a.id}.title`)}</h4>
                  </div>

                  <p className="card-snippet">{t(`achv.${a.id}.summary`)}</p>

                  <div className="achieve-meta">
                    <span className={`badge ${a.unlocked ? 'badge-ok' : 'badge-muted'}`}>
                      {a.unlocked ? t('status.unlocked') : t('status.locked')}
                    </span>
                    {a.reward ? <span className="reward">{t('ach.reward')}: {t(`achv.${a.id}.reward`) || a.reward}</span> : null}
                  </div>

                  <div className="card-actions">
                    <button
                      onClick={() => {
                        setSelectedAch(a);
                        setAchOpen(true);
                      }}
                    >
                      {t('actions.more')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        );
      case 'подробнее':
        return (
          <section className="details">
            <h2>{t('head.details')}</h2>

            <div className="card-grid">
              <article className="card">
                <h4 className="card-title">{t('details.main.title')}</h4>
                <p>{t('details.main.p1')}</p>
              </article>

              <article className="card">
                <h4 className="card-title">{t('details.exchange.title')}</h4>
                <p><strong>{t('details.exchange.rate')}</strong></p>
              </article>

              <article className="card">
                <h4 className="card-title">{t('details.earn.title')}</h4>
                <p><strong>{t('details.earn.app.title')}</strong></p>
                <ul>
                  <li>{t('details.earn.app.b1')}</li>
                  <li>{t('details.earn.app.b2')}</li>
                  <li>{t('details.earn.app.b3')}</li>
                  <li>{t('details.earn.app.b4')}</li>
                  <li>{t('details.earn.app.b5')}</li>
                </ul>
                <p>{t('details.earn.app.note')}</p>
                <p><strong>{t('details.earn.site.title')}</strong></p>
                <ul>
                  <li>{t('details.earn.site.b1')}</li>
                  <li>{t('details.earn.site.b2')}</li>
                  <li>{t('details.earn.site.b3')}</li>
                </ul>
                <p>{t('details.earn.site.note')}</p>
              </article>

              <article className="card">
                <h4 className="card-title">{t('details.spend.title')}</h4>
                <ul>
                  <li>{t('details.spend.b1')}</li>
                  <li>{t('details.spend.b2')}</li>
                  <li>{t('details.spend.b3')}</li>
                  <li>{t('details.spend.b4')}</li>
                  <li>{t('details.spend.b5')}</li>
                </ul>
              </article>

              <article className="card">
                <h4 className="card-title">{t('details.benefits.title')}</h4>
                <ul>
                  <li>{t('details.benefits.b1')}</li>
                  <li>{t('details.benefits.b2')}</li>
                  <li>{t('details.benefits.b3')}</li>
                  <li>{t('details.benefits.b4')}</li>
                </ul>
              </article>
            </div>
          </section>
        );
      case 'профиль':
        return (
          <section className="profile">
            <h2>{t('profile.heading')}</h2>
            <div className="profile-card card">
              <div className="profile-header">
                <div className="avatar-container" aria-label="Аватар">
                  {avatar ? (
                    <img src={avatar} alt="Аватар" className="avatar-img" />
                  ) : (
                    <div className="avatar-placeholder">👤</div>
                  )}
                  {badge ? (
                    <span className="badge-current" title="Выбранный бейдж">
                      <Icon name={badge} size={18} />
                    </span>
                  ) : null}
                </div>
                <div className="profile-actions">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (!f) return;
                      const r = new FileReader();
                      r.onload = () => setAvatar(String(r.result));
                      r.readAsDataURL(f);
                    }}
                    aria-label="Загрузить аватар"
                  />
                  {avatar ? (
                    <button onClick={() => setAvatar(null)}>{t('profile.reset')}</button>
                  ) : null}
                </div>
              </div>

              <div className="profile-badges">
                <h3 className="section-title">{t('profile.badges')}</h3>
                <p className="results-meta">
                  Доступно: {ACHIEVEMENTS.filter((a) => a.unlocked).length}
                </p>
                <div className="badge-grid">
                  {ACHIEVEMENTS.filter((a) => a.unlocked).map((a) => (
                    <button
                      type="button"
                      key={a.id}
                      className={`badge-item ${badge === a.icon ? 'selected' : ''}`}
                      onClick={() => setBadge(a.icon)}
                      aria-pressed={badge === a.icon}
                      title={a.title}
                    >
                      <span className="badge-icon">
                        <Icon name={a.icon} size={22} />
                      </span>
                      <span className="badge-title">{a.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="profile-footer">
                <button
                  className="danger"
                  onClick={() => {
                    setAuthenticated(false);
                    navigate('/login');
                  }}
                >
                  {t('profile.logout')}
                </button>
              </div>
            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-layout">
      <Sidebar
        tabs={TABS}
        active={active}
        onSelect={setActive}
        collapsed={collapsed}
        onToggle={() => setCollapsed((v) => !v)}
      />

      <main className="main" role="tabpanel">
        <header className="main-header">
          <h1>
            {active === 'главная'
              ? t('head.recommended')
              : active === 'статьи'
              ? t('head.articles')
              : active === 'достижение'
              ? t('head.achievements')
              : active === 'подробнее'
              ? t('head.details')
              : t('head.profile')}
          </h1>
        </header>
        <div className="content">{renderContent()}</div>

        <Modal
          open={achOpen}
          title={selectedAch ? t(`achv.${selectedAch.id}.title`) : undefined}
          onClose={() => setAchOpen(false)}
          actions={<button onClick={() => setAchOpen(false)}>{t('actions.close')}</button>}
        >
          <p>{selectedAch ? t(`achv.${selectedAch.id}.details`) : ''}</p>
          {selectedAch?.reward ? <p className="promo-code">{t(`achv.${selectedAch.id}.reward`) || selectedAch.reward}</p> : null}
        </Modal>
      </main>
    </div>
  );
}
