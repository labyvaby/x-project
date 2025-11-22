import React from 'react';
import type { Tab } from '../types';
import { Icon } from './Icon';
import { useI18n } from '../i18n/I18nContext';

type SidebarProps = {
  tabs: readonly Tab[];
  active: Tab;
  onSelect: (tab: Tab) => void;
  collapsed: boolean;
  onToggle: () => void;
};

export function Sidebar({ tabs, active, onSelect, collapsed, onToggle }: SidebarProps) {
  const { t, lang, setLang } = useI18n();
  const [langOpen, setLangOpen] = React.useState(false);

  const tabLabel = (tab: Tab) => {
    switch (tab) {
      case 'главная':
        return t('nav.home');
      case 'статьи':
        return t('nav.articles');
      case 'достижение':
        return t('nav.achievements');
      case 'профиль':
        return t('nav.profile');
      default:
        return String(tab);
    }
  };

  return (
    <aside
      className={`sidebar ${collapsed ? 'collapsed' : ''}`}
      aria-label="Навигация"
      aria-expanded={!collapsed}
    >
      <div className="brand">
        <button
          className="burger"
          aria-label={collapsed ? 'Показать меню' : 'Скрыть меню'}
          aria-pressed={collapsed}
          onClick={onToggle}
          title={collapsed ? 'Развернуть' : 'Свернуть'}
        >
          <span className="burger-lines" />
        </button>
      </div>

      {!collapsed && (
      <div className="lang-switch segmented" role="group" aria-label={t('lang.label')}>
        <button
          type="button"
          className={`seg-btn ${lang === 'ru' ? 'active' : ''}`}
          aria-pressed={lang === 'ru'}
          onClick={() => setLang('ru')}
          title={t('lang.ru')}
        >
          🇷🇺
        </button>
        <button
          type="button"
          className={`seg-btn ${lang === 'ky' ? 'active' : ''}`}
          aria-pressed={lang === 'ky'}
          onClick={() => setLang('ky')}
          title={t('lang.ky')}
        >
          🇰🇬
        </button>
        <button
          type="button"
          className={`seg-btn ${lang === 'en' ? 'active' : ''}`}
          aria-pressed={lang === 'en'}
          onClick={() => setLang('en')}
          title={t('lang.en')}
        >
          en
        </button>
      </div>
      )}

      {collapsed && (
      <div
        className="lang-switch compact"
        role="group"
        aria-label={t('lang.label')}
        onMouseLeave={() => setLangOpen(false)}
      >
        <button
          type="button"
          className={`seg-btn current ${langOpen ? 'open' : ''}`}
          aria-expanded={langOpen}
          onClick={() => setLangOpen((v) => !v)}
          title={t(`lang.${lang}`)}
        >
          {lang === 'ru' ? '🇷🇺' : lang === 'ky' ? '🇰🇬' : 'en'}
        </button>
        <div className={`lang-popover ${langOpen ? 'open' : ''}`} role="menu">
          <button
            type="button"
            className="seg-btn"
            onClick={() => {
              setLangOpen(false);
              setLang('ru');
            }}
            title={t('lang.ru')}
          >
            🇷🇺 RU
          </button>
          <button
            type="button"
            className="seg-btn"
            onClick={() => {
              setLangOpen(false);
              setLang('ky');
            }}
            title={t('lang.ky')}
          >
            🇰🇬 KG
          </button>
          <button
            type="button"
            className="seg-btn"
            onClick={() => {
              setLangOpen(false);
              setLang('en');
            }}
            title={t('lang.en')}
          >
            en EN
          </button>
        </div>
      </div>
      )}
 
      <nav className="side-tabs" role="tablist" aria-orientation="vertical">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            className={`side-tab ${active === tab ? 'active' : ''}`}
            onClick={() => onSelect(tab)}
            data-tip={tabLabel(tab)}
          >
            <span className="icon">
              {tab === 'главная' ? (
                <Icon name="home" />
              ) : tab === 'статьи' ? (
                <Icon name="article" />
              ) : tab === 'достижение' ? (
                <Icon name="trophy" />
              ) : (
                <Icon name="user" />
              )}
            </span>
            <span className="label">{tabLabel(tab)}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}
